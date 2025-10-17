const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters']
  },
  duration: {
    type: String,
    required: [true, 'Please provide course duration'],
    trim: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
courseSchema.index({ teacher: 1 });
courseSchema.index({ students: 1 });

module.exports = mongoose.model('Course', courseSchema);
