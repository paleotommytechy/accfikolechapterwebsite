// src/components/ContactForm.tsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_u8qd6ni";
const TEMPLATE_ID = "template_3n89vr8";
const PUBLIC_KEY  = "sH53aZOAev148aQVy";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(() => setStatus("sent"))
      .catch(() => setStatus("error"));
  };

  return (
    <form ref={formRef} onSubmit={sendEmail} className="p-4 shadow rounded-4">
      <h5 className="mb-3">Ask a Question</h5>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input name="user_name" className="form-control" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" name="user_email" className="form-control" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea name="message" rows={4} className="form-control" required />
      </div>

      <button className="btn btn-primary w-100" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      {status === "sent"  && <p className="text-success mt-3">Thank you! We’ll reply soon.</p>}
      {status === "error" && <p className="text-danger  mt-3">Oops—please try again.</p>}
    </form>
  );
};

export default ContactForm;
