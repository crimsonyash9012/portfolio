import { Fragment, type CSSProperties } from "react";

const ScrollWords = ({ children }: { children: string }) => (
  <span className="scroll-words" data-scroll-reveal="words">
    {children.split(" ").map((word, index) => (
      <Fragment key={`${index}-${word}`}>
        {index > 0 && " "}
        <span className="scroll-word" style={{ "--word-index": index } as CSSProperties}>{word}</span>
      </Fragment>
    ))}
  </span>
);

export default ScrollWords;
