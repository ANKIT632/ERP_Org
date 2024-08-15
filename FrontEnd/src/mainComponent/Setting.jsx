import { RiBuildingLine } from "react-icons/ri";
import React, { useState , useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

export default function Setting() {
  const navigate = useNavigate()
  const [companyId , setCompanyId] = useState("")

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/company`)
      .then((res) => {
        console.log(res.data.response[res.data.response.length - 1]?._id, "gfasdddddddddddddddddddddddd");
        setCompanyId(res.data.response[res.data.response.length - 1]?._id);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  
  return (
    <>
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border px-6 py-8 rounded-md border-gray-300 ">
        <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          
          <div onClick={()=>{
            navigate(`/erp/editCompanies/${companyId}`)
          }} className="cursor-pointer">
            <h2 className="font-semibold text-blue-500">Companies</h2>
            <p className="text-sm text-zinc-600 ">
              View and update your company details
            </p>
          </div>
        
        </div>
        <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          <Link to="/erp/statutory-info">
          <div>
            <h2 className="font-semibold text-blue-500">
              Statutory Information
            </h2>
            <p className="text-sm text-zinc-600 ">
              View and update your company statutory details
            </p>
          </div>
          </Link>
          
        </div>
        <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          <div>
            <h2 className="font-semibold text-blue-500">Users & Permissions</h2>
            <p className="text-sm text-zinc-600 ">
              View and update your user permission details
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          <div>
            <h2 className="font-semibold text-blue-500">Notifications</h2>
            <p className="text-sm text-zinc-600 ">
              View all your notifications from here
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          <div>
            <h2 className="font-semibold text-blue-500">Billing & Plans</h2>
            <p className="text-sm text-zinc-600 ">
              Manage billing, plans, and credit usage, and make payments
              directly.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          <div>
            <h2 className="font-semibold text-blue-500">General Settings</h2>
            <p className="text-sm text-zinc-600 ">
              View and update your inventory and transfer data from this option
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          <div>
            <h2 className="font-semibold text-blue-500">Email Preferences</h2>
            <p className="text-sm text-zinc-600 ">
              Define settings for email conversations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          <div>
            <h2 className="font-semibold text-blue-500">
              Series Configuration
            </h2>
            <p className="text-sm text-zinc-600 ">
              Create series for various voucher type
            </p>
          </div>
        </div>
        {/* <div className="flex items-center gap-4">
          <RiBuildingLine
            size={40}
            className="text-blue-400 bg-blue-100 p-2 rounded-md"
          />
          <div>
            <h2 className="font-semibold text-blue-500">Printing Templates</h2>
            <p className="text-sm text-zinc-600 ">
              All Printing Templates Customizable
            </p>
          </div>
        </div> */}
      </div>
    </div>
    </>
  );
}
