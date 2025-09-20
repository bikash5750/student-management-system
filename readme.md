# Student Management API

A Node.js/Express REST API for student management with authentication and validation.

## 🚀 Features

- Student registration and authentication
- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- CORS enabled
- Cookie-based sessions
- CRUD operations for students

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **cookie-parser** - Cookie parsing middleware

## 📦 Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd student-management-api
```

2. Install dependencies

npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
```

# Development
npm run dev

# Production
npm start
```

##  API Endpoints

### Authentication Routes

#### Register Student
- **POST** `/api/students/registerstudent`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "1234567890"
}
```

#### Login Student
- **POST** `/api/students/loginstudent`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Logout Student
- **POST** `/api/students/logoutstudent`
- **Headers:** `Authorization: Bearer <token>`

### Student Management Routes

#### Get All Students
- **GET** `/api/students/getallstudents`
- **Headers:** `Authorization: Bearer <token>`

#### Get Student by ID
- **GET** `/api/students/getstudentbyid`
- **Body:**
```json
{
  "phone": "1234567890"
}
```

#### Update Student
- **PUT** `/api/students/updatestudent`
- **Body:**
```json
{
  "phone": "1234567890",
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

#### Delete Student
- **DELETE** `/api/students/deletestudent`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
## Project Structure

student-management-api/
├── controllers/
│   └── student.controller.js
├── routes/
│   └── student.routes.js
├── validators/
│   └── student.validators.js
├── models/
│   └── student.model.js
├── middleware/
│   └── auth.middleware.js
├── .env
├── app.js
└── server.js


##  Authentication

This API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

##  Validation

The API includes comprehensive validation:

- **Email validation** - Proper email format required
- **Password validation** - Minimum requirements enforced
- **Schema validation** - Mongoose schema validation
- **Input sanitization** - Prevents malicious input

##  Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "student": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    }
  },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

##  Configuration

### CORS
CORS is configured to allow all origins:
```javascript
app.use(cors({
  origin: '*',
}));
```

### Cookies
Cookie parser is enabled for session management:
```javascript
app.use(cookieParser());
```

## 📁 Project Structure

```
student-management-api/
├── controllers/
│   └── student.controller.js
├── routes/
│   └── student.routes.js
├── validators/
│   └── student.validators.js
├── models/
│   └── student.model.js
├── middleware/
│   └── auth.middleware.js
├── .env
├── app.js
└── server.js
```

##  Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

##  Testing

Test the API using tools like:
- Postman


```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

