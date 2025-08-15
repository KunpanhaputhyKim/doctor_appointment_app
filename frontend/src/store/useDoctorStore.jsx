import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Zustand store for doctor
const useDoctorStore = create((set, get) => ({
  backendUrl,
  dToken: localStorage.getItem("dToken") || "",
  appointments: [],
  dashData: false,
  profileData: false,

  docId: "",
  setDocId: (docId) => set({ docId }),

  setDToken: (dToken) => {
    localStorage.setItem("dToken", dToken);
    set({ dToken });
  },

  setProfileData: (profileData) => set({ profileData }),

  getAppointments: async () => {
    const { dToken } = get();
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        set({ appointments: data.appointments.reverse() });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  },

  getProfileData: async () => {
    const { dToken } = get();
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { dToken },
      });
      if (data.success) {
        set({ profileData: data.profileData });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  },

  cancelAppointment: async (appointmentId) => {
    const { dToken, getAppointments, getDashData } = get();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getAppointments();
        await getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  },

  completeAppointment: async (appointmentId) => {
    const { dToken, getAppointments, getDashData } = get();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getAppointments();
        await getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  },

  getDashData: async () => {
    const { dToken } = get();
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { dToken },
      });
      if (data.success) {
        set({ dashData: data.dashData });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  },
}));

export default useDoctorStore;
