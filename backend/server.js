import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import doctorRouter from "./routes/doctor.route.js";

// Express App
const app = express();

// Database Connection
await connectDB();
// Cloudinary Connection
await connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Health Check
app.get("/", (req, res) => {
  res.send("API is working!");
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Port definition
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
