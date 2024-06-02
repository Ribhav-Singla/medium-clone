import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-3">
      <Link to={"/blogs"}>
        <div className="flex flex-col justify-center text-2xl cursor-pointer">
          Medium
        </div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-10"
            style={{ backgroundColor: "#16a34a" }}
          >
            Publish
          </button>
        </Link>
        <Avatar size={10} name="Ribhav" />
      </div>
    </div>
  );
};
