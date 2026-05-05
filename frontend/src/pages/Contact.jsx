import React, { useState } from "react"
import { motion } from "framer-motion"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactForm from "../components/core/ContactPage/ContactForm"

const faqData = [
  {
    question: "What courses do you offer?",
    answer: "We offer courses in Web Development, Data Science, AI/ML, IoT & Robotics, Cybersecurity, UI/UX Design, and Cloud Computing."
  },
  {
    question: "How can I enroll in a course?",
    answer: "You can enroll by visiting our catalog page, selecting your desired course, and following the registration process."
  },
  {
    question: "Do you provide internship opportunities?",
    answer: "Yes, we provide internship programs where students work on real-world projects under expert supervision."
  },
  {
    question: "What is the duration of your training programs?",
    answer: "Our training programs range from 4 weeks to 6 months depending on the course complexity and your learning pace."
  },
  {
    question: "Are the courses suitable for beginners?",
    answer: "Absolutely! We have courses designed for beginners as well as advanced practitioners."
  },
  {
    question: "Do you provide certificates after course completion?",
    answer: "Yes, we provide certificates upon successful completion of all courses and projects."
  }
]

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-slate-200 dark:border-slate-600 last:border-b-0"
    >
      <button
        onClick={onClick}
        className="w-full py-4 flex justify-between items-center text-left hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 rounded-xl px-3 -mx-3"
      >
        <span className={`font-semibold pr-4 transition-colors duration-300 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-100'}`}>{question}</span>
        <span className={`text-2xl font-bold transition-all duration-300 ${isOpen ? 'rotate-45 text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="pb-4 text-slate-600 dark:text-slate-300 pl-3">{answer}</p>
      </div>
    </motion.div>
  )
}


const Contact = () => {
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="bg-slate-50 dark:bg-[#000814] transition-colors duration-500 min-h-screen">
      {/* Intro Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-20 text-center bg-gradient-to-b from-white dark:from-[#000814] to-slate-50 dark:to-[#0f172a]"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-['Afacad'] text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 transition-colors duration-500"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-['Happy_Monkey'] text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4 transition-colors duration-500"
        >
          Have questions about our internships, workshops, or training programs? We&apos;d love to hear from you!
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-['Happy_Monkey'] text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-500"
        >
          Reach out to our team for course details, partnership opportunities, or any technical support. We&apos;ll get back to you as soon as possible.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="px-6 sm:px-10 lg:px-20 pb-12 sm:pb-16 lg:pb-20"
      >
        <div className="mx-auto flex w-full max-w-maxContent flex-col lg:flex-row justify-between gap-10 rounded-2xl p-6 sm:p-10 lg:p-14 bg-[#F1F7FF] dark:bg-[#1e3a5f] transition-colors duration-500">
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:w-[40%] w-full"
          >
            <ContactDetails />
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:w-[60%] w-full"
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>

      {/* Map Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 sm:px-10 lg:px-20 pb-12 sm:pb-16 lg:pb-20"
      >
        <div className="mx-auto max-w-5xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-['Afacad'] text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white text-center mb-8 transition-colors duration-500"
          >
            Find Us Here
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.812018044231!2d77.63986850942732!3d12.92391998734769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae148d689a5d71%3A0x8527d77438b5013c!2sNRET!5e0!3m2!1sen!2sin!4v1704067222000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 sm:px-10 lg:px-20 pb-12 sm:pb-16 lg:pb-20"
      >
        <div className="mx-auto max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-['Afacad'] text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white text-center mb-8 transition-colors duration-500"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-[#0f172a] rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700"
          >
            {faqData.map((faq, index) => (
              <FAQItem 
                key={index} 
                index={index}
                question={faq.question} 
                answer={faq.answer} 
                isOpen={openFAQ === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* footer */}
      <Footer />
    </div>
  )
}

export default Contact