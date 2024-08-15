import { AiOutlineLock, AiOutlineEyeInvisible , AiOutlineEye} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
export default function MyProfile() {
  const [activeSection, setActiveSection] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userData, setUserData] =useState({});
  const [passwordData , setPasswordData] = useState({});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const [id, setId] = useState("");

  useEffect(() => {
    (async () => {
      const userToken = await localStorage.getItem("erp_admin_token");
      const user = jwtDecode(userToken);
      setId(user.id);
      // console.log(id);
      let res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/userProfile/${id}`
      );
     
      setUserData(res.data.response);
    })();
  }, [id]);

  console.log(userData , "userdataaaaaaaaaaaaaaaaa")
  const handleChange =(e)=>{
    const {name , value }= e.target;
    setUserData({...userData , [name]:value})
  }

  const handleUpdateProfile = async()=>{
    try {
      const res = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/userProfile/${id}`, userData)
      console.log(res , "res")
      toast.success("Customer Update Successfully!");
    } catch (error) {
      toast.error("Error Updating Profile!");
    }
    
  }
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  
  console.log(passwordData, "ppppppppppppppppppppppdddddddddddddd")
  const handleUpdatePassword = async()=>{
    try {
      
      const res = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/changePassword/${id}`, passwordData);
      console.log(res)
      if(res){
        toast.success("Password Updated Successfully!");
      }
    } catch (error) {
      toast.error("Password Updated UnSuccessfully!");
      
    }
  }
 
  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
      <Toaster />
        <h1 className="py-2 font-semibold text-2xl text-zinc-900">
          My Profile
        </h1>
        <div className="p-4 bg-white shadow-md border rounded-md border-gray-300">
          <div className="flex gap-6 mb-6 border-b pb-3">
            <button
              className={`flex items-center gap-2 text-gray-700${
                activeSection === "account" ? "text-blue-600 border-b border-blue-400 pb-2" : "text-gray-600 pb-2"
              }`}
              onClick={() => setActiveSection("account")}
            >
              <span>
                <BsPerson />
              </span>
              Account
            </button>
            <button
              className={`flex items-center gap-2 ${
                activeSection === "security" ? "text-blue-600 border-b border-blue-400 pb-2" : "text-gray-600 pb-2"
              }`}
              onClick={() => setActiveSection("security")}
            >
              <span>
                <AiOutlineLock />
              </span>
              Security
            </button>
          </div>
          {activeSection === "account" && (
            <>
              <div className="border-b pb-3 mb-6">
                <h2 className="text-lg font-semibold text-zinc-800">
                  Profile Details
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Barry"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Tone"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Email
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                    />
              
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Mobile No.<span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="border-zinc-300 rounded-l-lg shadow-sm bg-zinc-100 p-2">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="78800*****"
                      name="mobileNumber"
                      value={userData.mobileNumber}
                      onChange={handleChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-r-lg shadow-sm w-full p-2"
                    />
                  </div>
                </div>
              </div>
                <div className="flex justify-end gap-4 mt-6">
            <button className="border border-zinc-300 text-zinc-700 rounded-lg px-4 py-2">
              Cancel
            </button>
            <button onClick={handleUpdateProfile} className="bg-blue-500 text-white rounded-lg px-4 py-2">
              Save
            </button>
          </div>
            </>
          )}
          {activeSection === "security" && (
            <>
              <div className="border-b pb-3 mb-6">
                <h2 className="text-lg font-semibold text-zinc-800">
                  Change Password
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current Password"
                      name="oldPassword"
                      onChange={handleUpdateChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <AiOutlineEyeInvisible />: <AiOutlineEye />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="New Password"
                      onChange={handleUpdateChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={toggleShowNewPassword}
                    >
                       {showNewPassword ? <AiOutlineEyeInvisible />: <AiOutlineEye />}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={handleUpdateChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={toggleShowConfirmPassword}
                    >
                       {showConfirmPassword ? <AiOutlineEyeInvisible />: <AiOutlineEye />}
                    </span>
                  </div>
                </div>
              </div>
          <div className="flex justify-end gap-4 mt-6">
            <button className="border border-zinc-300 text-zinc-700 rounded-lg px-4 py-2">
              Cancel
            </button>
            <button  onClick={handleUpdatePassword} className="bg-blue-500 text-white rounded-lg px-4 py-2">
              Save
            </button>
          </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
