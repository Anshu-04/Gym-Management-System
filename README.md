# 🏋️‍♂️ Gym Management System

A full-stack Gym Management System built with **MERN Stack** (MongoDB, Express, React, Node.js) using **ES Modules**. Supports three user roles with different access levels: **Admin**, **Member**, and **User**.

## 🚀 Features

- **Landing Page**: Intro screen to Register or Login
- **Role-Based Access**:
  - **Admin**:
    - Add/Delete gym members
    - Send notifications (reminder & announcement)
    - Assign bills to members
    - View bills in a table format
    - Logout members via Settings
  - **Member**:
    - View notifications and bills
    - Mark bills as paid
    - View weekly Diet Plan
    - Browse Supplement Store
    - Logout via Settings
  - **User**:
    - Login-only access to gym details
    - Logout option

## 🛠️ Built With

- **Frontend**: React + Vite, Tailwind CSS, React Router DOM
- **Backend**: Node.js (ES Modules), Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT stored in cookies
- **State Management**: React Hooks

## 📁 Folder Structure

gym-management-system/
├── client/ # React + Vite frontend /n
└── server/ # Node.js + Express backend

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory with:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

📦 Installation
Run frontend and backend separately

▶️ Start Backend
```bash
cd server
npm install
npm run dev
```
Runs at: http://localhost:5000

▶️ Start Frontend
```bash
cd client
npm install
npm run dev
```
Runs at: http://localhost:5173

## 👨‍💻 Author

Made with ❤️ by Anshu Patel
