import React from "react"
import { motion } from "framer-motion"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
import { FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "astrivix@gmail.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Metro Pillar No-41, Grande Tower, 3rd Floor, Pulinchode Junction, Aluva, Kerala 683101",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+91 79029 31503",
  },
]

const socialLinks = [
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://whatsapp.com" },
  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
]


const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-slate-800/80 p-4 lg:p-6 shadow-lg border border-slate-200 dark:border-slate-600">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col gap-[2px] p-3 text-sm text-slate-600 dark:text-slate-300"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={25} className="text-blue-600 dark:text-blue-400" />
              </motion.div>

              <h1 className="text-lg font-semibold text-slate-800 dark:text-white">
                {ele?.heading}
              </h1>
            </div>

            <p className="font-medium text-slate-600 dark:text-slate-400">{ele?.description}</p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">{ele?.details}</p>
          </motion.div>
        )
      })}

      {/* Follow us section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="pt-4 border-t border-slate-200 dark:border-slate-600"
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Follow us:
        </h3>
        <div className="flex gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                aria-label={social.label}
              >
                <Icon size={20} />
              </motion.a>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default ContactDetails