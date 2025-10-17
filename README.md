# FreshLMS - Learning Management System

A modern, clean, and responsive Learning Management System built with React, Vite, and TailwindCSS.

## 🎨 UI Features

### Authentication
- **Login Page**: Email/password authentication with "Remember me" option
- **Registration Page**: Complete sign-up with role selection (Student/Teacher)
- Client-side form validation with real-time error messages
- JWT token-based authentication

### Student Pages
- **Homepage**: Browse all available courses with enroll functionality
- **Dashboard**: View enrolled courses and learning progress
- Responsive course cards with enrollment status

### Teacher Pages
- **Homepage**: Create and manage courses
- **Dashboard**: View course enrollments and student lists
- Modal-based course creation form
- Expandable course sections showing enrolled students

## 🎯 Design Highlights

- **Color Scheme**: Fresh green (#4CAF50) primary color with dark gray and white
- **Modern UI**: Clean cards, smooth transitions, and hover effects
- **Responsive**: Mobile-first design that works on all screen sizes
- **Icons**: Lucide React icons for consistent visual language
- **Loading States**: Spinners and disabled states for better UX
- **Error Handling**: User-friendly error messages and validation

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🔌 Backend Integration

The frontend is configured to connect to a backend API at `http://localhost:5000/api`. Ensure your backend server is running with the following endpoints:

### Auth Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Course Endpoints
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course (Teacher only)
- `POST /api/courses/:id/enroll` - Enroll in course (Student only)
- `GET /api/courses/enrolled` - Get enrolled courses (Student only)
- `GET /api/courses/my-courses` - Get created courses (Teacher only)
- `GET /api/courses/:id/students` - Get course students (Teacher only)

## 📁 Project Structure

```
FreshLMS/
├── src/
│   ├── components/
│   │   ├── Layout.jsx              # Main layout with header/footer
│   │   ├── ProtectedRoute.jsx     # Route protection wrapper
│   │   ├── LoadingSpinner.jsx     # Loading indicator
│   │   ├── CourseCard.jsx         # Reusable course card
│   │   └── CreateCourseModal.jsx  # Course creation modal
│   ├── contexts/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── Register.jsx           # Registration page
│   │   ├── StudentHome.jsx        # Student homepage
│   │   ├── StudentDashboard.jsx   # Student dashboard
│   │   ├── TeacherHome.jsx        # Teacher homepage
│   │   └── TeacherDashboard.jsx   # Teacher dashboard
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Custom Styling

The project uses custom TailwindCSS utility classes defined in `src/index.css`:

- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button styles
- `.input` - Form input styles
- `.card` - Card container styles
- `.label` - Form label styles
- `.error-message` - Error message styles

## 🚀 Getting Started

1. Start your backend server (ensure it's running on port 5000)
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open `http://localhost:3000` in your browser
5. Register as a Student or Teacher to explore the platform

## 📱 Pages Overview

### For Students
- **Login/Register** → Access the platform
- **Homepage** → Browse and enroll in courses
- **Dashboard** → View enrolled courses and track progress

### For Teachers
- **Login/Register** → Access the platform
- **Homepage** → Create and manage courses
- **Dashboard** → View enrolled students per course

## 🔐 Authentication Flow

1. User registers with name, email, password, and role
2. User logs in with email and password
3. JWT token is stored in localStorage
4. Token is included in all API requests via Axios interceptor
5. Protected routes check authentication status
6. Users are redirected based on their role (student/teacher)

## 💡 Features

- ✅ Role-based access control
- ✅ Responsive design for mobile and desktop
- ✅ Form validation with error messages
- ✅ Loading states for async operations
- ✅ Success/error notifications
- ✅ Protected routes
- ✅ JWT authentication
- ✅ Clean and modern UI
- ✅ Smooth animations and transitions

## 📝 Notes

- The app uses Vite proxy to forward `/api` requests to the backend
- Update `vite.config.js` if your backend runs on a different port
- Customize colors in `tailwind.config.js` to match your branding

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React and TailwindCSS
