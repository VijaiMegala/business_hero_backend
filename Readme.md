# Task Management API

A RESTful API built with Express.js, TypeScript, and PostgreSQL for managing tasks with user authentication.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL (hosted on Render)
- Sequelize ORM
- JWT for authentication

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory and add the following:
```
JWT_SECRET=your_jwt_secret
```

Note: Database configuration is not required as it's already hosted on Render.

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### User Management

#### Create User
- **POST** `/user`
- **Body:**
```json
{
    "username": "username",
    "password": "password",
    "email": "email@example.com"
}
```

#### Login
- **GET** `/login`
- **Body:**
```json
{
    "username": "username",
    "password": "password",
    "email": "email@example.com"
}
```
- **Response:**
```json
{
    "id": 1,
    "email": "email@example.com",
    "accessToken": "JWT_TOKEN"
}
```

### Task Management
All task endpoints require Bearer token authentication.

#### Get All Tasks
- **GET** `/task`
- **Headers:** `Authorization: Bearer <token>`

#### Create Task
- **POST** `/task`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
}
```

#### Update Task
- **PUT** `/task`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "completed",
    "taskId": 1
}
```

#### Delete Task
- **DELETE** `/task`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
    "taskId": 1
}
```

## Available Scripts

- `npm run build` - Builds the application
- `npm start` - Starts the production server
- `npm run dev` - Starts the development server
- `npm test` - Runs tests (not implemented yet)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After logging in, include the received access token in the Authorization header for protected routes:
```
Authorization: Bearer <your_access_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error