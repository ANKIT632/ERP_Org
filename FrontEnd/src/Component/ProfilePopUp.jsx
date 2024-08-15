import { BsPerson } from "react-icons/bs";
import { RiBuildingLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { BsPower } from "react-icons/bs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfilePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    const logout = window.confirm(
      "Are you sure you want to LogOut?"
    );
    if (logout) {
      localStorage.removeItem("erp_admin_token");
      navigate("/");
    }
  };
  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <div className="flex flex-col  px-2 items-end ">
          <p className="text-md font-semibold">{"777888****"}</p>
          <p className="text-xs">{"Owner"}</p>
        </div>
        <BsPerson
          size={40}
          className=" text-black rounded-full bg-blue-200 p-2"
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0  mt-4 w-48 bg-white rounded-md shadow-2xl py-1
        transition-opacity duration-300 ease-in-out opacity-100"
        >
          <Link
            to="myProfile"
            className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <BsPerson size={20} className="text-blue-500" /> My Profile
          </Link>
          <Link
            to="myCompanies"
            className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2"
          >
            <RiBuildingLine size={20} className="text-blue-400" />
            My Companies
          </Link>
          <Link
            to="settings"
            className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-2"
          >
            <AiOutlineSetting size={20} className="text-blue-400" /> Settings
          </Link>
          <button
            className="flex px-4 py-2 gap-2 items-center text-gray-700 hover:bg-gray-100 text-sm"
            onClick={handleLogout}
          >
            <BsPower size={20} className="text-blue-500" />
            Log-Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
