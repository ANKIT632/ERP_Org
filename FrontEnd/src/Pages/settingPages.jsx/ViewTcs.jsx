import { Link } from "react-router-dom";
import { useState } from "react";
export default function ViewTcs() {
  const [isEnable, setIsEnable] = useState(false);

  const [tcsData, setTcsData] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTcsData([...tcsData, value]);
    } else {
      setTcsData(tcsData.filter((item) => item !== value));
    }
  };

  console.log(tcsData, "dffffffffffffffffffff");
  const tcsCategories = [
    {
      label: "6CA-Alcoholic liquor for human consumption",
      value: "6CA-Alcoholic liquor for human consumption",
    },
    {
      label: "6CB-Timber obtained under Forest lease",
      value: "6CB-Timber obtained under Forest lease",
    },
    {
      label: "6CC-Timber obtained other than under a forest lease",
      value: "6CC-Timber obtained other than under a forest lease",
    },
    {
      label: "6CD-Any other forest produce not being timber or tendu leaves",
      value: "6CD-Any other forest produce not being timber or tendu leaves",
    },
    { label: "6CE-Scrap", value: "6CE-Scrap" },
    { label: "6CI-Tendu Leaves", value: "6CI-Tendu Leaves" },
    {
      label: "6CJ-Minerals, being coal or lignite or iron ore",
      value: "6CJ-Minerals, being coal or lignite or iron ore",
    },
    { label: "6CF-Parking Lot", value: "6CF-Parking Lot" },
    { label: "6CG-Toll Plaza", value: "6CG-Toll Plaza" },
    { label: "6CH-Mining & Quarrying", value: "6CH-Mining & Quarrying" },
    { label: "6CL-Motor Vehicle", value: "6CL-Motor Vehicle" },
    {
      label: "6CO-Overseas Tour Program Package",
      value: "6CO-Overseas Tour Program Package",
    },
    {
      label: "6CP-Remittance under LRS for education loan",
      value: "6CP-Remittance under LRS for education loan",
    },
    {
      label: "6CQ-Remittance under LRS for purpose other than 6CO/6CP",
      value: "6CQ-Remittance under LRS for purpose other than 6CO/6CP",
    },
    { label: "6CR-Sales of Goods", value: "6CR-Sales of Goods" },
  ];

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
            <h2 className="text-2xl font-semibold mb-6">TCS Details</h2>
          </div>
          <div className="bg-white shadow-lg rounded-md  p-6">
            <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-center gap-4">
              <label className="block font-medium mb-1">
                Enable tax collected at source (TCS)?
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
                        value="TIXXXXXXXXBA"
                        readOnly
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
                        readOnly
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
                      >
                        <option>Unknown</option>
                    
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
                        readOnly
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <div className=" p-6 bg-white shadow-md rounded-lg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="mx-auto border p-4 shadow-lg rounded-md w-full">
                        <h1 className="text-lg font-semibold mb-2 text-center ">
                          TCS Section List
                        </h1>
                        <hr className="mb-1"/>
                        {tcsCategories.map((category) => (
                          <div
                            key={category.value}
                            className="flex items-center "
                          >
                            <input
                              type="text"
                              id={category.value}
                              value={category.value}
                              checked={tcsData.includes(category.value)}
                              onChange={handleCheckboxChange}
                              className="mr-2 w-full"
                            />
                            <label htmlFor={category.value}>
                
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="mx-auto border p-4 shadow-lg rounded-md w-full">
                      
                        <h2 className="text-lg font-semibold mb-2 text-center ">
                        Selected TCS Section List
                        </h2>
                        <hr className="mb-1"/>
                        <ul>
                          {tcsData.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mx-auto">
                       
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button className="px-4 py-2 border rounded-md text-zinc-700 hover:bg-zinc-100">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
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
