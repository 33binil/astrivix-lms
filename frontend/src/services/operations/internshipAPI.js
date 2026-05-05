import { apiConnector } from "../apiConnector"

const INTERNSHIP_API = "/internship"

// Get all internships
export const getAllInternships = async () => {
  try {
    const response = await apiConnector("GET", `${INTERNSHIP_API}/getAllInternships`)
    
    if (response?.data?.success) {
      return response.data.internships
    }
    
    return []
  } catch (error) {
    console.error("Error fetching internships:", error)
    return []
  }
}

// Get internship by ID
export const getInternshipById = async (internshipId) => {
  try {
    const response = await apiConnector("GET", `${INTERNSHIP_API}/getInternship/${internshipId}`)
    
    if (response?.data?.success) {
      return response.data.internship
    }
    
    return null
  } catch (error) {
    console.error("Error fetching internship:", error)
    return null
  }
}

// Create new internship
export const createInternship = async (internshipData, token, imageFile = null) => {
  try {
    let response
    
    if (imageFile) {
      const formData = new FormData()
      Object.keys(internshipData).forEach(key => {
        if (key === 'requirements' || key === 'skills') {
          formData.append(key, JSON.stringify(internshipData[key]))
        } else {
          formData.append(key, internshipData[key])
        }
      })
      formData.append('image', imageFile)
      
      response = await apiConnector("POST", `${INTERNSHIP_API}/createInternship`, formData, {
        'Content-Type': 'multipart/form-data'
      })
    } else {
      response = await apiConnector("POST", `${INTERNSHIP_API}/createInternship`, internshipData)
    }
    
    if (response?.data?.success) {
      return response.data.internship
    }
    
    throw new Error(response?.data?.message || "Failed to create internship")
  } catch (error) {
    console.error("Error creating internship:", error)
    throw error
  }
}

// Update internship
export const updateInternship = async (internshipId, internshipData, token, imageFile = null) => {
  try {
    let response
    
    if (imageFile) {
      const formData = new FormData()
      Object.keys(internshipData).forEach(key => {
        if (key === 'requirements' || key === 'skills') {
          formData.append(key, JSON.stringify(internshipData[key]))
        } else {
          formData.append(key, internshipData[key])
        }
      })
      formData.append('image', imageFile)
      
      response = await apiConnector("PUT", `${INTERNSHIP_API}/updateInternship/${internshipId}`, formData, {
        'Content-Type': 'multipart/form-data'
      })
    } else {
      response = await apiConnector("PUT", `${INTERNSHIP_API}/updateInternship/${internshipId}`, internshipData)
    }
    
    if (response?.data?.success) {
      return response.data.internship
    }
    
    throw new Error(response?.data?.message || "Failed to update internship")
  } catch (error) {
    console.error("Error updating internship:", error)
    throw error
  }
}

// Delete internship
export const deleteInternship = async (internshipId, token) => {
  try {
    const response = await apiConnector("DELETE", `${INTERNSHIP_API}/deleteInternship/${internshipId}`)
    
    if (response?.data?.success) {
      return true
    }
    
    throw new Error(response?.data?.message || "Failed to delete internship")
  } catch (error) {
    console.error("Error deleting internship:", error)
    throw error
  }
}

// Submit internship application
export const submitInternshipApplication = async (applicationData) => {
  try {
    const response = await apiConnector("POST", `${INTERNSHIP_API}/apply`, applicationData)
    
    if (response?.data?.success) {
      return response.data
    }
    
    throw new Error(response?.data?.message || "Failed to submit application")
  } catch (error) {
    console.error("Error submitting application:", error)
    throw error
  }
}
