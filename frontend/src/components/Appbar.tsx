import { useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

 //avatar Name logic
  let username = localStorage.getItem("username") || "Guest";
  username = username.charAt(0).toUpperCase() + username.slice(1);

  //logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/signin");
  };

  return (
    <div className="border-b flex justify-between px-10 py-2 relative">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Tech_Blogs
      </Link>

      <div className="flex items-center relative">
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-1"
          >
            New
          </button>
        </Link>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <div
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            <Avatar size="big" name={username} />
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 transition-all ${
              dropdownOpen ? "block" : "hidden"
            }`}
          >
            <div className="px-4 py-2 text-gray-700 font-semibold border-b">
              {username}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
