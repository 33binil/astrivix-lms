import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import { motion } from 'framer-motion';
import { fadeIn } from "../components/common/motionFrameVarients"
import { getAllProjects } from "../services/operations/projectAPI"
import Loading from "../components/common/Loading"
import { GiReturnArrow } from 'react-icons/gi'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  // Fetch projects from shared API
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

  // Filter projects based on category and search
  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === "all" || project.category === filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch && project.status === 'active'
  })

  // Get unique categories
  const categories = ["all", ...new Set(projects.map(project => project.category).filter(Boolean))]

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
            Our <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h1>
          <p className="font-['Happy_Monkey'] text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 transition-colors duration-500">
            Explore our portfolio of innovative projects showcasing cutting-edge technology and creative solutions.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search projects by title, description, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors duration-500"
            />
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
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-slate-700 dark:text-slate-300 transition-colors duration-500">
            Showing <span className="font-bold">{filteredProjects.length}</span> projects
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial='hidden'
        animate='show'
        className="px-6 sm:px-10 lg:px-20 py-12"
      >
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <Link to={`/projects/${project._id}`} key={project._id}>
              <motion.div
                variants={fadeIn('up', 0.1 * index)}
                initial='hidden'
                animate='show'
                className="bg-white dark:bg-[#0a1120] rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl || 'https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=Project'}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                      Featured
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-800 dark:text-white text-xl mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Category:</span>
                      <span>{project.category}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Status:</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                        {project.status}
                      </span>
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                      Click to View Details →
                    </span>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 transition-colors duration-500">No Projects Found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-500">
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
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        variants={fadeIn('up', 0.4)}
        initial='hidden'
        animate='show'
        className="px-6 sm:px-10 lg:px-20 py-16 sm:py-20 lg:py-24 bg-slate-100 dark:bg-[#0a1120] transition-colors duration-500"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-['Afacad'] text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 transition-colors duration-500">
            Interested in Our Work?
          </h2>
          <p className="font-['Happy_Monkey'] text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 transition-colors duration-500">
            Have a project in mind or want to collaborate? We'd love to hear from you!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Get In Touch
            </a>
            <a
              href="/about"
              className="bg-slate-800 dark:bg-slate-700 text-white px-8 py-3 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors font-semibold text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default Projects
