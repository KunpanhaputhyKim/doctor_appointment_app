import express from "express";
import upload from "../middlewares/multer.js";
import {
  loginAdmin,
  addDoctor,
  appointmentsAdmin,
  appointmentCancel,
  allDoctors,
  adminDashboard,
} from "../controllers/admin.controller.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctor.controller.js";

// Admin router
const adminRouter = express.Router();

// Router endpoints
adminRouter.post("/login", loginAdmin);
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
