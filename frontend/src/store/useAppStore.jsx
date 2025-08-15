import { create } from "zustand";
import toast from "react-hot-toast";
import { api } from "../lib/api";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Zustand store for app
const useAppStore = create((set, get) => ({
  currency: "$",
  backendUrl,

  // State
  doctors: [],
  token: localStorage.getItem("token") || "",
  userData: false,

  // Actions
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setUserData: (userData) => set({ userData }),

  getDoctorsData: async () => {
    try {
      const { data } = await api.get("/api/doctor/list");
      if (data.success) {
        set({ doctors: data.doctors });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },

  loadUserProfileData: async () => {
    const { token } = get();
    try {
      const { data } = await api.get("/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        set({ userData: data.userData });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },
}));

export default useAppStore;
