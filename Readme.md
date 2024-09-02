#Task Management API
This is a RESTful API for managing tasks. It supports user authentication and CRUD operations for tasks. Built with Express.js, Mongoose, and JWT for authentication.

Table of Contents
Installation
API Endpoints
User Endpoints
Task Endpoints
Authentication
Example Usage
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/task-management-api.git
Navigate to the project directory:

bash
Copy code
cd task-management-api
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory with the following content:

env
Copy code
MONGO_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_jwt_secret
Start the server:

bash
Copy code
npm start
API Endpoints
User Endpoints
1. Signup
POST /api/auth/signup
Description: Create a new user account.
Request Body:
json
Copy code
{
  "username": "exampleUser",
  "password": "examplePassword"
}
Response:
json
Copy code
{
  "message": "User created"
}
2. Login
POST /api/auth/login
Description: Authenticate a user and return a JWT token.
Request Body:
json
Copy code
{
  "username": "exampleUser",
  "password": "examplePassword"
}
Response:
json
Copy code
{
  "token": "your_jwt_token"
}
Error Response:
json
Copy code
{
  "error": "Invalid credentials"
}
Task Endpoints
3. Create Task
POST /api/tasks
Description: Create a new task.
Request Body:
json
Copy code
{
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "category": "Task category"
}
Response:
json
Copy code
{
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "category": "Task category",
  "user": "user_id"
}
4. Get All Tasks
GET /api/tasks
Description: Retrieve all tasks for the authenticated user.
Response:
json
Copy code
[
  {
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "category": "Task category",
    "user": "user_id"
  },
  ...
]
5. Update Task
PUT /api/tasks/:id
Description: Update a specific task by ID.
Request Body:
json
Copy code
{
  "title": "Updated task title",
  "description": "Updated task description",
  "completed": true,
  "category": "Updated task category"
}
Response:
json
Copy code
{
  "title": "Updated task title",
  "description": "Updated task description",
  "completed": true,
  "category": "Updated task category",
  "user": "user_id"
}
6. Delete Task
DELETE /api/tasks/:id
Description: Delete a specific task by ID.
Response:
json
Copy code
{
  "message": "Task deleted"
}
Authentication
All task endpoints require authentication. Include the JWT token in the Authorization header of your requests:

makefile
Copy code
Authorization: Bearer your_jwt_token
Example Usage
Signup: POST to http://localhost:5000/api/auth/signup with the body { "username": "alice", "password": "password123" }
Login: POST to http://localhost:5000/api/auth/login with the body { "username": "alice", "password": "password123" }
Create Task: POST to http://localhost:5000/api/tasks with the body { "title": "New Task", "description": "Task details", "completed": false, "category": "Work" } and include the JWT token in the Authorization header.
Get All Tasks: GET to http://localhost:5000/api/tasks with the JWT token in the Authorization header.
Update Task: PUT to http://localhost:5000/api/tasks/:id with the body { "title": "Updated Task", "description": "Updated details", "completed": true, "category": "Personal" } and include the JWT token in the Authorization header.
Delete Task: DELETE to http://localhost:5000/api/tasks/:id with the JWT token in the Authorization header.