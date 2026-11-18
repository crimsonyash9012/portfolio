type Point = { x: number; y: number; z: number };
type Vertex = readonly [number, number];

const half: readonly Vertex[] = [
  [-0.9, -0.18], [-0.46, -0.37], [-0.46, -1.09], [-0.03, -1.3],
  [-0.03, -0.08], [-0.68, 0.22], [-0.46, 0.36], [-0.18, 0.23],
  [-0.18, 0.69], [-0.52, 0.84], [-0.9, 0.62],
];
const profiles = [half, half.map(([x, y]): Vertex => [-x, -y])];
const depth = 0.13;

type Pose = {
  x: number;
  y: number;
  size: number;
  turn: number;
  tilt: number;
  yaw: number;
};

function createProjector(pose: Pose) {
  const cosTurn = Math.cos(pose.turn);
  const sinTurn = Math.sin(pose.turn);
  const cosYaw = Math.cos(pose.yaw);
  const sinYaw = Math.sin(pose.yaw);
  const cosTilt = Math.cos(pose.tilt);
  const sinTilt = Math.sin(pose.tilt);

  return (x: number, y: number, z: number): Point => {
    const rolledX = x * cosTurn - y * sinTurn;
    const rolledY = x * sinTurn + y * cosTurn;
    const turnedX = rolledX * cosYaw + z * sinYaw;
    const turnedZ = z * cosYaw - rolledX * sinYaw;
    const tiltedY = rolledY * cosTilt - turnedZ * sinTilt;
    const tiltedZ = rolledY * sinTilt + turnedZ * cosTilt;
    const perspective = 7 / (7 - tiltedZ);

    return {
      x: pose.x + turnedX * pose.size * perspective,
      y: pose.y + tiltedY * pose.size * perspective,
      z: tiltedZ,
    };
  };
}

