import { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Verify from "./pages/Verify";
import Footer from "./components/Footer";

import NavbarAdmin from "./components/admin/NavbarAdmin";
import SidebarAdmin from "./components/admin/SidebarAdmin";

import Dashboard from "./pages/Admin/admin/Dashboard";
import AllAppointments from "./pages/Admin/admin/AllAppointments";
import AddDoctor from "./pages/Admin/admin/AddDoctor";
import DoctorsList from "./pages/Admin/admin/DoctorsList";

import DoctorDashboard from "./pages/Admin/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Admin/doctor/DoctorAppointments";
import DoctorProfile from "./pages/Admin/doctor/DoctorProfile";
import { Toaster } from "react-hot-toast";

import useAppStore from "./store/useAppStore";
import useAdminStore from "./store/useAdminStore";
import useDoctorStore from "./store/useDoctorStore";

import LoginAdmin from "./pages/Admin/LoginAdmin";

// App Component
const App = () => {
  const location = useLocation();

  // Getting states from app store
  const getDoctorsData = useAppStore((state) => state.getDoctorsData);
  const token = useAppStore((state) => state.token);
  const loadUserProfileData = useAppStore((state) => state.loadUserProfileData);

  // Admin and Doctor Route Checks
  const isAdminRoute = /^\/admin(\/|$)/.test(location.pathname);
  const isDoctorRoute = /^\/doctor(\/|$)/.test(location.pathname);
  const isDashboard = isAdminRoute || isDoctorRoute;

  // Getting tokens from admin and doctor store
  const aToken = useAdminStore((state) => state.aToken);
  const dToken = useDoctorStore((state) => state.dToken);

  // Require Authentication
  const requireAuth = (token, component) => {
    return token ? component : <Navigate to="/admin-login" />;
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);

  return isDashboard ? (
    aToken || dToken ? (
      <div className="bg-[#F8F9FD] min-h-screen">
        <Toaster />
        <NavbarAdmin />
        <div className="flex">
          <SidebarAdmin />
          <div className="flex-1 p-4">
            <Routes>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={requireAuth(aToken, <Dashboard />)}
              />
              <Route
                path="/admin/all-appointments"
                element={requireAuth(aToken, <AllAppointments />)}
              />
              <Route
                path="/admin/add-doctor"
                element={requireAuth(aToken, <AddDoctor />)}
              />
              <Route
                path="/admin/doctor-list"
                element={requireAuth(aToken, <DoctorsList />)}
              />

              {/* Doctor Routes */}
              <Route
                path="/doctor/dashboard"
                element={requireAuth(dToken, <DoctorDashboard />)}
              />
              <Route
                path="/doctor/appointments"
                element={requireAuth(dToken, <DoctorAppointments />)}
              />
              <Route
                path="/doctor/profile"
                element={requireAuth(dToken, <DoctorProfile />)}
              />
            </Routes>
          </div>
        </div>
      </div>
    ) : (
      <>
        <Toaster />
        <LoginAdmin />
      </>
    )
  ) : (
    <div className="mx-4 sm:mx-[10%]">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
