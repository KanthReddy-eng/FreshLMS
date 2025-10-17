import axios from 'axios'
import { ENV } from '../config/env'

const API_BASE_URL = ENV.API_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
}

// Course APIs
export const courseAPI = {
  getAllCourses: () => api.get('/courses'),
  createCourse: (data) => api.post('/courses', data),
  enrollInCourse: (courseId) => api.post(`/courses/${courseId}/enroll`),
  getEnrolledCourses: () => api.get('/courses/enrolled'),
  getMyCourses: () => api.get('/courses/my-courses'),
  getCourseStudents: (courseId) => api.get(`/courses/${courseId}/students`)
}

export default api
