import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import { motion } from 'framer-motion'
import { fadeIn } from "../components/common/motionFrameVarients"
import { getAllProjects, getProjectById } from "../services/operations/projectAPI"
import Loading from "../components/common/Loading"
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaTag, FaMicrochip, FaCogs, FaTruck, FaBox } from "react-icons/fa"
import { GiReturnArrow } from 'react-icons/gi'

const ProjectDetails = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allProjects, setAllProjects] = useState([])
  const [mainImageIndex, setMainImageIndex] = useState(0)

  // Get all images (main image first, then additional images)
  const getAllImages = () => {
    if (!project) return []
    const images = []
    if (project.imageUrl) {
      images.push(project.imageUrl)
    }
    if (project.additionalImages && project.additionalImages.length > 0) {
      images.push(...project.additionalImages)
    }
    return images
  }

  const allImages = getAllImages()
  const mainImage = allImages[mainImageIndex] || null

  // Swap main image with clicked thumbnail
  const handleThumbnailClick = (index) => {
    if (index === mainImageIndex) return
    
    // Create new array with swapped images
    const newImages = [...allImages]
    // Swap the images
    const temp = newImages[mainImageIndex]
    newImages[mainImageIndex] = newImages[index]
    newImages[index] = temp
    
    // Update project with new image order
    if (mainImageIndex === 0) {
      // Main image was at index 0, update imageUrl
      setProject(prev => ({
        ...prev,
        imageUrl: newImages[0],
        additionalImages: newImages.slice(1)
      }))
    } else {
      // Main image was in additional images
      setProject(prev => ({
        ...prev,
        imageUrl: newImages[0],
        additionalImages: newImages.slice(1)
      }))
    }
    
    setMainImageIndex(0)
  }

  useEffect(() => {
    fetchProjectDetails()
  }, [projectId])

  const fetchProjectDetails = async () => {
    try {
      setLoading(true)
      // Fetch the specific project by ID
      const foundProject = await getProjectById(projectId)
      setProject(foundProject)
      
      // Also fetch all projects for related projects section
      const projectsData = await getAllProjects()
      setAllProjects(projectsData)
    } catch (error) {
      console.error("Error fetching project:", error)
    } finally {
      setLoading(false)
    }
  }

  // Get related projects (same category)
  const relatedProjects = allProjects
    .filter(p => p.category === project?.category && p._id !== project?._id)
    .slice(0, 3)

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

      {/* Hero Section */}
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial='hidden'
        animate='show'
        className="px-6 sm:px-10 lg:px-20 pt-16 pb-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Project Images Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
            {/* Main Image */}
            <div className="lg:col-span-3 relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-slate-500 dark:text-slate-400 text-lg">No Image Available</span>
                </div>
              )}
              {project.featured && (
                <span className="absolute top-4 left-4 px-4 py-1 bg-yellow-400 text-black text-sm font-bold rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            {/* Thumbnail Images - 3 images in column */}
            <div className="flex flex-col gap-3 lg:col-span-1">
              {[0, 1, 2].map((index) => {
                const thumbnailImage = allImages[index + 1]
                return (
                <motion.div 
                  key={index}
                  whileHover={thumbnailImage ? { scale: 1.02 } : {}}
                  onClick={() => thumbnailImage && handleThumbnailClick(index + 1)}
                  className={`relative h-24 sm:h-28 lg:h-32 rounded-xl overflow-hidden cursor-pointer border-4 transition-all ${
                    mainImageIndex === index + 1 ? 'border-blue-500' : 'border-slate-200 dark:border-slate-600'
                  } ${thumbnailImage ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {thumbnailImage ? (
                    <img
                      src={thumbnailImage}
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                      <span className="text-slate-400 dark:text-slate-500 text-xs text-center px-2">No Image</span>
                    </div>
                  )}
                </motion.div>
              )})}
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <FaTag className="text-blue-600 dark:text-blue-400" />
                  {project.category}
                </span>
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <FaCalendarAlt className="text-blue-600 dark:text-blue-400" />
                  {project.status}
                </span>
              </div>

              {project.projectIntroduction && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Project Introduction</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                    {project.projectIntroduction}
                  </p>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">About the Project</h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Included */}
              {project.projectIncluded && project.projectIncluded.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaBox className="text-blue-600" /> What's Included
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.projectIncluded.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Software Details */}
              {project.softwareDetails && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaMicrochip className="text-blue-600" /> Software Details
                  </h2>
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl">
                    <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{project.softwareDetails}</p>
                  </div>
                </div>
              )}

              {/* Hardware Details */}
              {project.hardwareDetails && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaCogs className="text-blue-600" /> Hardware Details
                  </h2>
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl">
                    <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{project.hardwareDetails}</p>
                  </div>
                </div>
              )}

              {/* Shipping Details */}
              {project.shippingDetails && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaTruck className="text-blue-600" /> Shipping Details
                  </h2>
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl">
                    <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{project.shippingDetails}</p>
                  </div>
                </div>
              )}

              {/* Project Links */}
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <FaExternalLinkAlt size={16} />
                    Live Demo
                  </a>
                )}
                <Link
                  to={`/book-project/${project._id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Click to Order It
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-[#0a1120] rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Category</p>
                    <p className="font-medium text-slate-800 dark:text-white">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </div>
                  {project.duration && (
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Duration</p>
                      <p className="font-medium text-slate-800 dark:text-white">{project.duration}</p>
                    </div>
                  )}
                  {project.teamSize && (
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Team Size</p>
                      <p className="font-medium text-slate-800 dark:text-white">{project.teamSize} members</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial='hidden'
          animate='show'
          className="px-6 sm:px-10 lg:px-20 py-12 bg-slate-100 dark:bg-[#0a1120] transition-colors duration-500"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relProject, index) => (
                <Link
                  key={relProject._id}
                  to={`/projects/${relProject._id}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relProject.imageUrl || 'https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=Project'}
                      alt={relProject.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {relProject.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {relProject.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  )
}

export default ProjectDetails
