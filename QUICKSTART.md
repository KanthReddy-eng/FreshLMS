# FreshLMS Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on port 5000 (or configure custom port)

## Installation Steps

### 1. Install Dependencies
```bash
cd FreshLMS
npm install
```

### 2. Environment Setup (Optional)
Create a `.env` file if you need to customize the API URL:
```bash
cp .env.example .env
```

Edit `.env` to match your backend URL:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## First Time Usage

### As a Student:
1. Go to `http://localhost:3000`
2. Click "Register here"
3. Fill in your details and select "Student" role
4. After registration, login with your credentials
5. Browse courses on the homepage
6. Click "Enroll Now" to enroll in courses
7. View your enrolled courses in the Dashboard

### As a Teacher:
1. Go to `http://localhost:3000`
2. Click "Register here"
3. Fill in your details and select "Teacher" role
4. After registration, login with your credentials
5. Click "Create New Course" on the homepage
6. Fill in course details and submit
7. View enrolled students in the Dashboard

## Project Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Troubleshooting

### Cannot connect to backend
- Ensure your backend is running on `http://localhost:5000`
- Check the browser console for CORS errors
- Verify the API_URL in vite.config.js proxy settings

### Port 3000 already in use
- The dev server will automatically try the next available port
- Or specify a custom port in vite.config.js

### Styles not loading
- Run `npm install` again
- Clear browser cache and restart dev server

## Production Build

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist/` directory.

## Need Help?

Check the main README.md for detailed documentation and API endpoints.

---

Happy Learning with FreshLMS! 🎓
