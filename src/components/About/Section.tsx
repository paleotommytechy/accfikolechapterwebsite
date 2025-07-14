// src/components/About/Section.tsx
import React from "react";

type SectionProps = {
  id?: string;
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="mb-5">
    <h4 className="fw-bold mb-3 border-bottom pb-2">{title}</h4>
    {children}
  </section>
);

export default Section;
