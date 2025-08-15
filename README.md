# Doctor Appointment App (MERN)

A full-stack doctor appointment system built with **MongoDB, Express, React (Vite), Node.js**.  
Single-service deployment: the backend serves the built React app in production.

---

## Features

- **Auth & Roles**: Admin, Doctor, Patient (JWT; cookie/headers depending on your setup)
- **Doctors**: list, filter by specialty, availability, fees
- **Appointments**: book, cancel; view slots; prevent double booking
- **Admin**: manage doctors (add, toggle availability), view metrics
- **Payments**: Stripe integration (optional)
- **Uploads**: Cloudinary for media (optional)
- **Responsive UI**: React + Tailwind

---

## Tech Stack

- **Frontend**: React 18+/19, Vite, React Router, Zustand, Tailwind
- **Backend**: Node.js, Express, Mongoose, JWT, Multer, Cloudinary (SDK), Stripe
- **DB**: MongoDB Atlas
- **Deploy**: Render (one service; serves API + static frontend)

---

## Monorepo Structure
doctor_appointment_app/
├─ backend/
│ ├─ server.js
│ ├─ routes/ controllers/ models/ configs/
│ └─ .env # local only (gitignored)
├─ frontend/
│ ├─ src/
│ ├─ index.html
│ └─ vite.config.js # dev proxy /api -> 4000
└─ package.json # root scripts drive dev/build/start

## Local Development

# 1) install deps
npm install

# 2) run dev (concurrently: API + Vite)
npm run dev

# API is at http://localhost:4000
# Web is at http://localhost:5173 (proxied /api -> 4000)

## Local Production

npm run build          # installs backend+frontend, builds frontend
npm run start:local    # serves frontend/dist + API on http://localhost:4000

## Deploy

Build Command: npm run build
Start Command: npm start
URL: https://doctor-appointment-app-5s9r.onrender.com/
