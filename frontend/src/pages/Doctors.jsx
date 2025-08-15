import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAppStore from "../store/useAppStore";

// Reusable empty state
const EmptyState = ({ title, subtitle, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center text-center col-span-full py-10">
    <p className="text-xl font-medium text-gray-600">{title}</p>
    {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    {actionLabel && (
      <button
        onClick={onAction}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

// Doctors Listing Component
const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { speciality } = useParams();
  const doctors = useAppStore((state) => state.doctors);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    if (Array.isArray(doctors)) applyFilter();
  }, [doctors, speciality]);

  // Empty state: no doctors in store at all
  if (!doctors || doctors.length === 0) {
    return (
      <div>
        <p className="text-gray-600">Browse through the doctors specialist.</p>
        <div className="mt-5">
          <EmptyState
            title="No doctors available"
            subtitle="Please check back later."
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all cursor-pointer sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
        >
          Filters
        </button>

        {/* Filters */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? "bg-[#E2E5FF] text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterDoc.length === 0 ? (
            <EmptyState
              title="No doctors match available"
              subtitle="Try a different speciality or browse all doctors."
              actionLabel="Browse all doctors"
              onAction={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
            />
          ) : (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 flex flex-col"
              >
                <div className="bg-[#EAEFFF] flex justify-center items-center p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-auto h-auto object-contain"
                  />
                </div>
                <div className="p-4">
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      item.available ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.available ? "bg-green-500" : "bg-gray-500"
                      }`}
                    />
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="text-[#262626] text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
