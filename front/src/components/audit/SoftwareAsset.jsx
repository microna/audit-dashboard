import { FaComputer } from "react-icons/fa6";

export const SoftwareAssets = ({
  componentDataSupported,
  componentDataUnsupportedSoon,
  componentDataUnsupported,
  componentDataUnknown,
  title,
}) => {
  return (
    <>
      <div className="w-full bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between ">
        <div className="text-left">
          <FaComputer size={40} />
          <h3 className="font-bold pb-3">OS</h3>
          <p className="text-xs text-gray-500 pb-3">Software updates</p>
          <h4 className="">{title}</h4>

          <p className="text-green-600 text-xs pb-3">
            {componentDataSupported} Supported
          </p>
          <p className=" text-yellow-300 text-xs pb-3">
            {" "}
            {componentDataUnsupportedSoon} Unsupported Soon
          </p>
          <p className="text-red-600 text-xs pb-3">
            {" "}
            {componentDataUnsupported} Unsupported
          </p>
          <p className="text-xs"> {componentDataUnknown} Unknown</p>
        </div>
      </div>
    </>
  );
};
