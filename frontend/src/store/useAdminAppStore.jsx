import { create } from "zustand";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Zustand store for admin app
const useAdminAppStore = create(() => ({
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  currency: import.meta.env.VITE_CURRENCY,

  // Converts '20_01_2000' to '20 Jan 2000'
  slotDateFormat: (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${months[+month]} ${year}`;
  },

  // Converts '2000-01-20' to age (e.g., 24)
  calculateAge: (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    return today.getFullYear() - birthDate.getFullYear();
  },
}));

export default useAdminAppStore;
