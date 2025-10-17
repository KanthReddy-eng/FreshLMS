import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import CourseCard from '../components/CourseCard'
import LoadingSpinner from '../components/LoadingSpinner'
import CreateCourseModal from '../components/CreateCourseModal'
import { courseAPI } from '../services/api'
import { AlertCircle, Plus, BookOpen, CheckCircle } from 'lucide-react'

const TeacherHome = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchMyCourses()
  }, [])

  const fetchMyCourses = async () => {
    try {
      setLoading(true)
      const response = await courseAPI.getMyCourses()
      setCourses(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  const handleCourseCreated = (newCourse) => {
    setCourses(prev => [newCourse, ...prev])
    setShowModal(false)
    setSuccessMessage(`Course "${newCourse.title}" created successfully!`)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  if (loading) {
    return (
      <Layout title="My Courses">
        <LoadingSpinner size="lg" />
      </Layout>
    )
  }

  return (
    <Layout title="My Courses">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-800">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Create Course Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-12 card">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-4">Create your first course to start teaching</p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Your First Course</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course._id}
              course={{
                ...course,
                enrolledCount: course.students?.length || 0
              }}
            />
          ))}
        </div>
      )}

      {/* Create Course Modal */}
      {showModal && (
        <CreateCourseModal
          onClose={() => setShowModal(false)}
          onSuccess={handleCourseCreated}
        />
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">👨‍🏫 Teaching Dashboard</h3>
        <p className="text-blue-800 text-sm">
          Create and manage your courses. View enrolled students and track their progress from the Dashboard.
        </p>
      </div>
    </Layout>
  )
}

export default TeacherHome
