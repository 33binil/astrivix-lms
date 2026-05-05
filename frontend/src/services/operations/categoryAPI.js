import { apiConnector } from '../apiConnector';
import { categoryEndpoints } from '../apis.jsx';
import { toast } from 'react-hot-toast';

const { CREATE_CATEGORY_API, GET_ALL_CATEGORIES_API } = categoryEndpoints;

export const createCategory = async (data) => {
  const toastId = toast.loading("Creating category...");
  try {
    // Verify user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please log in to perform this action');
    }

    // Verify user has admin or instructor role
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.accountType !== 'Admin' && user?.accountType !== 'Instructor') {
      throw new Error('Admin or Instructor privileges required to create categories');
    }

    const response = await apiConnector("POST", CREATE_CATEGORY_API, data);

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to create category');
    }

    toast.success("Category created successfully");
    return response.data;
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    
    // More specific error messages
    let errorMessage = 'Failed to create category';
    
    if (error.message.includes('log in')) {
      errorMessage = 'Please log in to perform this action';
    } else if (error.message.includes('Admin or Instructor privileges')) {
      errorMessage = 'You need admin or instructor privileges to create categories';
    } else if (error.response?.status === 401) {
      errorMessage = 'Session expired. Please log in again.';
    } else {
      errorMessage = error.response?.data?.message || error.message || errorMessage;
    }
    
    toast.error(errorMessage);
    
    // Rethrow the error so the calling component can handle it if needed
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const fetchAllCategories = async () => {
  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORIES_API);
    
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch categories');
    }
    
    // Return the categories array directly for easier consumption
    return response.data.categories || [];
  } catch (error) {
    console.error("FETCH CATEGORIES ERROR:", error);
    toast.error("Failed to fetch categories");
    throw error;
  }
};
