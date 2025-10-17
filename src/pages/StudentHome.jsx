import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import CourseCard from '../components/CourseCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { courseAPI } from '../services/api'
import { AlertCircle, BookOpen, CheckCircle } from 'lucide-react'

const StudentHome = () => {
  const [courses, setCourses] = useState([])
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [enrolling, setEnrolling] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [coursesRes, enrolledRes] = await Promise.all([
        courseAPI.getAllCourses(),
        courseAPI.getEnrolledCourses()
      ])
      
      setCourses(coursesRes.data)
      setEnrolledCourseIds(enrolledRes.data.map(c => c._id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (course) => {
    try {
      setEnrolling(course._id)
      setError('')
      setSuccessMessage('')
      
      await courseAPI.enrollInCourse(course._id)
      
      // Update enrolled courses list
      setEnrolledCourseIds(prev => [...prev, course._id])
      setSuccessMessage(`Successfully enrolled in "${course.title}"!`)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll in course')
    } finally {
      setEnrolling(null)
    }
  }

  const isEnrolled = (courseId) => enrolledCourseIds.includes(courseId)

  if (loading) {
    return (
      <Layout title="Available Courses">
        <LoadingSpinner size="lg" />
      </Layout>
    )
  }

  return (
    <Layout title="Available Courses">
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

      {/* Course Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
          <p className="text-gray-600">Check back later for new courses!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              action={handleEnroll}
              actionLabel={
                enrolling === course._id
                  ? 'Enrolling...'
                  : isEnrolled(course._id)
                  ? 'Already Enrolled'
                  : 'Enroll Now'
              }
              actionDisabled={isEnrolled(course._id) || enrolling === course._id}
            />
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">📚 Browse and Enroll</h3>
        <p className="text-blue-800 text-sm">
          Explore our course catalog and enroll in courses that interest you. 
          Once enrolled, you can access your courses from the Dashboard.
        </p>
      </div>
    </Layout>
  )
}

export default StudentHome
