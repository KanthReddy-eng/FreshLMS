import { useState } from 'react'
import { courseAPI } from '../services/api'
import { X, BookOpen, FileText, Clock, AlertCircle } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

const CreateCourseModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setApiError('')
    
    try {
      const response = await courseAPI.createCourse(formData)
      onSuccess(response.data)
    } catch (error) {
      setApiError(error.response?.data?.message || 'Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-dark">Create New Course</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* API Error */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{apiError}</p>
            </div>
          )}

          {/* Course Title */}
          <div>
            <label htmlFor="title" className="label">
              <BookOpen className="h-4 w-4 inline mr-2" />
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input ${errors.title ? 'border-red-500' : ''}`}
              placeholder="e.g., Introduction to React"
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          {/* Course Description */}
          <div>
            <label htmlFor="description" className="label">
              <FileText className="h-4 w-4 inline mr-2" />
              Course Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`input ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Provide a detailed description of what students will learn..."
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="label">
              <Clock className="h-4 w-4 inline mr-2" />
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={`input ${errors.duration ? 'border-red-500' : ''}`}
              placeholder="e.g., 6 weeks, 3 months"
            />
            {errors.duration && <p className="error-message">{errors.duration}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Creating...</span>
                </>
              ) : (
                <span>Create Course</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourseModal
