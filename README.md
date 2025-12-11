# TaskMaster

TaskMaster is a full-stack project and task management application built with a modern JavaScript stack. It includes secure authentication, project and task CRUD operations, and a clean SPA frontend built with React and TypeScript.

---

## Features

### User Authentication
- Email/password registration and login  
- JWT-based authentication with token persistence  
- Protected routes on both client and server  

### Project Management
- Create, edit, and delete projects  
- View all projects or open a single project's detail page  
- Update project name and description

### Task Management
- Add, edit, and delete tasks inside each project  
- Task statuses include: `todo`, `in-progress`, and `done`  
- Inline task editing and smooth UI updates without reloads  

### Authorization & Security
- Secure password hashing with bcrypt  
- Role-based access for admin-only endpoints  
- Middleware for token validation  

### Deployment
- Backend deployed on Render as a Web Service  
- Frontend deployed on Render as a Static Site  
- MongoDB Atlas used as the cloud database  
- Environment variables configured for secure communication

---

## Tech Stack

### Frontend
- React (Vite + TypeScript)
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB Atlas + Mongoose
- Passport.js (GitHub OAuth Strategy)
- JSON Web Tokens (JWT)
- bcrypt

### Hosting
- Render (frontend + backend)
- MongoDB Atlas

---

## Render Deployed Links:
- Frontend: https://front-end-final-project.onrender.com
- Backend: https://final-project-backend-fdvt.onrender.com
