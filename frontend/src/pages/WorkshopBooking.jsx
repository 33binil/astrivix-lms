import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import { FiArrowRight, FiCheck, FiMonitor, FiUser, FiMail, FiPhone, FiBookOpen, FiCalendar, FiMessageSquare, FiSend } from 'react-icons/fi'
import { GiReturnArrow } from 'react-icons/gi'
import toast from "react-hot-toast"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const workshops = [
  { value: "ai-ml", label: "AI & Machine Learning" },
  { value: "robotics", label: "Robotics" },
  { value: "iot", label: "Internet of Things (IoT)" },
  { value: "embedded", label: "Embedded Systems" },
  { value: "python", label: "Python Programming" },
  { value: "web-dev", label: "Web Development" },
];

const WorkshopBooking = () => {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    workshop: "",
    date: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.firstName || !formData.email || !formData.phone || !formData.workshop) {
      toast.error("Please fill in all required fields")
      return
    }
    setSubmitted(true)
    toast.success("Workshop booking submitted successfully!")
  }

  if (submitted) {
    return (
      <div className="bg-[#030712] min-h-screen text-white">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[80vh] px-6"
        >
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-12 text-center max-w-lg backdrop-blur-sm">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <FiCheck className="text-4xl text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Booking Submitted!</h1>
            <p className="text-slate-400 mb-6">
              Thank you for your interest in our workshops. Our team will contact you within 24-48 hours with the next steps.
            </p>
            <button
              onClick={() => navigate("/workshops")}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              Back to Workshops <FiArrowRight />
            </button>
          </div>
        </motion.div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-[#030712] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* Back Button */}
      <div className="relative px-6 sm:px-10 lg:px-20 pt-20 lg:pt-24 pb-2">
        <div className="flex items-center gap-2 cursor-pointer transition-all group" onClick={() => navigate(-1)}>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
            <GiReturnArrow size={20} />
          </div>
          <span className="text-sm font-bold text-slate-400 group-hover:text-blue-400 transition-colors">Back</span>
        </div>
      </div>

      <div className="px-6 sm:px-10 lg:px-20 pt-10 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
              <FiMonitor size={14} /> Nano Robotics Embed Technologies
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Book a Workshop
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
              Fill in your details and we'll get back to you with available dates and pricing.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm sticky top-24">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FiBookOpen className="text-blue-400" />
                  Why Join?
                </h3>
                <ul className="space-y-3 text-sm text-slate-400">
                  {[
                    "Hands-on project-based learning",
                    "Expert industry mentorship",
                    "Certificate of completion",
                    "Real-world portfolio projects",
                    "Flexible scheduling options",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FiCheck className="text-emerald-400 mt-0.5 shrink-0" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-slate-500 text-xs mb-2">Have questions?</p>
                  <p className="text-blue-400 text-sm font-semibold">info@nret.in</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6">Your Information</h3>

                <div className="space-y-5">
                  {/* Name */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter first name"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter last name"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Phone <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Workshop Select */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Select Workshop <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <FiBookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 z-10" size={16} />
                      <select
                        name="workshop"
                        value={formData.workshop}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500/50 focus:outline-none transition-colors appearance-none"
                      >
                        <option value="" className="bg-[#030712]">Select a workshop</option>
                        {workshops.map((w) => (
                          <option key={w.value} value={w.value} className="bg-[#030712]">{w.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Start Date</label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500/50 focus:outline-none transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Any specific requirements or questions..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-[1.02] hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiSend size={16} />
                    Submit Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default WorkshopBooking
