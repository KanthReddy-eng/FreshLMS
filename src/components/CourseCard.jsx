import { Clock, Users } from 'lucide-react'

const CourseCard = ({ course, action, actionLabel, actionDisabled = false }) => {
  return (
    <div className="card">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-dark mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {course.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            )}
            {course.enrolledCount !== undefined && (
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{course.enrolledCount} enrolled</span>
              </div>
            )}
          </div>
        </div>
        
        {action && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => action(course)}
              disabled={actionDisabled}
              className={`w-full btn ${actionDisabled ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-primary'}`}
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCard
