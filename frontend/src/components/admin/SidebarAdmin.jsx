import { adminAssets } from "../../assets/adminAssets";
import { NavLink } from "react-router-dom";
import useAdminStore from "../../store/useAdminStore";
import useDoctorStore from "../../store/useDoctorStore";

const Sidebar = () => {
  // Getting states from doctor and admin store
  const dToken = useDoctorStore((state) => state.dToken);
  const aToken = useAdminStore((state) => state.aToken);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/admin/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={adminAssets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            to={"/admin/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img
              className="min-w-5"
              src={adminAssets.appointment_icon}
              alt=""
            />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            to={"/admin/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={adminAssets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            to={"/admin/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={adminAssets.people_icon} alt="" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/doctor/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={adminAssets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            to={"/doctor/appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img
              className="min-w-5"
              src={adminAssets.appointment_icon}
              alt=""
            />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            to={"/doctor/profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img className="min-w-5" src={adminAssets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
