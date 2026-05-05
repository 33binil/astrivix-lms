import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl p-7 lg:p-14 flex gap-3 flex-col bg-white dark:bg-slate-800/80 shadow-lg">
      <h1 className="text-4xl leading-10 font-semibold text-slate-800 dark:text-white">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="text-slate-600 dark:text-slate-400">
        Tell us more about yourself and what you&apos;ve got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;