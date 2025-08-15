import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Zustand store for admin
const useAdminStore = create((set, get) => ({
  backendUrl,
  aToken: localStorage.getItem("aToken") || "",
  doctors: [],
  appointments: [],
  dashData: false,

  setAToken: (aToken) => {
    localStorage.setItem("aToken", aToken);
    set({ aToken });
  },

  getAllDoctors: async () => {
    const { aToken } = get();
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: { aToken },
      });
      if (data.success) {
        set({ doctors: data.doctors });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  },

  changeAvailability: async (docId) => {
    const { aToken, getAllDoctors } = get();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId },
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  },

  getAllAppointments: async () => {
    const { aToken } = get();
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { aToken },
      });
      if (data.success) {
        set({ appointments: data.appointments.reverse() });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  },

  cancelAppointment: async (appointmentId) => {
    const { aToken, getAllAppointments } = get();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  },

  getDashData: async () => {
    const { aToken } = get();
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { aToken },
      });
      if (data.success) {
        set({ dashData: data.dashData });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  },
}));

export default useAdminStore;
