const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all courses
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'name email')
      .select('-students')
      .sort('-createdAt');

    res.status(200).json(courses);
  } catch (error) {
    console.error('Get Courses Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
});

// @route   POST /api/courses
// @desc    Create a new course (Teacher only)
// @access  Private (Teacher)
router.post('/', [
  protect,
  authorize('teacher'),
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('duration').trim().notEmpty().withMessage('Duration is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      });
    }

    const { title, description, duration } = req.body;

    const course = await Course.create({
      title,
      description,
      duration,
      teacher: req.user._id
    });

    await course.populate('teacher', 'name email');

    res.status(201).json(course);
  } catch (error) {
    console.error('Create Course Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create course'
    });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course (Student only)
// @access  Private (Student)
router.post('/:id/enroll', protect, authorize('student'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    if (course.students.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Add student to course
    course.students.push(req.user._id);
    await course.save();

    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enrolledCourses: course._id }
    });

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in course',
      course
    });
  } catch (error) {
    console.error('Enroll Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to enroll in course'
    });
  }
});

// @route   GET /api/courses/enrolled
// @desc    Get enrolled courses (Student only)
// @access  Private (Student)
router.get('/enrolled', protect, authorize('student'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'enrolledCourses',
      populate: { path: 'teacher', select: 'name email' }
    });

    res.status(200).json(user.enrolledCourses || []);
  } catch (error) {
    console.error('Get Enrolled Courses Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrolled courses'
    });
  }
});

// @route   GET /api/courses/my-courses
// @desc    Get teacher's courses (Teacher only)
// @access  Private (Teacher)
router.get('/my-courses', protect, authorize('teacher'), async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id })
      .populate('teacher', 'name email')
      .populate('students', 'name email')
      .sort('-createdAt');

    res.status(200).json(courses);
  } catch (error) {
    console.error('Get My Courses Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your courses'
    });
  }
});

// @route   GET /api/courses/:id/students
// @desc    Get students enrolled in a course (Teacher only)
// @access  Private (Teacher)
router.get('/:id/students', protect, authorize('teacher'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('students', 'name email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if the teacher owns this course
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view students of this course'
      });
    }

    res.status(200).json(course.students);
  } catch (error) {
    console.error('Get Course Students Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course students'
    });
  }
});

module.exports = router;
