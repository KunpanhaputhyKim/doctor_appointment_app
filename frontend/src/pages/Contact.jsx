import { assets } from "../assets/assets";

// Contact Us Component
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          <span className="text-gray-700 font-semibold">CONTACT US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className=" font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className=" text-gray-500">
            123 Flinders Street <br /> Melbourne, VIC 3000
          </p>
          <p className=" text-gray-500">
            Tel: +61 451 659 594 <br /> Email: kimkunpanhaputhy@gmail.com
          </p>
          <p className=" font-semibold text-lg text-gray-600">
            CAREERS AT HEALPOINT
          </p>
          <p className=" text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border bg-primary text-white rounded-md hover:bg-primary/90 transition cursor-pointer text-white px-8 py-4 text-sm">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