function trace(context: CanvasRenderingContext2D, points: Point[]) {
  context.beginPath();
  points.forEach(({ x, y }, index) => {
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.closePath();
}

function surfaceArea(points: Point[]) {
  return points.reduce((area, point, index) => {
    const next = points[(index + 1) % points.length];
    return area + point.x * next.y - point.y * next.x;
  }, 0);
}

function drawSolid(context: CanvasRenderingContext2D, pose: Pose, alpha: number) {
  const project = createProjector(pose);
  const faces = profiles.flatMap((profile) => {
    const front = profile.map(([x, y]) => project(x, y, depth / 2));
    const back = profile.map(([x, y]) => project(x, y, -depth / 2));
    const face = { points: front, color: "" };
    const sides = front.map((point, index) => {
      const next = (index + 1) % profile.length;
      const [x, y] = profile[index];
      const [nextX, nextY] = profile[next];
      const light = (nextY - y - 0.45 * (nextX - x)) / Math.hypot(nextX - x, nextY - y);
      const shade = Math.round(140 + light * 46);
      return { points: [front[next], point, back[index], back[next]], color: `rgb(${shade}, ${shade}, ${shade - 4})` };
    });
    return [face, ...sides];
  });

  const gradient = context.createLinearGradient(
    pose.x - pose.size * 0.55, pose.y - pose.size * 1.3,
    pose.x + pose.size, pose.y + pose.size * 1.2,
  );
  gradient.addColorStop(0, "#fafaf1");
  gradient.addColorStop(0.53, "#e9e8e0");
  gradient.addColorStop(1, "#b9b9ae");
  const averagedDepth = ({ points }: (typeof faces)[number]) => (
    points.reduce((sum, { z }) => sum + z, 0) / points.length
  );

  context.save();
  context.globalAlpha = alpha;
  faces.filter(({ points }) => surfaceArea(points) > 0)
    .sort((first, second) => averagedDepth(first) - averagedDepth(second))
    .forEach(({ points, color }) => {
      trace(context, points);
      context.fillStyle = color || gradient;
      context.strokeStyle = color || "#efeee4";
      context.lineWidth = color ? 0.65 : 0.55;
      context.fill();
      context.stroke();
    });
  context.restore();
}

function grid(
  context: CanvasRenderingContext2D,
  project: ReturnType<typeof createProjector>,
  palette: "light" | "dark",
) {
  context.save();
  context.strokeStyle = palette === "dark" ? "#efeee522" : "#2426221b";
  context.lineWidth = 0.65;
  context.beginPath();
  for (let i = -1.4; i <= 1.41; i += 0.14) {
    const a = project(i, -1.4, depth / 2);
    const b = project(i, 1.4, depth / 2);
    const c = project(-1.4, i, depth / 2);
    const d = project(1.4, i, depth / 2);
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.moveTo(c.x, c.y);
    context.lineTo(d.x, d.y);
  }
  context.stroke();
  context.restore();
}

function drawWire(
  context: CanvasRenderingContext2D,
  pose: Pose,
  alpha: number,
  palette: "light" | "dark",
) {
  const project = createProjector(pose);
  context.save();
  context.globalAlpha = alpha;
  context.strokeStyle = palette === "dark" ? "#e5e5d9" : "#32362e";
  profiles.forEach((profile) => {
    const front = profile.map(([x, y]) => project(x, y, depth / 2));
    const back = profile.map(([x, y]) => project(x, y, -depth / 2));
    context.lineWidth = 0.65;
    trace(context, back);
    context.stroke();
    context.beginPath();
    front.forEach(({ x, y }, i) => {
      context.moveTo(x, y);
      context.lineTo(back[i].x, back[i].y);
    });
    context.stroke();
    trace(context, front);
    context.fillStyle = palette === "dark" ? "#f1f1e61d" : "#8a918329";
    context.fill();
    context.lineWidth = 1.1;
    context.stroke();
    context.save();
    context.clip();
    grid(context, project, palette);
    context.restore();
  });
  context.restore();
}

const focalLength = 4;
const nearPlane = 0.8;

const wireframes = Array.from({ length: 7 }, (_, index) => {
  const fraction = index / 6;
  const scale = 0.64 - fraction * 0.48;
  return {
    depth: focalLength / scale,
    openingOffset: 0.44 + fraction * 0.56,
    turn: -0.18 - fraction * 0.75,
    yaw: -0.26 - fraction * 0.7,
    opacity: 0.29 + 0.2 * fraction,
  };
}).reverse();

const [furthestWire] = wireframes;

function easedRange(value: number, start: number, end: number) {
  const fraction = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return fraction * fraction * (3 - 2 * fraction);
}

function drawLight(context: CanvasRenderingContext2D, x: number, y: number, radius: number, alpha: number) {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, "#f6f2deed");
  glow.addColorStop(0.12, "#e9e6dbaf");
  glow.addColorStop(0.32, "#d9d8cb45");
  glow.addColorStop(0.67, "#b7bc9a11");
  glow.addColorStop(1, "#d1d3b900");
  context.save();
  context.globalAlpha = alpha;
  context.fillStyle = glow;
  context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  context.restore();
}

export function prepareCanvas(canvas: HTMLCanvasElement) {
  const { clientWidth: width, clientHeight: height } = canvas;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const pixelWidth = Math.round(width * dpr);
  const pixelHeight = Math.round(height * dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  const context = canvas.getContext("2d");
  if (!context || !width || !height) return null;

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
  return { context, width, height };
}

export function drawHeroMark(
  canvas: HTMLCanvasElement,
  progress: number,
  pointer: { x: number; y: number },
) {
  const surface = prepareCanvas(canvas);
  if (!surface) return;

  const { context, width, height } = surface;
  const small = width < 690;
  const openingLimit = small && width < height ? Math.max(1, height * 0.26 - 48) : Infinity;
  const size = Math.min(height * (small ? 0.194 : 0.264), width * (small ? 0.34 : 0.18), openingLimit);
  const wireSizeLimit = Math.min(width * (small ? 0.46 : 0.43), height * (small ? 0.37 : 0.66));
  const mouseInfluence = 1 - easedRange(progress, 0.01, 0.38);
  const trailX = (small ? 1.33 : 1.88) + pointer.x * 0.37 * mouseInfluence;
  const trailY = -1.21 + pointer.y * 0.35 * mouseInfluence;
  // Leave the final layer visible at the end of the turn.
  const cameraDepth = progress * (furthestWire.depth - focalLength * 0.7);
  // Center the trail independently of its depth zoom so approaching layers cannot drift outward.
  const trailSeparation = Math.max(0, 1 - progress / 0.22) ** 2;
  // The 0–180° readout represents one complete on-screen revolution.
  const rotation = -2 * Math.PI * progress;
  const turnTowardTrail = 0.48 * easedRange(progress, 0.12, 0.55);
  const pose = {
    x: width / 2,
    y: height * (small ? 0.48 : 0.5),
    size,
    turn: -0.1 * progress,
    tilt: 0.015 + pointer.y * 0.12 * mouseInfluence,
    yaw: -0.24 + pointer.x * 0.17 * mouseInfluence,
  };
  const trailPosition = (offset: number) => ({
    x: pose.x + trailX * size * offset,
    y: pose.y + trailY * size * offset,
  });

  const light = trailPosition(trailSeparation);
  drawLight(
    context,
    light.x,
    light.y,
    size * (1.06 + progress * 0.42),
    0.94 - progress * 0.24,
  );

  for (const wire of wireframes) {
    const distance = wire.depth - cameraDepth;
    if (distance <= nearPlane) continue;
    const zoomedSize = size * focalLength / distance;
    const opacity = easedRange(distance, nearPlane, 1.6)
      * (wire.opacity + easedRange(progress, 0.04, 0.28) * 0.27);
    const center = trailPosition(wire.openingOffset * trailSeparation);
    context.save();
    context.translate(center.x, center.y);
    context.rotate(rotation);
    drawWire(context, {
      ...pose,
      x: 0,
      y: 0,
      size: wireSizeLimit * Math.tanh(zoomedSize / wireSizeLimit),
      turn: wire.turn,
      yaw: pose.yaw + wire.yaw + turnTowardTrail,
    }, opacity, "dark");
    context.restore();
  }

  const solidDistance = focalLength - cameraDepth;
  if (solidDistance > nearPlane) {
    const scale = focalLength / solidDistance;
    drawSolid(context, {
      ...pose,
      ...trailPosition(-0.16 * (1 - trailSeparation)),
      size: size * scale,
    }, easedRange(solidDistance, nearPlane, 1.7));
  }
}

export function drawBlueprint(canvas: HTMLCanvasElement, fraction: number) {
  const surface = prepareCanvas(canvas);
  if (!surface) return;

  const { context, width, height } = surface;
  const x = width / 2;
  const y = height / 2;
  const size = Math.min(height * 0.34, width * 0.22);
  const pose = { x, y, size, tilt: 0, turn: 0, yaw: -0.16 };

  context.strokeStyle = "#32362e24";
  context.lineWidth = 0.8;
  context.beginPath();
  for (const offset of [-1.02, -0.51, 0, 0.51, 1.02]) {
    context.moveTo(x + size * offset, 0);
    context.lineTo(x + size * offset, height);
    context.moveTo(0, y + height * offset * 0.6);
    context.lineTo(width, y - width * 0.39 + height * offset * 0.6);
  }
  for (const radius of [0.75, 1.46]) {
    context.moveTo(x + size * radius, y);
    context.arc(x, y, size * radius, 0, Math.PI * 2);
  }
  context.moveTo(0, y);
  context.lineTo(width, y);
  context.stroke();

  drawWire(context, pose, 0.65, "light");

  const cut = (width + height * 0.35) * fraction - height * 0.175;
  context.save();
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(cut + height * 0.175, 0);
  context.lineTo(cut - height * 0.175, height);
  context.lineTo(0, height);
  context.closePath();
  context.clip();
  drawSolid(context, pose, 1);
  context.restore();

  if (fraction > 0 && fraction < 1) {
    context.strokeStyle = "#c45330";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(cut + height * 0.175, 0);
    context.lineTo(cut - height * 0.175, height);
    context.stroke();
  }
}
