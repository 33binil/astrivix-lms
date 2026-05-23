import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import { motion } from 'framer-motion';
import { fadeIn } from "../components/common/motionFrameVarients"
import { getAllProjects } from "../services/operations/projectAPI"
import Loading from "../components/common/Loading"
import { GiReturnArrow, GiBrain, GiMicrochip, GiCircuitry, GiRobotGolem } from 'react-icons/gi'
import { FiMonitor, FiSearch, FiArrowRight, FiCode, FiFolder, FiStar } from 'react-icons/fi'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const projectsData = await getAllProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === "all" || project.category === filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch && project.status === 'active'
  })

  const categories = ["all", ...new Set(projects.map(project => project.category).filter(Boolean))]

  const GlowBg = () => (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none"></div>
    </>
  );

  if (loading) {
    return (
      <div className="bg-[#030712] min-h-screen transition-colors duration-500">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <Loading />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-[#030712] min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0a1628] to-[#030712]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.3) 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full">
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-4xl mx-auto text-center pt-12"
          >
            {/* Back Button */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-8 justify-start max-w-4xl mx-auto cursor-pointer group" onClick={() => navigate(-1)}>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                <GiReturnArrow size={20} />
              </div>
              <span className="text-sm font-bold text-slate-400 group-hover:text-blue-400 transition-colors">Back</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
              <FiMonitor size={14} /> Nano Robotics Embed Technologies
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                Our Projects
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Explore real-time projects developed in <span className="text-blue-400 font-semibold">AI, Robotics, IoT, Embedded Systems</span>, and emerging technologies through practical learning and innovation-driven development.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto relative">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search projects by title, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-blue-500/50 focus:outline-none transition-all duration-300"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section className="relative py-8 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-slate-400 font-medium text-sm mr-2">Filter:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === category
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            <span className="text-slate-500 text-sm">
              <span className="text-blue-400 font-bold">{filteredProjects.length}</span> projects found
            </span>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section className="py-16 relative">
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {filteredProjects.length > 0 ? (
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <Link to={`/projects/${project._id}`} key={project._id}>
                  <motion.div
                    variants={fadeInUp}
                    className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl overflow-hidden hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/5"></div>
                      <img
                        src={project.imageUrl || 'https://via.placeholder.com/400x250/1e3a5f/FFFFFF?text=NRET+Project'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {project.featured && (
                        <span className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg">
                          <FiStar size={10} /> Featured
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60"></div>
                      <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-400 text-[10px] rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Status & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                          <FiCode size={12} />
                          <span className="text-emerald-400 font-semibold">{project.status}</span>
                        </span>
                        <span className="text-blue-400 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details <FiArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiFolder className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
                <p className="text-slate-400 mb-6">
                  {searchTerm || filter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No projects have been added yet. Check back soon!"}
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

      {/* ===== CALL TO ACTION ===== */}
      <section className="py-24 relative bg-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-600/5"></div>
        <GlowBg />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
              Interested in Our Work?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Have a project in mind or want to collaborate? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2"
              >
                Get In Touch <FiArrowRight />
              </Link>
              <Link
                to="/about"
                className="px-8 py-3.5 rounded-full bg-white/5 border border-white/20 text-white font-bold text-base hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
              >
                Learn More <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Projects
