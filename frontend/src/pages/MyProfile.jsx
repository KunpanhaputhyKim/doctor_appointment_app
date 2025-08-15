import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import useAppStore from "../store/useAppStore";
import axios from "axios";
import toast from "react-hot-toast";

// My Profile Component
const MyProfile = () => {
  // State Management
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [editableData, setEditableData] = useState(null);

  // Getting states from app store
  const token = useAppStore((state) => state.token);
  const backendUrl = useAppStore((state) => state.backendUrl);
  const userData = useAppStore((state) => state.userData);
  const setUserData = useAppStore((state) => state.setUserData);
  const loadUserProfileData = useAppStore((state) => state.loadUserProfileData);

  useEffect(() => {
    if (
      userData &&
      (!userData.address ||
        typeof userData.address !== "object" ||
        userData.address.line1 === undefined ||
        userData.address.line2 === undefined)
    ) {
      setUserData((prev) => {
        if (
          prev.address &&
          typeof prev.address === "object" &&
          prev.address.line1 !== undefined &&
          prev.address.line2 !== undefined
        )
          return prev; // Already valid, no need to update
        return {
          ...prev,
          address: { line1: "", line2: "" },
        };
      });
    }
  }, []);

  // Handle Edit Click
  const handleEditClick = () => {
    setEditableData({
      ...userData,
      address: { ...userData.address },
    });
    setIsEdit(true);
  };

  // Function to update user profile data
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", editableData.name);
      formData.append("phone", editableData.phone);
      formData.append(
        "address",
        JSON.stringify(editableData.address || { line1: "", line2: "" })
      );
      formData.append("gender", editableData.gender);
      formData.append("dob", editableData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
        setEditableData(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : editableData.image}
              alt=""
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={image ? "" : assets.upload_icon}
              alt=""
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img className="w-36 rounded" src={userData.image} alt="" />
      )}

      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60"
          type="text"
          onChange={(e) =>
            setEditableData((prev) => ({ ...prev, name: e.target.value }))
          }
          value={editableData.name || ""}
        />
      ) : (
        <p className="font-medium text-3xl text-[#262626] mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-[#ADADAD] h-[1px] border-none" />
      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 max-w-52"
              type="text"
              onChange={(e) =>
                setEditableData((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={editableData.phone || ""}
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>

          {isEdit ? (
            <p>
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setEditableData((prev) => ({
                    ...prev,
                    address: { ...(prev.address || {}), line1: e.target.value },
                  }))
                }
                value={editableData.address?.line1 || ""}
              />
              <br />
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setEditableData((prev) => ({
                    ...prev,
                    address: { ...(prev.address || {}), line2: e.target.value },
                  }))
                }
                value={editableData.address?.line2 || ""}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address?.line1 || ""} <br />{" "}
              {userData.address?.line2 || ""}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p className="font-medium">Gender:</p>

          {isEdit ? (
            <select
              className="max-w-20 bg-gray-50"
              onChange={(e) =>
                setEditableData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={editableData.gender || ""}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>

          {isEdit ? (
            <input
              className="max-w-28 bg-gray-50"
              type="date"
              onChange={(e) =>
                setEditableData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={editableData.dob || ""}
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            Save information
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
