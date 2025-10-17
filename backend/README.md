# FreshLMS Backend API

Node.js/Express backend for FreshLMS with MongoDB Atlas integration.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure MongoDB Atlas

1. **Copy the environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your MongoDB Atlas connection string to `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/freshlms?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

3. **Get your MongoDB Atlas URI:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and cluster URL

4. **Whitelist your IP:**
   - In MongoDB Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Add your current IP or use `0.0.0.0/0` for all IPs (development only)

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   └── auth.js               # JWT authentication & authorization
├── models/
│   ├── User.js               # User schema
│   └── Course.js             # Course schema
├── routes/
│   ├── auth.js               # Authentication routes
│   └── courses.js            # Course management routes
├── .env.example              # Environment variables template
├── server.js                 # Main application file
└── package.json
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // or "teacher"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Course Routes (`/api/courses`)

All course routes require authentication. Include JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get All Courses
```http
GET /api/courses
```

#### Create Course (Teacher Only)
```http
POST /api/courses
Content-Type: application/json

{
  "title": "Introduction to React",
  "description": "Learn React from scratch",
  "duration": "6 weeks"
}
```

#### Enroll in Course (Student Only)
```http
POST /api/courses/:courseId/enroll
```

#### Get Enrolled Courses (Student Only)
```http
GET /api/courses/enrolled
```

#### Get My Courses (Teacher Only)
```http
GET /api/courses/my-courses
```

#### Get Course Students (Teacher Only)
```http
GET /api/courses/:courseId/students
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register or login** to receive a token
2. **Include the token** in the Authorization header for protected routes:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. **Token expires** after 7 days (configurable in `.env`)

## 👥 User Roles

### Student
- Browse all courses
- Enroll in courses
- View enrolled courses

### Teacher
- Create courses
- View created courses
- View enrolled students per course

## 🗄️ Database Models

### User Model
- `name`: String (required, min 2 chars)
- `email`: String (required, unique, validated)
- `password`: String (required, min 6 chars, hashed)
- `role`: String (student/teacher)
- `enrolledCourses`: Array of Course IDs
- `createdAt`: Date

### Course Model
- `title`: String (required, min 3 chars)
- `description`: String (required, min 10 chars)
- `duration`: String (required)
- `teacher`: User ID (required)
- `students`: Array of User IDs
- `createdAt`: Date

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | Required |
| `PORT` | Server port | 5000 |
| `JWT_SECRET` | Secret key for JWT | Required |
| `JWT_EXPIRE` | Token expiration time | 7d |
| `NODE_ENV` | Environment mode | development |

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Uses `nodemon` for automatic restart on file changes.

### Test the API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Register a Student:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Student One",
    "email": "student@test.com",
    "password": "password123",
    "role": "student"
  }'
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check your MongoDB URI in `.env`
- Verify your IP is whitelisted in MongoDB Atlas
- Ensure your database user has correct permissions

### Authentication Errors
- Make sure JWT_SECRET is set in `.env`
- Check if token is included in Authorization header
- Verify token hasn't expired

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Enable CORS
- **dotenv**: Environment variables
- **express-validator**: Request validation

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based authorization
- ✅ Input validation
- ✅ Protected routes
- ✅ CORS enabled

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

**Need help?** Check the main project README or create an issue.
