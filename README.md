# 🧩 Collaborative Task Manager

A full-stack, production-ready **Collaborative Task Management Application** built using modern web technologies.  
The app supports **user authentication**, **task CRUD operations**, **real-time collaboration**, and **instant notifications** using Socket.io.

---

## 🎯 Objective

The goal of this project is to demonstrate strong **full-stack engineering skills**, including:

- Secure authentication & authorization
- Scalable backend architecture (MVC + service/repository)
- Real-time communication using WebSockets
- Clean frontend state management
- Type-safe development with TypeScript

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **React Query** (Server state & caching)
- **Socket.io Client**

### Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **Socket.io**
- **JWT Authentication**
- **Zod** (DTO validation)

### Deployment
- Frontend: **Render **
- Backend & DB: **Render **

---

## 🧱 Architecture Overview

Frontend (React)
│
├── Pages (Login, Signup, Dashboard, Profile)
├── Hooks (useDashboard, useNotifications)
├── API Layer (auth.ts, tasks.ts)
├── Socket Client
│
└── React Query Cache
│
▼
Backend (Node + Express)
│
├── Routes
├── Controllers
├── Services
├── Repositories
├── DTO Validators (Zod)
│
└── MongoDB (Mongoose)
│
▼
Real-Time Layer (Socket.io)


---

## 📊 Project Flow Chart

User Action
│
▼
Frontend (React UI)
│
├── REST API Call (React Query)
│
└── Socket.io Event
│
▼
Backend (Express)
│
├── Controller
├── Service (Business Logic)
├── Repository (DB Access)
│
▼
MongoDB
│
▼
Socket.io Broadcast
│
▼
Other Connected Clients (Live Updates)


---

## 🔐 Authentication & Authorization

- Secure **user registration & login**
- Passwords hashed using **bcrypt**
- **JWT-based authentication**
- JWT stored in **HttpOnly cookies**
- Protected routes (Dashboard, Profile)

---

## ✅ Core Features

### 🧑 User Management
- Register & Login
- View & update profile information

### 📝 Task Management (CRUD)
Each task includes:
- `title` (max 100 chars)
- `description`
- `dueDate`
- `priority` (Low, Medium, High, Urgent)
- `status` (To Do, In Progress, Review, Completed)
- `creatorId`
- `assignedToId`

Supported operations:
- Create task
- Update status & assignment
- Delete task
- View tasks (Created / Assigned / Overdue)

---

## ⚡ Real-Time Collaboration (Socket.io)

### Live Updates
- When any task is updated, **all connected users** instantly see changes
- No page refresh required

### Assignment Notifications
- When a task is assigned:
  - Notification is saved in the database
  - Assigned user receives **instant in-app notification**

---

## 📊 Dashboard Features

- Tasks created by current user
- Tasks assigned to current user
- Overdue tasks
- Filtering by:
  - Status
  - Priority
- Sorting by:
  - Due Date
- Real-time updates & notifications

---

## 🧪 Validation & Error Handling

- DTO validation using **Zod**
- Meaningful HTTP status codes:
  - `400` – Validation error
  - `401` – Unauthorized
  - `404` – Not found
- Graceful frontend error messages

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/collab-task-manager.git
cd collab-task-manager
