import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { setUserDetails } from "../../redux/UserSlice";
import axios from "axios";

export default function EditGst() {
  const [isLutBondChecked, setIsLutBondChecked] = useState(false);
  const [isEnable, setIsEnable] = useState(false);

  const userId = useSelector((state) => state.user);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/userProfile/${userId.id}`
        );
        console.log("hfdfd");
        setData(res.data.response); // Assuming res.data contains the actual data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  console.log(data, "data");

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
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="mb-4 ">
                    <label className="block font-medium mb-1">
                      Provide LUT/Bond details?
                    </label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="lutYes"
                        name="lut"
                        className="mr-2"
                        checked={isLutBondChecked}
                        onChange={() => setIsLutBondChecked(true)}
                      />
                      <label htmlFor="lutYes" className="mr-4">
                        Yes
                      </label>
                      <input
                        type="radio"
                        id="lutNo"
                        name="lut"
                        className="mr-2"
                        checked={!isLutBondChecked}
                        onChange={() => setIsLutBondChecked(false)}
                      />
                      <label htmlFor="lutNo">No</label>
                    </div>
                  </div>
                  {isLutBondChecked && (
                    <>
                      <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-3  ">
                        <div className="mb-4 ">
                          <label className="block font-medium mb-1">
                            LUT/Bond No.
                          </label>
                          <input
                            type="text"
                            placeholder="LUT/Bond No."
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block font-medium mb-1">
                            Validity From
                          </label>
                          <input
                            type="date"
                            placeholder="DD-MM-YYYY"
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block font-medium mb-1">
                            Validity To
                          </label>
                          <input
                            type="date"
                            value="2024-03-31"
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="mb-4">
                    <label className="block font-medium mb-1">
                      E-way bill enabled?
                    </label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="ewayYes"
                        name="eway"
                        className="mr-2"
                        checked
                      />
                      <label htmlFor="ewayYes" className="mr-4">
                        Yes
                      </label>
                      <input
                        type="radio"
                        id="ewayNo"
                        name="eway"
                        className="mr-2"
                      />
                      <label htmlFor="ewayNo">No</label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium mb-1">
                      E-invoice enabled?
                    </label>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="einvoiceYes"
                        name="einvoice"
                        className="mr-2"
                        checked
                      />
                      <label htmlFor="einvoiceYes" className="mr-4">
                        Yes
                      </label>
                      <input
                        type="radio"
                        id="einvoiceNo"
                        name="einvoice"
                        className="mr-2"
                      />
                      <label htmlFor="einvoiceNo">No</label>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label className="block font-medium mb-1">
                        Registration Type
                      </label>
                      <select className="w-full p-2 border rounded">
                        <option>Regular (With GST)</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-1">
                        GST Applicable From
                      </label>
                      <input
                        type="date"
                        value="2022-10-20"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium mb-1">
                        GST User Credentials
                      </label>
                      <input
                        type="text"
                        placeholder="GST User Credentials"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
