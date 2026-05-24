import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import { motion } from 'framer-motion'
import { fadeIn } from "../components/common/motionFrameVarients"
import { getAllInternships } from "../services/operations/internshipAPI"
import { FiMapPin, FiClock, FiBriefcase, FiArrowRight, FiDollarSign, FiBook, FiStar, FiMonitor, FiSearch } from 'react-icons/fi'


const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const GlowBg = () => (
  <>
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none"></div>
  </>
);

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
      <div className="bg-slate-50 dark:bg-[#030712] min-h-screen transition-colors duration-500">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-[#030712] min-h-screen text-slate-800 dark:text-white overflow-x-hidden transition-colors duration-500">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-[#030712] dark:via-[#0a1628] dark:to-[#030712]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl mx-auto text-center pt-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
              <FiMonitor size={14} /> Nano Robotics Embed Technologies
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Kickstart Your Career
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Gain real-world experience through our internship programs. Learn from <span className="text-blue-600 dark:text-blue-400 font-semibold">industry experts</span> and build your future in tech.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto relative">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search internships by title, company, or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
              />
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">50+</div>
                <div className="text-slate-600 dark:text-slate-400">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">100+</div>
                <div className="text-slate-600 dark:text-slate-400">Interns Placed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">95%</div>
                <div className="text-slate-600 dark:text-slate-400">Placement Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="relative py-8 bg-slate-100 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-slate-600 dark:text-slate-400 font-medium text-sm mr-2">Filter by:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === category
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-white/10 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>
            <span className="text-slate-500 dark:text-slate-400 text-sm">
              Showing <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredInternships.length}</span> internships
            </span>
          </div>
        </div>
      </section>

      {/* ===== INTERNSHIPS GRID ===== */}
      <section className="py-16 relative">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {filteredInternships.length > 0 ? (
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredInternships.map((internship, index) => (
                <motion.div
                  key={internship._id}
                  variants={fadeInUp}
                  className="group bg-white dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/[0.08] rounded-xl overflow-hidden hover:shadow-lg dark:hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/5"></div>
                    <img
                      src={internship.imageUrl || 'https://via.placeholder.com/500x300/1e3a5f/FFFFFF?text=Internship'}
                      alt={internship.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {internship.featured && (
                      <span className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg">
                        <FiStar size={10} /> Featured
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#030712] via-transparent to-transparent opacity-60"></div>
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white text-[10px] font-semibold rounded-full">
                      {internship.type}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-slate-800 dark:text-white font-bold text-lg mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
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

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {internship.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-semibold rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {internship.skills.length > 4 && (
                        <span className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] rounded-full">
                          +{internship.skills.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="text-sm mb-4">
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                        <FiDollarSign /> {internship.stipend}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5 mt-auto">
                      <button
                        onClick={() => handleApply(internship)}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
                      >
                        Apply Now <FiArrowRight size={14} />
                      </button>
                      <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold">{internship.type}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiBriefcase className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">No Internships Found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
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
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-24 relative bg-slate-100 dark:bg-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-600/5"></div>
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span variants={fadeInUp} className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm mb-3 block">Why NRET</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-6">Why Choose Our Internships?</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400">We connect talented individuals with leading companies for meaningful learning experiences.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/[0.08] rounded-xl p-8 hover:shadow-lg dark:hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                <FiBook size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Hands-on Learning</h3>
              <p className="text-slate-600 dark:text-slate-400">Work on real projects that make an impact. Gain practical skills that employers value.</p>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/[0.08] rounded-xl p-8 hover:shadow-lg dark:hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] transition-all duration-300">
                <FiStar size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Expert Mentorship</h3>
              <p className="text-slate-600 dark:text-slate-400">Learn from industry professionals who guide you throughout your internship journey.</p>
            </motion.div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/[0.08] rounded-xl p-8 hover:shadow-lg dark:hover:bg-white/[0.06] hover:border-green-500/30 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 text-green-600 dark:text-green-400 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300">
                <FiBriefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Career Growth</h3>
              <p className="text-slate-600 dark:text-slate-400">Many of our interns get offered full-time positions. Build connections that last.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 relative">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-white mb-6 leading-tight">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Transform</span> Your Career?
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Take the first step towards your dream career. Our internship programs are designed to give you real-world experience and skills that employers value.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Apply Now <FiArrowRight />
                  </button>
                  <button
                    onClick={() => navigate("/catalog")}
                    className="px-8 py-4 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white font-bold text-base hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    Browse Courses
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-blue-200 text-sm">Partner Companies</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg mt-8">
                    <div className="text-4xl font-bold mb-2">500+</div>
                    <div className="text-green-200 text-sm">Students Placed</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-lg">
                    <div className="text-4xl font-bold mb-2">100+</div>
                    <div className="text-orange-200 text-sm">Hiring Partners</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-lg mt-8">
                    <div className="text-4xl font-bold mb-2">95%</div>
                    <div className="text-purple-200 text-sm">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Internship
