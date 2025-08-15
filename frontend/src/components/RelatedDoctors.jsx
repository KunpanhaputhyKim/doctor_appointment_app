import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";

// Related Doctors Component
const RelatedDoctors = ({ speciality, docId }) => {
  // State Definition
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  // Getting state from app store
  const doctors = useAppStore((state) => state.doctors);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0">
        {relDoc.length > 0 ? (
          relDoc.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-[#EAEFFF]" src={item.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-10 col-span-full">
            <p className="text-xl font-medium text-gray-500">
              No related doctors currently available
            </p>
            <button
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="mt-2 flex items-center justify-center gap-2 px-6 py-2 border border-borderColor bg-primary text-white rounded-md hover:bg-primary/90 transition cursor-pointer"
            >
              Browse all doctors
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctors;
