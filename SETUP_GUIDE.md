# 🚀 FreshLMS Complete Setup Guide

## Overview
FreshLMS is now complete with both frontend (React) and backend (Node.js + MongoDB Atlas).

---

## 📍 WHERE TO ADD YOUR MONGODB ATLAS LINK

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Create `.env` File
```bash
# Copy the example file
cp .env.example .env
```

### Step 3: Add Your MongoDB Atlas Connection String

**Open `backend/.env` and add your MongoDB Atlas link:**

```env
# Replace this entire line with YOUR MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/freshlms?retryWrites=true&w=majority

# Keep these settings
PORT=5000
NODE_ENV=development
JWT_SECRET=my-super-secret-jwt-key-change-in-production-2024
JWT_EXPIRE=7d
```

**Example with real values:**
```env
MONGODB_URI=mongodb+srv://johndoe:MyP@ssw0rd123@cluster0.abc123.mongodb.net/freshlms?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=my-super-secret-jwt-key-2024
JWT_EXPIRE=7d
```

---

## 🔧 Complete Installation Steps

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create and configure `.env` file:**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your MongoDB Atlas URI (see above)

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ╔════════════════════════════════════════╗
   ║     FreshLMS Backend Server Running    ║
   ║                                        ║
   ║  Port: 5000                            ║
   ║  Environment: development              ║
   ║  MongoDB: Connected                    ║
   ╚════════════════════════════════════════╝
   ```

### Frontend Setup

1. **Open a NEW terminal and navigate to FreshLMS root:**
   ```bash
   cd FreshLMS
   ```

2. **Install dependencies (if not done already):**
   ```bash
   npm install
   ```

3. **Start the frontend server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

---

## 🎯 Getting Your MongoDB Atlas Connection String

### Option 1: From MongoDB Atlas Dashboard

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign in to your account
3. Select your cluster
4. Click **"Connect"** button
5. Choose **"Connect your application"**
6. Select **Driver: Node.js** and **Version: 5.5 or later**
7. Copy the connection string
8. Replace `<password>` with your actual database password
9. Replace `<dbname>` with `freshlms`

### Option 2: Create New MongoDB Atlas Database

If you don't have MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for free account
3. Create a **FREE cluster** (M0 Sandbox)
4. Create database user:
   - Username: `freshlms_user`
   - Password: `[generate or create strong password]`
5. Whitelist IP address:
   - Go to **Network Access**
   - Click **"Add IP Address"**
   - For development, add `0.0.0.0/0` (allows all IPs)
6. Get connection string (see Option 1 above)

---

## ✅ Verification Steps

### 1. Test Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "FreshLMS Backend is running",
  "timestamp": "2024-..."
}
```

### 2. Test Frontend
- Open browser: `http://localhost:3000`
- You should see the FreshLMS login page

### 3. Test Complete Flow

**Register a Teacher:**
1. Click "Register here"
2. Fill in details:
   - Name: John Teacher
   - Email: teacher@test.com
   - Password: password123
   - Role: Teacher
3. Click "Create Account"

**Register a Student:**
1. Logout and register again
2. Fill in details:
   - Name: Jane Student
   - Email: student@test.com
   - Password: password123
   - Role: Student

**Test Teacher Flow:**
1. Login as teacher
2. Create a new course
3. Go to Dashboard → view your courses

**Test Student Flow:**
1. Login as student
2. Browse available courses
3. Enroll in a course
4. Go to Dashboard → view enrolled courses

---

## 🗂️ Project Structure

```
FreshLMS/
├── backend/                    # Node.js/Express API
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Course.js          # Course schema
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   └── courses.js         # Course endpoints
│   ├── .env                   # 👈 ADD YOUR MONGODB URI HERE
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── src/                       # React Frontend
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   └── ...
├── package.json
└── vite.config.js
```

---

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed
**Error:** `MongoServerError: bad auth: Authentication failed`

**Solutions:**
- ✅ Check username and password in connection string
- ✅ Ensure password doesn't contain special characters (URL encode if needed)
- ✅ Verify database user exists in MongoDB Atlas

### Issue 2: IP Not Whitelisted
**Error:** `MongoServerError: connection refused`

**Solution:**
- Go to MongoDB Atlas → Network Access
- Add your IP address or use `0.0.0.0/0` for development

### Issue 3: Frontend Can't Connect to Backend
**Error:** `Network Error` or `Failed to fetch`

**Solutions:**
- ✅ Ensure backend is running on port 5000
- ✅ Check `vite.config.js` proxy settings
- ✅ Verify no firewall blocking localhost

### Issue 4: CSS Errors in Frontend
**Error:** `The 'border-border' class does not exist`

**Solution:** ✅ Already fixed in `src/index.css`

---

## 🔑 Default Ports

- **Backend API:** `http://localhost:5000`
- **Frontend App:** `http://localhost:3000`

---

## 📝 Environment Variables Summary

### Backend `.env` File
```env
MONGODB_URI=mongodb+srv://...     # Your MongoDB Atlas URI
PORT=5000                         # Backend server port
JWT_SECRET=your-secret-key        # JWT signing secret
JWT_EXPIRE=7d                     # Token expiration
NODE_ENV=development              # Environment mode
```

### Frontend (Optional `.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running Both Servers

**Option 1: Two Terminal Windows**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd FreshLMS
npm run dev
```

**Option 2: Using npm scripts (Advanced)**
You can create a root-level script to run both simultaneously using `concurrently` package.

---

## 📦 Production Deployment

### Backend Deployment
- Deploy to **Heroku**, **Railway**, **Render**, or **AWS**
- Set environment variables in hosting platform
- Use production MongoDB cluster

### Frontend Deployment
- Deploy to **Vercel**, **Netlify**, or **GitHub Pages**
- Update `VITE_API_URL` to production backend URL
- Run `npm run build` to create production bundle

---

## 🎓 Features Included

### ✅ Authentication
- User registration (Student/Teacher)
- Login with JWT tokens
- Role-based access control

### ✅ Student Features
- Browse all available courses
- Enroll in courses
- View enrolled courses dashboard

### ✅ Teacher Features
- Create new courses
- View created courses
- View enrolled students per course

### ✅ UI/UX
- Modern, responsive design
- FreshLMS branding (green theme)
- Loading states and error handling
- Form validation

---

## 📞 Need Help?

1. Check `backend/README.md` for API documentation
2. Check `README.md` for frontend details
3. Verify MongoDB Atlas connection string format
4. Ensure both servers are running

---

## ✨ You're All Set!

Once both servers are running and MongoDB is connected:
1. Open `http://localhost:3000`
2. Register as Student and Teacher
3. Test the complete flow
4. Enjoy FreshLMS! 🎉

---

**Happy Learning with FreshLMS!** 🚀📚
