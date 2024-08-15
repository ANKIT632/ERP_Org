import { Link } from "react-router-dom";
import { useState } from "react";
export default function ViewGst() {

  const [isEnable, setIsEnable] = useState(false);

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
            <h2 className="text-2xl font-semibold mb-6">GST Details</h2>
          </div>
          <div className="bg-white shadow-lg rounded-md  p-6">
            <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-center gap-4">
              <label className="block font-medium mb-1">
                Enable goods and services tax (GST)?
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
                <div>
                  <div className="">
                    <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 gap-6  ">
                      <div className="mb-4">
                        <label className="block font-medium mb-1">State</label>
                        <input
                          type="text"
                          value={"Madhya Pradesh"}
                          className="w-full p-2 border rounded"
                          readOnly
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block font-medium mb-1">
                          Registration Type
                        </label>
                        <select className="w-full p-2 border rounded">
                          <option>Registered (WithGST)</option>
                          <option>UnRegistered (Without GST)</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block font-medium mb-1">GSTIN</label>
                        <input
                          type="text"
                          value="23AAJCK8156D1ZK"
                          className="w-full p-2 border rounded"
                          readOnly
                        />
                      </div>
                    </div>
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
