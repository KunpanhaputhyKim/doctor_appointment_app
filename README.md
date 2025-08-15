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

## How to Run

- Install dependencies (root): npm install
- Run in dev mode: npm run dev

Running on: http://localhost:4000

Deployed web service: https://doctor-appointment-app-5s9r.onrender.com/
