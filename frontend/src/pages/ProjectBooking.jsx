import React, { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { fadeIn } from "../components/common/motionFrameVarients"
import Footer from "../components/common/Navbar"
import Navbar from "../components/common/Navbar"
import Loading from "../components/common/Loading"
import { getProjectById, submitProjectBooking } from "../services/operations/projectAPI"
import CountryCode from "../../data/countrycode.json"
import { FaCheck, FaProjectDiagram } from "react-icons/fa"
import { GiReturnArrow } from 'react-icons/gi'

const ProjectBooking = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
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
    fetchProjectDetails()
  }, [projectId])

  const fetchProjectDetails = async () => {
    try {
      setLoading(true)
      const foundProject = await getProjectById(projectId)
      setProject(foundProject)
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)
      await submitProjectBooking({
        ...data,
        projectId,
        projectTitle: project?.title
      })
      setSubmitted(true)
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (error) {
      console.error("Error submitting booking:", error)
      alert("Failed to submit booking. Please try again.")
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

  if (!project) {
    return (
      <div className="bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Projects
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
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Booking Submitted!</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Thank you for your interest in "{project.title}". Our team will contact you within 24 hours.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Redirecting to home...</p>
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
              Order Your Project
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Fill in your details and we'll get back to you with the next steps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#0a1120] rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <FaProjectDiagram className="text-blue-600" />
                  Project Details
                </h3>
                
                {project.imageUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}

                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{project.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Category</span>
                    <span className="font-medium text-slate-800 dark:text-white">{project.category}</span>
                  </div>
                  {project.duration && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Duration</span>
                      <span className="font-medium text-slate-800 dark:text-white">{project.duration}</span>
                    </div>
                  )}
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
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
                      Company/Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter company name (optional)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                      {...register("company")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      placeholder="Tell us about any specific requirements or modifications you need..."
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
                    {submitting ? "Submitting..." : "Submit your order"}
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

export default ProjectBooking