Task Management Application
A modern task management application built with Next.js, TypeScript, and PostgreSQL.

Features
Create, read, update, and delete tasks
Task status management (pending, in-progress, completed)
Due date tracking
Responsive design
Modern UI with Tailwind CSS
Tech Stack
Frontend:
Next.js 14
TypeScript
Tailwind CSS
React Hooks
Backend:
Next.js API Routes
Prisma ORM
PostgreSQL
Prerequisites
Node.js 18+ and npm
PostgreSQL database
Setup Instructions
Clone the repository:
git clone <repository-url>
cd task-management-app
Install dependencies:
npm install
Create a .env file in the root directory with the following content:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/task_management_db?schema=public"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
Set up the database:
# Create the database
createdb task_management_db

# Run migrations
npx prisma migrate dev
Start the development server:
npm run dev
The application will be available at http://localhost:3000.

Database Schema
Task Table
id: Integer (Primary Key, Auto-increment)
title: String (Required)
description: String (Optional)
status: String (Default: "pending")
dueDate: DateTime (Optional)
createdAt: DateTime (Default: now())
updatedAt: DateTime (Auto-updated)
API Endpoints
GET /api/tasks - Get all tasks
POST /api/tasks - Create a new task
GET /api/tasks/:id - Get a specific task
PUT /api/tasks/:id - Update a task
DELETE /api/tasks/:id - Delete a task
Testing
To run the tests:

npm test
Deployment
This application can be deployed to any platform that supports Next.js applications (Vercel, Netlify, etc.).

Set up your deployment platform
Configure environment variables
Deploy the application
Contributing
Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request# ORITSO
