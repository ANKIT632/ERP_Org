import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

export default function EditGst() {


  const [isLutBondChecked, setIsLutBondChecked] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [data , setData] = useState();
  const userId = useSelector((state) => state.user);

  const handleSubmit = async()=>{
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/statutory/`,
        data
      );    
      console.log(res, "resData")  
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e)=>{
    const {name , value} = e.target;
    setData((prevData)=>({
      ...prevData,
      [name]: value,
      [userId]:userId
    }))
  }
  console.log(data, "dattttttttttttttttt")


  return (
    <>
      <div className="p-8  mx-auto">
        <div className=" rounded-lg p-6">
          <div className="flex">
            <Link to="/erp/statutory-info" className="pt-2">
              <button className="text-zinc-600 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </Link>
            <h2 className="text-2xl font-semibold mb-6">TDS Details</h2>
          </div>
          <div className="bg-white shadow-lg rounded-md  p-6">
            <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-center gap-4">
              <label className="block font-medium mb-1">
              Enable tax deducted at source (TDS)?
              </label>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="enableGSTYes"
                  name="enableGST"
                  className="mr-2"
                  value="yes"
                  checked={isEnable}
                  onChange={() => setIsEnable(true)}
                />
                <label htmlFor="enableGSTYes" className="mr-4">
                  Yes
                </label>
                <input
                  type="radio"
                  id="enableGSTNo"
                  name="enableGST"
                  className="mr-2"
                  value="no"
                  checked={!isEnable}
                  onChange={() => setIsEnable(false)}
                />
                <label htmlFor="enableGSTNo">No</label>
              </div>
            </div>
            {isEnable && (
                <>
                <div className=" ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="tanNumber"
                        className="block text-zinc-700"
                      >
                        TAN Registration Number
                      </label>
                      <input
                        type="text"
                        id="tanNumber"
                        value={(data && data.tanRegistration) || ""}
                        name="tanRegistration"
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="tan" className="block text-zinc-700">
                        Tax Deduction and Collection Account Number (TAN)*
                      </label>
                      <input
                        type="text"
                        id="tan"
                        placeholder="BLXXXXXX4M"
                        name="taxDeduction"
                        value={(data && data.taxDeduction) || ""} 
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="deducteeType"
                        className="block text-zinc-700"
                      >
                        Deductee Type
                      </label>
                      <select
                        id="deducteeType"
                        className="mt-1 p-2 w-full border rounded-md"
                        name="deducteeType"
                        value={(data && data.deducteeType) || ""}
    
                        onChange={handleChange}

                      >
                        <option>Unknown</option>
                        <option>Individual</option>
                        <option>Company</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="deductorBranch"
                        className="block text-zinc-700"
                      
                      >
                        Deductor Branch/Division*
                      </label>
                      <input
                        type="text"
                        id="deductorBranch"
                        placeholder="GUXXXAT"
                        onChange={handleChange}
                        value={(data && data.deductorBranch) || ""}
                        name="deductorBranch"
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button className="px-4 py-2 border rounded-md text-zinc-700 hover:bg-zinc-100">
                      Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
