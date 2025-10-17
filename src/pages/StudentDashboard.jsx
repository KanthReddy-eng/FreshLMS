import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import CourseCard from '../components/CourseCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { courseAPI } from '../services/api'
import { AlertCircle, BookOpen, GraduationCap } from 'lucide-react'

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEnrolledCourses()
  }, [])

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true)
      const response = await courseAPI.getEnrolledCourses()
      setEnrolledCourses(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load enrolled courses')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout title="My Dashboard">
        <LoadingSpinner size="lg" />
      </Layout>
    )
  }

  return (
    <Layout title="My Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Courses</p>
              <p className="text-3xl font-bold">{enrolledCourses.length}</p>
            </div>
            <BookOpen className="h-12 w-12 text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Active Learning</p>
              <p className="text-3xl font-bold">{enrolledCourses.length}</p>
            </div>
            <GraduationCap className="h-12 w-12 text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Progress</p>
              <p className="text-3xl font-bold">
                {enrolledCourses.length > 0 ? '100%' : '0%'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-white/30 flex items-center justify-center">
              <span className="text-lg font-bold">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-2xl font-bold text-dark mb-6">My Enrolled Courses</h2>
        
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12 card">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses yet</h3>
            <p className="text-gray-600 mb-4">Start learning by enrolling in courses from the home page</p>
            <a href="/student" className="btn btn-primary inline-block">
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => (
              <CourseCard
                key={course._id}
                course={course}
                actionLabel="Continue Learning"
                action={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      {/* Learning Tips */}
      {enrolledCourses.length > 0 && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">🎯 Learning Tips</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• Set aside dedicated time each day for learning</li>
            <li>• Take notes and review them regularly</li>
            <li>• Practice what you learn through exercises</li>
            <li>• Don't hesitate to reach out to teachers for help</li>
          </ul>
        </div>
      )}
    </Layout>
  )
}

export default StudentDashboard
