import { useState, useEffect } from "react";
import useDoctorStore from "../../../store/useDoctorStore";
import useAdminAppStore from "../../../store/useAdminAppStore";
import axios from "axios";
import toast from "react-hot-toast";

// Doctor Profile Component
const DoctorProfile = () => {
  // State Definition
  const [isEdit, setIsEdit] = useState(false);
  const [editableData, setEditableData] = useState(null);

  // Getting states from doctor and admin app store
  const dToken = useDoctorStore((state) => state.dToken);
  const profileData = useDoctorStore((state) => state.profileData);
  const setProfileData = useDoctorStore((state) => state.setProfileData);
  const getProfileData = useDoctorStore((state) => state.getProfileData);
  const currency = useAdminAppStore((state) => state.currency);
  const backendUrl = useAdminAppStore((state) => state.backendUrl);

  // Profile Update Function
  const updateProfile = async () => {
    try {
      const updateData = {
        docId: editableData._id,
        address: editableData.address,
        fees: editableData.fees,
        about: editableData.about,
        available: editableData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken: dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }

      setIsEdit(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Handle Edit Click
  const handleEditClick = () => {
    setEditableData({
      ...profileData,
      address: { ...(profileData.address || { line1: "", line2: "" }) },
    });
    setIsEdit(true);
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (
      profileData &&
      (!profileData.address || typeof profileData.address !== "object")
    ) {
      setProfileData((prev) => ({
        ...prev,
        address: { line1: "", line2: "" },
      }));
    }
  }, [profileData, setProfileData]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* ----- Doc Info : name, degree, experience ----- */}

            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* ----- Doc About ----- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
                About :
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {isEdit ? (
                  <textarea
                    onChange={(e) =>
                      setEditableData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                    type="text"
                    className="w-full outline-primary p-2"
                    rows={8}
                    value={editableData.about || ""}
                  />
                ) : (
                  profileData.about
                )}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setEditableData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={editableData.fees || ""}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setEditableData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={editableData.address?.line1 || ""}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setEditableData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={editableData.address?.line2 || ""}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                onChange={() =>
                  isEdit &&
                  setEditableData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={
                  isEdit ? editableData.available : profileData.available
                }
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
