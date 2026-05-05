import React, { useState, useEffect } from "react"
import { motion } from 'framer-motion';
import { fadeIn } from "../../../../components/common/motionFrameVarients"
import { useSelector } from 'react-redux'
import { createProject, updateProject, deleteProject, getAllProjects } from "../../../../services/operations/projectAPI"
import { toast } from "react-hot-toast"

// Icons
import { FiPlus, FiEdit, FiTrash2, FiEye, FiExternalLink, FiGithub, FiCalendar, FiTag, FiUser, FiUpload, FiX } from 'react-icons/fi'
import { MdDashboard, MdCategory, MdDescription, MdLink } from 'react-icons/md'

const AddProjects = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    demoUrl: '',
    imageUrl: '',
    additionalImages: [],
    category: '',
    status: 'active',
    featured: false,
    projectIntroduction: '',
    projectIncluded: [],
    softwareDetails: '',
    hardwareDetails: '',
    shippingDetails: ''
  })

  const [techInput, setTechInput] = useState('')
  const [includedInput, setIncludedInput] = useState('')
  const [additionalImages, setAdditionalImages] = useState([])
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [categories] = useState([
    'Web Development',
    'Mobile Development', 
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'Backend Development',
    'Full Stack',
    'DevOps',
    'Other'
  ])

  // Fetch projects
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const projectsData = await getAllProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast.error("Failed to fetch projects")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  const handleRemoveTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  const handleAddIncluded = () => {
    if (includedInput.trim() && !formData.projectIncluded.includes(includedInput.trim())) {
      setFormData(prev => ({
        ...prev,
        projectIncluded: [...prev.projectIncluded, includedInput.trim()]
      }))
      setIncludedInput('')
    }
  }

  const handleRemoveIncluded = (item) => {
    setFormData(prev => ({
      ...prev,
      projectIncluded: prev.projectIncluded.filter(i => i !== item)
    }))
  }

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files)
    const newPreviews = []
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result)
        if (newPreviews.length === files.length) {
          setAdditionalImagePreviews(prev => [...prev, ...newPreviews])
          setAdditionalImages(prev => [...prev, ...files])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveAdditionalImage = (index) => {
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index))
    setAdditionalImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData(prev => ({ ...prev, imageUrl: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview('')
    setFormData(prev => ({ ...prev, imageUrl: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingProject) {
        // Update existing project
        await updateProject(editingProject._id, formData, token, imageFile, additionalImages)
        toast.success("Project updated successfully!")
      } else {
        // Create new project
        await createProject(formData, token, imageFile, additionalImages)
        toast.success("Project added successfully!")
      }

      // Reset form and refresh projects
      setFormData({
        title: '',
        description: '',
        technologies: [],
        demoUrl: '',
        imageUrl: '',
        additionalImages: [],
        category: '',
        status: 'active',
        featured: false,
        projectIntroduction: '',
        projectIncluded: [],
        softwareDetails: '',
        hardwareDetails: '',
        shippingDetails: ''
      })
      setImageFile(null)
      setImagePreview('')
      setAdditionalImages([])
      setAdditionalImagePreviews([])
      setShowForm(false)
      setEditingProject(null)
      fetchProjects()
    } catch (error) {
      console.error("Error saving project:", error)
      toast.error("Failed to save project")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies || [],
      demoUrl: project.demoUrl || '',
      imageUrl: project.imageUrl || '',
      additionalImages: project.additionalImages || [],
      category: project.category || '',
      status: project.status || 'active',
      featured: project.featured || false,
      projectIntroduction: project.projectIntroduction || '',
      projectIncluded: project.projectIncluded || [],
      softwareDetails: project.softwareDetails || '',
      hardwareDetails: project.hardwareDetails || '',
      shippingDetails: project.shippingDetails || ''
    })
    setImagePreview(project.imageUrl || '')
    setImageFile(null)
    setAdditionalImagePreviews(project.additionalImages || [])
    setAdditionalImages([])
    setShowForm(true)
  }

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId, token)
        toast.success("Project deleted successfully!")
        fetchProjects()
      } catch (error) {
        console.error("Error deleting project:", error)
        toast.error("Failed to delete project")
      }
    }
  }

  const renderProjectForm = () => (
    <motion.div
      variants={fadeIn('up', 0.2)}
      initial='hidden'
      animate='show'
      className="bg-white dark:bg-[#0a1120] p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </h3>
          <button
            onClick={() => {
              setShowForm(false)
              setEditingProject(null)
              setFormData({
                title: '',
                description: '',
                technologies: [],
                demoUrl: '',
                imageUrl: '',
                category: '',
                status: 'active',
                featured: false,
                projectIntroduction: '',
                projectIncluded: [],
                softwareDetails: '',
                hardwareDetails: '',
                shippingDetails: ''
              })
              setImageFile(null)
              setImagePreview('')
            }}
            className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
          >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            placeholder="Describe your project..."
          />
        </div>

        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Additional Images (up to 3)
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 dark:border-slate-600 rounded-lg p-4">
            <div className="flex flex-wrap gap-4 mb-4">
              {additionalImagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAdditionalImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))}
            </div>
            {additionalImagePreviews.length < 3 && (
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="hidden"
                />
                <div className="text-center py-2 border border-dashed border-gray-300 dark:border-slate-600 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800">
                  <FiPlus className="text-2xl text-gray-400 dark:text-slate-500 mx-auto mb-1" />
                  <p className="text-gray-500 dark:text-slate-400 text-sm">Add more images</p>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Project Introduction */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Project Introduction
          </label>
          <textarea
            name="projectIntroduction"
            value={formData.projectIntroduction}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            placeholder="Enter detailed project introduction..."
          />
        </div>

        {/* Project Included */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Project Included (What's in the kit/package)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={includedInput}
              onChange={(e) => setIncludedInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIncluded())}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="Add item (press Enter)"
            />
            <button
              type="button"
              onClick={handleAddIncluded}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.projectIncluded.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm flex items-center gap-1"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemoveIncluded(item)}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Software Details */}
        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Software Details
          </label>
          <textarea
            name="softwareDetails"
            value={formData.softwareDetails}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            placeholder="Enter software requirements and details..."
          />
        </div>

        {/* Hardware Details */}
        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Hardware Details
          </label>
          <textarea
            name="hardwareDetails"
            value={formData.hardwareDetails}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            placeholder="Enter hardware specifications..."
          />
        </div>

        {/* Shipping Details */}
        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Shipping Details
          </label>
          <textarea
            name="shippingDetails"
            value={formData.shippingDetails}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            placeholder="Enter shipping information..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Technologies
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="Add technology (press Enter)"
            />
            <button
              type="button"
              onClick={handleAddTechnology}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm flex items-center gap-1"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTechnology(tech)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Demo URL
          </label>
          <input
            type="url"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Project Image
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-4 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <FiX size={16} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <FiUpload className="text-4xl text-gray-400 dark:text-slate-500 mx-auto mb-2" />
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Click to upload an image or drag and drop
                </p>
                <p className="text-gray-400 dark:text-slate-500 text-xs mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </label>
            )}
          </div>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white mt-2"
            placeholder="Or paste image URL here"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="rounded border-gray-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-800 dark:text-white">Featured Project</span>
          </label>

          <label className="flex items-center gap-2">
            <span className="text-sm text-slate-800 dark:text-white">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="px-3 py-1 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-2 border border-gray-300 dark:border-slate-600 text-slate-800 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )

  const renderProjectsList = () => (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      animate='show'
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Projects ({projects.length})</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={fadeIn('up', 0.1 * index)}
              initial='hidden'
              animate='show'
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={project.imageUrl || 'https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=Project'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-slate-800 dark:text-white text-xs font-bold rounded-full">
                    Featured
                  </span>
                )}
                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-full ${
                  project.status === 'active' ? 'bg-green-400 text-slate-800 dark:text-white' : 'bg-red-400 text-white'
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">{project.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                    <MdCategory />
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <FiCalendar />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-1"
                    >
                      <FiExternalLink /> Demo
                    </a>
                  )}
                </div>

                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 text-red-600 hover:text-red-700 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
          <MdDashboard className="text-6xl text-gray-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Projects Yet</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Start by adding your first project</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Project
          </button>
        </div>
      )}
    </motion.div>
  )

  if (loading && projects.length === 0) {
    return <div className="flex justify-center items-center h-64 text-slate-400">Loading projects...</div>
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial='hidden'
        animate='show'
        className="mb-8"
      >
        <h1 className="text-4xl font-bold font-boogaloo text-slate-800 dark:text-white mb-2">Project Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Add and manage your portfolio projects</p>
      </motion.div>

      {showForm && renderProjectForm()}
      {renderProjectsList()}
    </div>
  )
}

export default AddProjects
