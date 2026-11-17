import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";

import ScrollWords from "@/components/ScrollWords";

const email = "yashkrgola9012@gmail.com";
const emailSettings = {
  publicKey: import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY,
  serviceId: import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID,
};

const profiles = [
  { name: "GitHub", url: "https://github.com/crimsonyash9012" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/yash-kumar-gola-480940282" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~01d3b996bcec5064ad" },
];

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setStatus("sending");

    try {
      await emailjs.send(emailSettings.serviceId, emailSettings.templateId, fields, {
        publicKey: emailSettings.publicKey,
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form className="contact-form" data-scroll-reveal="rise" onSubmit={submit}>
      <label>Name<input name="from_name" autoComplete="name" required /></label>
      <label>Email<input type="email" name="from_email" autoComplete="email" required /></label>
      <label>Subject<input name="subject" required /></label>
      <label>Message<textarea name="message" rows={4} required /></label>
      <button className="text-link" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"} <ArrowUpRight aria-hidden="true" />
      </button>
      <p role="status">
        {status === "sent" && "Message sent."}
        {status === "failed" && "Message could not be sent. Please use the email link above."}
      </p>
    </form>
  );
};

const Contact = () => (
  <section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-title">
    <div className="contact-meta" data-scroll-reveal="rise"><p>Yash Kumar Gola</p><p>Delhi, India · UTC+5:30</p></div>
    <h2 className="contact-display" id="contact-title">
      <ScrollWords>Something</ScrollWords>{" "}<ScrollWords>worth building?</ScrollWords>
    </h2>
    <a className="contact-email" data-scroll-reveal="rise" href={`mailto:${email}`}>
      <span>{email}</span><ArrowUpRight aria-hidden="true" />
    </a>
    <div className="contact-links">
      <nav aria-label="Footer navigation" data-scroll-reveal="rise">
        <p className="small-label">Explore</p>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
        </ul>
      </nav>
      <div data-scroll-reveal="rise">
        <p className="small-label">Connect</p>
        <ul>
          {profiles.map(({ name, url }) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {name} <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    {emailSettings.publicKey && emailSettings.serviceId && emailSettings.templateId && <ContactForm />}
  </section>
);

export default Contact;
