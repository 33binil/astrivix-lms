import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { motion } from 'framer-motion'
import { fadeIn } from "../components/common/motionFrameVarients"
import { getAllInternships } from "../services/operations/internshipAPI"
import { FiMapPin, FiClock, FiBriefcase, FiArrowRight, FiDollarSign, FiBook, FiStar } from 'react-icons/fi'
import { GiReturnArrow } from 'react-icons/gi'

const Internship = () => {
  const navigate = useNavigate()
  const [internships, setInternships] = useState([])
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInternships()
  }, [])

  const fetchInternships = async () => {
    try {
      setLoading(true)
      const internshipsData = await getAllInternships()
      setInternships(internshipsData || [])
    } catch (error) {
      console.error("Error fetching internships:", error)
      setInternships([])
    } finally {
      setLoading(false)
    }
  }

  const filteredInternships = internships.filter(internship => {
    const matchesFilter = filter === "all" || internship.type === filter
    const skillsArray = internship.skills || []
    const matchesSearch = internship.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skillsArray.some(skill => skill?.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const categories = ["all", ...new Set(internships.map(internship => internship.type).filter(Boolean))]

  const handleApply = (internship) => {
    navigate(`/apply-internship/${internship._id}`)
  }

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial='hidden'
        animate='show'
        className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 px-6 sm:px-10 lg:px-20 pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 transition-colors duration-500"
      >
        {/* Back Button */}
        <div className="absolute left-4 top-20 lg:top-24 z-[100] flex items-center gap-2 cursor-pointer transition-all group" onClick={() => navigate(-1)}>
          <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all">
            <GiReturnArrow size={20} />
          </div>
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Back</span>
        </div>

        <div className="text-center max-w-4xl mx-auto pt-16">
          <h1 className="font-['Afacad'] text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-6 transition-colors duration-500">
            Kickstart Your <span className="text-blue-600 dark:text-blue-400">Career</span>
          </h1>
          <p className="font-['Happy_Monkey'] text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 transition-colors duration-500">
            Gain real-world experience through our internship programs. Learn from industry experts and build your future in tech.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search internships by title, company, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors duration-500"
            />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
              <div className="text-slate-600 dark:text-slate-400">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-slate-600 dark:text-slate-400">Interns Placed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</div>
              <div className="text-slate-600 dark:text-slate-400">Placement Rate</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial='hidden'
        animate='show'
        className="px-6 sm:px-10 lg:px-20 py-8 bg-slate-100 dark:bg-[#0a1120] transition-colors duration-500"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-slate-700 dark:text-slate-300 font-medium mr-3 transition-colors duration-500">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  filter === category
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-slate-700 dark:text-slate-300 transition-colors duration-500">
            Showing <span className="font-bold">{filteredInternships.length}</span> internships
          </div>
        </div>
      </motion.div>

      {/* Internships Grid */}
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        animate='show'
        className="px-6 sm:px-10 lg:px-20 py-12"
      >
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredInternships.map((internship, index) => (
              <motion.div
                key={internship._id}
                variants={fadeIn('up', 0.1 * index)}
                initial='hidden'
                animate='show'
                className="bg-white dark:bg-[#0a1120] rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={internship.imageUrl || 'https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=Internship'}
                    alt={internship.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {internship.featured && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {internship.title}
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <FiMapPin /> {internship.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock /> {internship.duration}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {internship.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {internship.skills.slice(0, 4).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {internship.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                        +{internship.skills.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="text-sm mb-4">
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                      <FiDollarSign /> {internship.stipend}
                    </span>
                  </div>

                  <button
                    onClick={() => handleApply(internship)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    Apply Now <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBriefcase className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 transition-colors duration-500">
                No Internships Found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-500">
                {searchTerm || filter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No internships available at the moment. Check back soon!"}
              </p>
              {(searchTerm || filter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setFilter("all")
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        variants={fadeIn('up', 0.4)}
        initial='hidden'
        animate='show'
        className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24 bg-slate-100 dark:bg-[#0a1120] transition-colors duration-500"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Afacad'] text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 transition-colors duration-500">
              Why Choose Our Internships?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-500">
              We connect talented individuals with leading companies for meaningful learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <FiBook className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Hands-on Learning</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Work on real projects that make an impact. Gain practical skills that employers value.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <FiStar className="text-purple-600 dark:text-purple-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Expert Mentorship</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Learn from industry professionals who guide you throughout your internship journey.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <FiBriefcase className="text-green-600 dark:text-green-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">Career Growth</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Many of our interns get offered full-time positions. Build connections that last.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={fadeIn('up', 0.5)}
        initial='hidden'
        animate='show'
        className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0a1120] transition-colors duration-500"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Afacad'] text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 transition-colors duration-500">
                Ready to <span className="text-blue-600 dark:text-blue-400">Transform</span> Your Career?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 transition-colors duration-500">
                Take the first step towards your dream career. Our internship programs are designed to give you real-world experience and skills that employers value.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg text-center"
                >
                  Apply Now
                </a>
                <a
                  href="/catalog"
                  className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold text-lg text-center"
                >
                  Browse Courses
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <div className="text-blue-100">Partner Companies</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-2xl text-white mt-8">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-green-100">Students Placed</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white">
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <div className="text-orange-100">Hiring Partners</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white mt-8">
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-purple-100">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default Internship
