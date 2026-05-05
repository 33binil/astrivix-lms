import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../../../services/operations/categoryAPI';
import { FiPlusCircle } from 'react-icons/fi';

export default function CreateCategory() {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCategoryData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!categoryData.name.trim()) {
      return toast.error('Category name is required');
    }
    
    setLoading(true);
    
    try {
      const result = await createCategory({
        name: categoryData.name.trim(),
        description: categoryData.description.trim()
      });
      
      if (result?.success) {
        // Reset form on success
        setCategoryData({
          name: '',
          description: ''
        });
        
        // Show success message
        toast.success('Category created successfully!');
        
        // Optionally navigate away or refresh the categories list
        // navigate('/dashboard/categories');
      }
    } catch (error) {
      // Error is already handled in createCategory, just log it
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-richblack-900 dark:text-white mt-10 sm:mt-0">
      <h1 className="text-4xl font-medium text-richblack-900 font-boogaloo dark:text-richblack-5 mb-8">Create Category</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-richblack-900 dark:text-richblack-5 mb-1">
            Category Name <span className="text-pink-200">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className="form-style w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-richblack-900 dark:text-richblack-5 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            rows={4}
            className="form-style w-full resize-y"
          />
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/instructor")}
            className="flex items-center px-4 py-2 rounded-md bg-richblack-200 dark:bg-richblack-700 text-richblack-900 dark:text-richblack-50 hover:bg-richblack-300 dark:hover:bg-richblack-600 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-4 py-2 rounded-md bg-yellow-600 dark:bg-yellow-50 text-richblack-5 dark:text-richblack-900 font-medium hover:bg-yellow-500 dark:hover:bg-yellow-25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Category'}
            {!loading && <FiPlusCircle className="ml-2" />}
          </button>
        </div>
      </form>
    </div>
  );
}
