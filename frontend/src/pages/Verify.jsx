import { useEffect } from "react";
import { api } from "../lib/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import toast from "react-hot-toast";

// Verify Component
const Verify = () => {
  // Params
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");

  // Getting backend URL and token from app store
  const backendUrl = useAppStore((state) => state.backendUrl);
  const token = useAppStore((state) => state.token);

  const navigate = useNavigate();

  // Verify Stripe Payment
  const verifyStripe = async () => {
    try {
      const { data } = await api.post(
        "/api/user/verifyStripe",
        { success, appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      navigate("/my-appointments");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if ((token, appointmentId, success)) {
      verifyStripe();
    }
  }, [token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
