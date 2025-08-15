import { adminAssets } from "../../assets/adminAssets";
import useAdminStore from "../../store/useAdminStore";
import useDoctorStore from "../../store/useDoctorStore";
import { useNavigate } from "react-router-dom";

// Admin Navbar Component
const NavbarAdmin = () => {
  // Getting state from admin and doctor stores
  const aToken = useAdminStore((state) => state.aToken);
  const dToken = useDoctorStore((state) => state.dToken);
  const setAToken = useAdminStore((state) => state.setAToken);
  const setDToken = useDoctorStore((state) => state.setDToken);

  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    navigate("/admin/login");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  // Handle logo click
  const handleLogoClick = () => {
    if (aToken) {
      navigate("/admin/dashboard");
    } else if (dToken) {
      navigate("/doctor/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          onClick={handleLogoClick}
          className="w-36 sm:w-40 cursor-pointer"
          src={adminAssets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={() => logout()}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default NavbarAdmin;
