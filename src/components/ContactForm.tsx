// src/components/ContactForm.tsx
import React, { useRef, useState } from "react";
import { format } from "date-fns";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const SERVICE_ID  = "service_1vvvjqt";
const TEMPLATE_ID = "template_ouo4t6u";
const PUBLIC_KEY  = "sL8n6_XZhlV0_-Ju-";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !dateRef.current) return;

    const formattedDate = format(new Date(), "EEEE, MMMM d, yyyy");
  dateRef.current.value = formattedDate;

    setStatus("sending");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(() => {
        setStatus("sent");
        toast.success("Thank you! We’ll reply soon.");
      })
      .catch(() => {
        setStatus("error");
        toast.error("Oops—please try again.");
      });
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

      <input type="hidden" name="date" ref={dateRef} />

      <button className="btn btn-primary w-100" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      
    </form>
  );
};

export default ContactForm;
