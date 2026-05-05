import React, { useState, useEffect } from "react"
import { motion } from 'framer-motion';
import { fadeIn } from "../../../../components/common/motionFrameVarients"
import { useSelector } from 'react-redux'
import { createInternship, updateInternship, deleteInternship, getAllInternships } from "../../../../services/operations/internshipAPI"
import { toast } from "react-hot-toast"

import { FiPlus, FiEdit, FiTrash2, FiExternalLink, FiCalendar, FiUpload, FiX, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi'
import { MdDashboard, MdCategory } from 'react-icons/md'

const AddInternship = () => {
  const { token } = useSelector((state) => state.auth)
  
  const [loading, setLoading] = useState(false)
  const [internships, setInternships] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingInternship, setEditingInternship] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    duration: '',
    type: '',
    stipend: '',
    requirements: [],
    skills: [],
    imageUrl: '',
    status: 'active',
    featured: false
  })

  const [skillInput, setSkillInput] = useState('')
  const [requirementInput, setRequirementInput] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [categories] = useState([
    'Full Stack Development',
    'Frontend Development', 
    'Backend Development',
    'Data Science',
    'Machine Learning',
    'Mobile Development',
    'UI/UX Design',
    'DevOps',
    'Other'
  ])

  useEffect(() => {
    fetchInternships()
  }, [])

  const fetchInternships = async () => {
    setLoading(true)
    try {
      const internshipsData = await getAllInternships()
      setInternships(internshipsData)
    } catch (error) {
      console.error("Error fetching internships:", error)
      toast.error("Failed to fetch internships")
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

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const handleAddRequirement = () => {
    if (requirementInput.trim() && !formData.requirements.includes(requirementInput.trim())) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()]
      }))
      setRequirementInput('')
    }
  }

  const handleRemoveRequirement = (req) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(r => r !== req)
    }))
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
      if (editingInternship) {
        await updateInternship(editingInternship._id, formData, token, imageFile)
        toast.success("Internship updated successfully!")
      } else {
        await createInternship(formData, token, imageFile)
        toast.success("Internship added successfully!")
      }

      setFormData({
        title: '',
        description: '',
        location: '',
        duration: '',
        type: '',
        stipend: '',
        requirements: [],
        skills: [],
        imageUrl: '',
        status: 'active',
        featured: false
      })
      setImageFile(null)
      setImagePreview('')
      setShowForm(false)
      setEditingInternship(null)
      fetchInternships()
    } catch (error) {
      console.error("Error saving internship:", error)
      toast.error("Failed to save internship")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (internship) => {
    setEditingInternship(internship)
    setFormData({
      title: internship.title,
      description: internship.description,
      location: internship.location,
      duration: internship.duration,
      type: internship.type,
      stipend: internship.stipend,
      requirements: internship.requirements,
      skills: internship.skills,
      imageUrl: internship.imageUrl,
      status: internship.status,
      featured: internship.featured
    })
    setImagePreview(internship.imageUrl || '')
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = async (internshipId) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await deleteInternship(internshipId, token)
        toast.success("Internship deleted successfully!")
        fetchInternships()
      } catch (error) {
        console.error("Error deleting internship:", error)
        toast.error("Failed to delete internship")
      }
    }
  }

  const renderInternshipForm = () => (
    <motion.div
      variants={fadeIn('up', 0.2)}
      initial='hidden'
      animate='show'
      className="bg-white dark:bg-[#0a1120] p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          {editingInternship ? 'Edit Internship' : 'Add New Internship'}
        </h3>
        <button
          onClick={() => {
            setShowForm(false)
            setEditingInternship(null)
            setFormData({
              title: '',
              description: '',
              location: '',
              duration: '',
              type: '',
              stipend: '',
              requirements: [],
              skills: [],
              imageUrl: '',
              status: 'active',
              featured: false
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
            <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
              Internship Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="Enter internship title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
              Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            >
              <option value="">Select type</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="Remote, Bangalore, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
              Duration *
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="3 months, 6 months"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
              Stipend *
            </label>
            <input
              type="text"
              name="stipend"
              value={formData.stipend}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="₹15,000/month"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
            placeholder="Describe the internship..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Requirements
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="Add requirement (press Enter)"
            />
            <button
              type="button"
              onClick={handleAddRequirement}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.requirements.map((req, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm flex items-center gap-1"
              >
                {req}
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(req)}
                  className="text-purple-600 hover:text-purple-800"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Skills
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
              placeholder="Add skill (press Enter)"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 dark:text-white mb-2">
            Internship Image
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
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
            <span className="text-sm text-slate-800 dark:text-white">Featured Internship</span>
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
            {loading ? 'Saving...' : (editingInternship ? 'Update Internship' : 'Add Internship')}
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

  const renderInternshipsList = () => (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      animate='show'
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Internships ({internships.length})</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Add Internship
        </button>
      </div>

      {internships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship, index) => (
            <motion.div
              key={internship._id}
              variants={fadeIn('up', 0.1 * index)}
              initial='hidden'
              animate='show'
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={internship.imageUrl || 'https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=Internship'}
                  alt={internship.title}
                  className="w-full h-full object-cover"
                />
                {internship.featured && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-slate-800 dark:text-white text-xs font-bold rounded-full">
                    Featured
                  </span>
                )}
                <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-full ${
                  internship.status === 'active' ? 'bg-green-400 text-slate-800 dark:text-white' : 'bg-red-400 text-white'
                }`}>
                  {internship.status}
                </span>
              </div>

              <div className="p-6">
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">{internship.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">{internship.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FiMapPin size={14} /> {internship.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={14} /> {internship.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {internship.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {internship.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                      +{internship.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <FiDollarSign /> {internship.stipend}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdCategory />
                    {internship.type}
                  </span>
                </div>

                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(internship)}
                    className="flex-1 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(internship._id)}
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
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Internships Yet</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Start by adding your first internship</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Internship
          </button>
        </div>
      )}
    </motion.div>
  )

  if (loading && internships.length === 0) {
    return <div className="flex justify-center items-center h-64 text-slate-400">Loading internships...</div>
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-[#000814] min-h-screen transition-colors duration-500">
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial='hidden'
        animate='show'
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-800 font-boogaloo dark:text-white mb-2">Internship Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Add and manage internship opportunities</p>
      </motion.div>

      {showForm && renderInternshipForm()}
      {renderInternshipsList()}
    </div>
  )
}

export default AddInternship
