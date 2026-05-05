import React, { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { fadeIn } from "../components/common/motionFrameVarients"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import Loading from "../components/common/Loading"
import { getInternshipById, submitInternshipApplication } from "../services/operations/internshipAPI"
import CountryCode from "../../data/countrycode.json"
import { GiReturnArrow } from 'react-icons/gi'
import { FaCheck, FaBriefcase } from "react-icons/fa"
import toast from "react-hot-toast"

const InternshipApplication = () => {
  const { internshipId } = useParams()
  const navigate = useNavigate()
  const [internship, setInternship] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    fetchInternshipDetails()
  }, [internshipId])

  const fetchInternshipDetails = async () => {
    try {
      setLoading(true)
      const foundInternship = await getInternshipById(internshipId)
      setInternship(foundInternship)
    } catch (error) {
      console.error("Error fetching internship:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)
      await submitInternshipApplication({
        ...data,
        internshipId,
        internshipTitle: internship?.title
      })
      setSubmitted(true)
      toast.success("Application submitted successfully!")
      setTimeout(() => {
        navigate("/internship")
      }, 3000)
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <Loading />
        </div>
        <Footer />
      </div>
    )
  }

  if (!internship) {
    return (
      <div className="bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Internship Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">The internship you're looking for doesn't exist.</p>
          <Link to="/internship" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Internships
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[80vh] px-6"
        >
          <div className="bg-white dark:bg-[#0a1120] p-12 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 text-center max-w-lg">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-4xl text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Application Submitted!</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Thank you for your interest in "{internship.title}". Our team will contact you within 24-48 hours.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Redirecting to internships...</p>
          </div>
        </motion.div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
      <Navbar />

      {/* Back Button */}
      <div className="relative px-6 sm:px-10 lg:px-20 pt-20 lg:pt-24 pb-2">
        <div className="absolute left-6 top-20 lg:left-10 lg:top-24 z-[100] flex items-center gap-2 cursor-pointer transition-all group" onClick={() => navigate(-1)}>
          <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all">
            <GiReturnArrow size={20} />
          </div>
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Back</span>
        </div>
      </div>

      <motion.div
        variants={fadeIn('up', 0.1)}
        initial='hidden'
        animate='show'
        className="px-6 sm:px-10 lg:px-20 pt-16 pb-20"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Apply for Internship
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Fill in your details and we'll get back to you with the next steps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Internship Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#0a1120] rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <FaBriefcase className="text-blue-600" />
                  Internship Details
                </h3>
                
                {internship.imageUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={internship.imageUrl} 
                      alt={internship.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}

                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{internship.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {internship.description}
                </p>

                <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Type</span>
                    <span className="font-medium text-slate-800 dark:text-white">{internship.type}</span>
                  </div>
                  {internship.duration && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Duration</span>
                      <span className="font-medium text-slate-800 dark:text-white">{internship.duration}</span>
                    </div>
                  )}
                  {internship.stipend && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Stipend</span>
                      <span className="font-medium text-slate-800 dark:text-white">{internship.stipend}</span>
                    </div>
                  )}
                  {internship.location && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Location</span>
                      <span className="font-medium text-slate-800 dark:text-white">{internship.location}</span>
                    </div>
                  )}
                </div>

                {internship.skills && internship.skills.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {internship.skills.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                          +{internship.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-[#0a1120] rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Your Information</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        {...register("firstname", { required: "First name is required" })}
                      />
                      {errors.firstname && (
                        <span className="text-red-500 text-sm mt-1">{errors.firstname.message}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        {...register("lastname")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-3">
                      <select
                        className="w-24 px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        {...register("countrycode", { value: "+91" })}
                      >
                        {CountryCode.map((ele, i) => (
                          <option key={i} value={ele.code}>
                            {ele.code}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="12345 67890"
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                        {...register("phoneNo", { 
                          required: "Phone number is required",
                          minLength: { value: 10, message: "Invalid phone number" },
                          maxLength: { value: 12, message: "Invalid phone number" }
                        })}
                      />
                    </div>
                    {errors.phoneNo && (
                      <span className="text-red-500 text-sm mt-1">{errors.phoneNo.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                      {...register("linkedin")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/your-username (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                      {...register("github")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Why are you interested in this internship?
                    </label>
                    <textarea
                      placeholder="Tell us why you're interested in this opportunity and what you hope to learn..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors resize-none"
                      {...register("message")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-xl transition-colors duration-300 text-lg"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>

                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default InternshipApplication
