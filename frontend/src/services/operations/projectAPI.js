import { apiConnector } from "../apiConnector"

const PROJECTS_API = "/project"

// Get all projects
export const getAllProjects = async () => {
  try {
    const response = await apiConnector("GET", `${PROJECTS_API}/getAllProjects`)
    
    if (response?.data?.success) {
      return response.data.projects
    }
    
    return []
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

// Get project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await apiConnector("GET", `${PROJECTS_API}/getProject/${projectId}`)
    
    if (response?.data?.success) {
      return response.data.project
    }
    
    return null
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

// Create new project
export const createProject = async (projectData, token, imageFile = null, additionalImageFiles = []) => {
  try {
    let response
    
    if (imageFile || (additionalImageFiles && additionalImageFiles.length > 0)) {
      const formData = new FormData()
      Object.keys(projectData).forEach(key => {
        if (key === 'technologies' || key === 'projectIncluded') {
          formData.append(key, JSON.stringify(projectData[key]))
        } else if (key === 'additionalImages') {
          // Skip additionalImages in formData as we're sending them separately
        } else {
          formData.append(key, projectData[key])
        }
      })
      if (imageFile) {
        formData.append('image', imageFile)
      }
      // Append additional images
      if (additionalImageFiles && additionalImageFiles.length > 0) {
        additionalImageFiles.forEach((file, index) => {
          formData.append('additionalImages', file)
        })
      }
      
      response = await apiConnector("POST", `${PROJECTS_API}/createProject`, formData, {
        'Content-Type': 'multipart/form-data'
      })
    } else {
      response = await apiConnector("POST", `${PROJECTS_API}/createProject`, projectData)
    }
    
    if (response?.data?.success) {
      return response.data.project
    }
    
    throw new Error(response?.data?.message || "Failed to create project")
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

// Update project
export const updateProject = async (projectId, projectData, token, imageFile = null, additionalImageFiles = []) => {
  try {
    let response
    
    if (imageFile || (additionalImageFiles && additionalImageFiles.length > 0)) {
      const formData = new FormData()
      Object.keys(projectData).forEach(key => {
        if (key === 'technologies' || key === 'projectIncluded') {
          formData.append(key, JSON.stringify(projectData[key]))
        } else if (key === 'additionalImages') {
          // Skip additionalImages in formData as we're sending them separately
        } else {
          formData.append(key, projectData[key])
        }
      })
      if (imageFile) {
        formData.append('image', imageFile)
      }
      if (additionalImageFiles && additionalImageFiles.length > 0) {
        additionalImageFiles.forEach((file) => {
          formData.append('additionalImages', file)
        })
      }
      
      response = await apiConnector("PUT", `${PROJECTS_API}/updateProject/${projectId}`, formData, {
        'Content-Type': 'multipart/form-data'
      })
    } else {
      response = await apiConnector("PUT", `${PROJECTS_API}/updateProject/${projectId}`, projectData)
    }
    
    if (response?.data?.success) {
      return response.data.project
    }
    
    throw new Error(response?.data?.message || "Failed to update project")
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

// Delete project
export const deleteProject = async (projectId, token) => {
  try {
    const response = await apiConnector("DELETE", `${PROJECTS_API}/deleteProject/${projectId}`)
    
    if (response?.data?.success) {
      return true
    }
    
    throw new Error(response?.data?.message || "Failed to delete project")
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

// Submit project booking
export const submitProjectBooking = async (bookingData) => {
  try {
    const response = await apiConnector("POST", `${PROJECTS_API}/submitBooking`, bookingData)
    
    if (response?.data?.success) {
      return response.data
    }
    
    throw new Error(response?.data?.message || "Failed to submit booking")
  } catch (error) {
    console.error("Error submitting booking:", error)
    throw error
  }
}
