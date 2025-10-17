import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import { courseAPI } from '../services/api'
import { AlertCircle, BookOpen, Users, Mail, ChevronDown, ChevronRight } from 'lucide-react'

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([])
  const [expandedCourses, setExpandedCourses] = useState({})
  const [courseStudents, setCourseStudents] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState({})
  const [error, setError] = useState('')

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

  const toggleCourse = async (courseId) => {
    const isExpanded = expandedCourses[courseId]
    
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !isExpanded
    }))

    // Fetch students if not already loaded and expanding
    if (!isExpanded && !courseStudents[courseId]) {
      try {
        setLoadingStudents(prev => ({ ...prev, [courseId]: true }))
        const response = await courseAPI.getCourseStudents(courseId)
        setCourseStudents(prev => ({
          ...prev,
          [courseId]: response.data
        }))
      } catch (err) {
        console.error('Failed to load students:', err)
      } finally {
        setLoadingStudents(prev => ({ ...prev, [courseId]: false }))
      }
    }
  }

  const totalStudents = courses.reduce((sum, course) => sum + (course.students?.length || 0), 0)

  if (loading) {
    return (
      <Layout title="Teacher Dashboard">
        <LoadingSpinner size="lg" />
      </Layout>
    )
  }

  return (
    <Layout title="Teacher Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Courses</p>
              <p className="text-3xl font-bold">{courses.length}</p>
            </div>
            <BookOpen className="h-12 w-12 text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Students</p>
              <p className="text-3xl font-bold">{totalStudents}</p>
            </div>
            <Users className="h-12 w-12 text-white/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Avg Students/Course</p>
              <p className="text-3xl font-bold">
                {courses.length > 0 ? Math.round(totalStudents / courses.length) : 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-white/30 flex items-center justify-center">
              <span className="text-lg font-bold">📊</span>
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

      {/* Courses and Students */}
      <div>
        <h2 className="text-2xl font-bold text-dark mb-6">Course Enrollments</h2>
        
        {courses.length === 0 ? (
          <div className="text-center py-12 card">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-4">Create your first course to start teaching</p>
            <a href="/teacher" className="btn btn-primary inline-block">
              Go to My Courses
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course._id} className="card">
                {/* Course Header */}
                <button
                  onClick={() => toggleCourse(course._id)}
                  className="w-full flex items-center justify-between text-left hover:bg-gray-50 -m-6 p-6 rounded-lg transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-dark mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 px-4 py-2 rounded-lg">
                      <p className="text-xs text-gray-600">Enrolled Students</p>
                      <p className="text-2xl font-bold text-primary">{course.students?.length || 0}</p>
                    </div>
                    {expandedCourses[course._id] ? (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Students List */}
                {expandedCourses[course._id] && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    {loadingStudents[course._id] ? (
                      <LoadingSpinner size="sm" />
                    ) : courseStudents[course._id]?.length === 0 ? (
                      <p className="text-gray-600 text-center py-4">No students enrolled yet</p>
                    ) : (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 mb-3">Enrolled Students:</h4>
                        {courseStudents[course._id]?.map(student => (
                          <div
                            key={student._id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-primary font-semibold">
                                  {student.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{student.name}</p>
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                  <Mail className="h-3 w-3" />
                                  <span>{student.email}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Teaching Tips */}
      {courses.length > 0 && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">💡 Teaching Tips</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• Keep your course descriptions clear and engaging</li>
            <li>• Monitor student enrollment and engagement regularly</li>
            <li>• Update course content based on student feedback</li>
            <li>• Communicate with students to enhance their learning experience</li>
          </ul>
        </div>
      )}
    </Layout>
  )
}

export default TeacherDashboard
