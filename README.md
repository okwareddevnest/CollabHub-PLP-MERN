---

# 🚀 CollabHub  
A full-stack collaborative platform built with the MERN stack, featuring:  
- ✅ Real-time chat with typing indicators, online presence, and notifications (Socket.io)  
- ✅ Real-time task board with live updates (Socket.io)  
- ✅ Modal-based authentication (Register/Login)  
- ✅ Toast notifications for user actions and events  
- ✅ Vite + React (JSX) frontend with Tailwind CSS  
- ✅ Express + MongoDB backend  
- ✅ Clean CI/CD support and deployable on Render (backend) and Vercel (frontend)  

---

## 📁 Project Structure
```
collabhub/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── socket/
│   ├── config/
│   ├── middleware/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── api.js
    │   ├── sockets.js
    │   ├── App.jsx
    │   └── main.jsx
```

---

## ✅ Backend Setup

### 1. Navigate to backend:
```bash
cd backend
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

### 4. Run backend locally:
```bash
npm run dev
```
> The backend will be live on `http://localhost:5000`.

---

## ✅ Frontend Setup

### 1. Navigate to frontend:
```bash
cd frontend
```

### 2. Install frontend dependencies:
```bash
npm install
```

### 3. Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_BASE_URL=http://localhost:5000
```

### 4. Run frontend locally:
```bash
npm run dev
```
> The frontend will run on `http://localhost:5173` (or next available port).

---

## ✅ Deployment

### 🚀 Backend on Render:
- Push to GitHub  
- Go to [Render](https://render.com) > New Web Service  
- Connect repo and select backend directory  
- Add environment variables (`MONGO_URI`, `JWT_SECRET`)  
- Start command: `npm start`  
- Save and deploy  

### 🚀 Frontend on Vercel:
- Push frontend to GitHub  
- Import into [Vercel](https://vercel.com)  
- Set environment variables:
```
VITE_API_BASE_URL=https://your-render-backend-url/api
VITE_SOCKET_BASE_URL=https://your-render-backend-url
```
- Deploy  

---

## ✅ GitHub Actions (Optional)
You can add workflows for backend and frontend CI in:
```
.github/workflows/backend.yml
.github/workflows/frontend.yml
```
> They will run builds and tests before deployment triggers.

---

## ✅ Features Summary
| Feature                   | Technology used        |
|----------------------------|-----------------------|
| Real-time chat             | Socket.io (namespace: `/chat`) |
| Real-time task board       | Socket.io (namespace: `/tasks`) |
| Authentication             | JWT-based, modal forms |
| Styling                    | Tailwind CSS          |
| Toast notifications        | React-Toastify        |
| Modal-based auth           | react-modal           |
| Deployment ready           | Render + Vercel       |

---
