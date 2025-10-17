import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogOut, BookOpen, LayoutDashboard, Home } from 'lucide-react'

const Layout = ({ children, title }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-dark">FreshLMS</h1>
            </div>
            
            {user && (
              <div className="flex items-center space-x-6">
                <nav className="flex space-x-4">
                  <button
                    onClick={() => navigate(`/${user.role}`)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => navigate(`/${user.role}/dashboard`)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                </nav>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-dark">{title}</h2>
          </div>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 FreshLMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
