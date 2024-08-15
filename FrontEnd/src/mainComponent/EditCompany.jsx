import axios from "axios";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function EditCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // companyName: "",
    // legalName: "",
    // aliasName: "",
    // addressLineTwo: "",
    // addressLineOne: "",
    // pincode: "",
    // country: "",
    // city: "",
    // state: "",
    // email: "",
    // mobileNo: "",
    // registrationType: "",
    // companyEstablishedFrom: "",
    // selectedOption: "",
    // gstin: "",
    // partyType: "",
    // gstApplicableFrom: "",
   
    // typeOfOrganization: "",
    // industry: "",
    // phoneNo: "",
    // faxNo: "",
    // website: "",
  });

  const [data, setData] = useState({});

 
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/${id}`
        );
        setData(res.data.response);
      
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = ()=>{

      try {
        const res = axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/company/${id}`, data)
        console.log(res, "rsssssssssssssssssssssssssssssssssssssss")
        toast.success("Company Updated Successfully!");
        location.reload();
      } catch (error) {
        toast.error("Error Updating Company!");
      };
    
  }

  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Current Assets",
    "Bank Accounts",
    "Cash in Hand",
    "Deposits (Asset)",
    "Loans & Advances (Asset)",
    "Stock-in-Hand",
    "Sundry Debtors (Customer)",
    "Fixed Assets",
    "Investments",
    "Suspense A/c",
    "Capital Account",
    "Reserves & Surplus",
    "Current Liabilities",
    "Provisions",
    "Sundry Creditors (Vendor)",
    "Loans (Liability)",
    "Secured Loans",
    "Unsecured Loans",
    "Sales Accounts",
    "Direct Incomes",
    "Indirect Incomes",
    "Purchase Accounts",
    "Direct Expenses",
    "Indirect Expenses",
    "Duties and Taxes",
    "Misc. Expenses (Asset)",
    "Bank OD/CC A/c",
  ];

  const partyType = ["Deemed Export", "Embassy/UN Body", "SEZ"];

  const industry = [
    "Select industry",
    "AGRICULTURE AND ALLIED INDUSTRIES",
    "AUTOMOBILES",
    "AUTO COMPONENTS",
    "AVIATION",
    "BANKING",
    "BIOTECHNOLOGY",
    "CEMENT",
    "CHEMICALS",
    "CONSUMER DURABLES",
    "DEFENCE MANUFACTURING",
    "E-COMMERCE",
    "EDUCATION AND TRAINING",
    "ELECTRONICS SYSTEM DESIGN & MANUFACTURING",
    "ENCINEERINC AND CAPITAL GOODS",
    "FINANCIAL SERVICES",
    "FMCG",
    "CEMS AND JEWELLERY",
    "HEALTHCARE",
    "INFRASTRUCTURE",
    "INSURANCE",
    "IT & BPM",
    "MANUFACTURING",
    "MEDIA AND ENTERTAINMENT",
    "MEDICAL DEVICES",
    "METALS AND MINING",
    "MSME",
    "PHARMACEUTICALS",
    "PORTS",
    "POWER",
    "RAILWAYS",
    "REAL ESTATE",
    "RENEWABLE ENERGY",
    "RETAIL",
    "SERVICES",
    "STEEL",
    "TELECOMMUNICATIONS",
    "TEXTILES",
    "TOURISM AND HOSPITALITY",
    "OTHER",
    "CUSTOM CLEARANCE & FORWARDING ACENT",
  ];

  const handleChangeSelect = (event) => {
    setSelectedOption(event.target.value);
    setFormData({ underGroup: event.target.value });
  };
  console.log(data, "dddddddddddddddddddddd");

  return (
    <>
      <div className="bg-white w-[80vw] rounded-lg shadow-lg mx-auto px-5 my-8 py-5 border">
      <Toaster />
        <div className="flex items-center gap-2 pb-2">
          <Link to="/erp/myCompanies">
            <BiArrowBack className="mt-1" />
          </Link>
          <h2 className="text-xl font-semibold mb-2">Edit Company</h2>
        </div>
        <div className="border rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="options"
                className="block text-sm font-medium mb-1"
              >
                Registration Type
              </label>
              <select
                id="options"
                name="registrationType"
                onChange={handleChange}
                value={data.registrationType}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Under Group</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="gstin" className="block text-sm font-medium mb-1">
                GSTIN
              </label>
              <input
                id="gstin"
                type="text"
                name="gstNumber"
                placeholder="Enter GSTIN"
                value={data.gstNumber}
                defaultValue={data.gstNumber}
                onChange={handleChange}
                className="p-2 border form-input w-full"
              />
            </div>
          </div>
          <div className="grid  grid-cols-1 sm:grid-cols-1  md:grid-cols-2 gap-3 mb-6">
            <div>
              <div>
                <label
                  htmlFor="options"
                  className="block text-sm font-medium mb-1"
                >
                  Party Type
                </label>
              </div>
              <div>
                <select
                  id="options"
                  name="underGroup"
                  value={selectedOption.underGroup}
                  onChange={handleChangeSelect}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Not Applicable</option>
                  {partyType.map((options, index) => (
                    <option key={index} value={options}>
                      {options}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                GST Applicable From
              </label>
              <input
                type="date"
                placeholder="21-03-2024"
                name="gstApplicableFrom"
                value={formData.gstApplicableFrom}
                defaultValue={data.gstApplicableFrom}
                onChange={handleChange}
                className="p-2 border form-input w-full"
              />
            </div>
            <div>
              <div>
                <label htmlFor="" className="block text-sm font-medium mb-1">
                  Alias Name
                </label>
                <input
                  type="text"
                  name="aliasName"
                  className="p-2 border form-input w-full"
                  placeholder="Enter Alias Name"
                  value={formData.aliasName}
                  defaultValue={data.aliasName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="" className="block text-sm font-medium mb-1">
                  PAN/IT/TAN No.
                </label>
                <input
                  type="text"
                  name="panTanNo"
                  value={formData.panTanNo}
                  defaultValue={data.panTanNo}
                  onChange={handleChange}
                  className="p-2 border form-input w-full"
                  placeholder="AAJCK8156D"
                />
              </div>

              <div>
                <label htmlFor="" className="block text-sm font-medium mb-1">
                  Legal Name
                </label>
                <input
                name="legalName"
                data={data.legalName}
                defaultValue={data.legalName}
                onChange={handleChange}
                  type="text"
                  placeholder="Enter Legal Name"
                  className="p-2 border form-input w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Company Logo
              </label>
              <div className="w-full border-dashed border-2 border-sky-300 rounded-lg justify-center items-center flex flex-col gap-4 p-2 h-[90%]">
                <p className="text-center text-red-400 w-3/4 hidden sm:block ">
                  The type of the uploaded file should be .jpeg/.jpg/.png/.bmp &
                  size up to 2 MB, recommended logo dimension: 65px X 65px.
                </p>
                <label
                  htmlFor="file-upload"
                  className="flex items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Upload File
                </label>
                <input id="file-upload" type="file" className="hidden" />
              </div>
            </div>
          </div>

          <div className="grid  grid-cols-1 sm:grid-cols-1  md:grid-cols-3 gap-3 mb-6">
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Company Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={data.companyName}
                placeholder="Enter Company Name"
                className="p-2 border form-input w-full"
                defaultValue={data.companyName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Type Of Organization
              </label>
              <input
                type="text"
                name="typeOfOrganization"
                value={data.typeOfOrganization}
                defaultValue={data.typeOfOrganization}
                onChange={handleChange}
                placeholder="Private Limited Company"
                className="p-2 border form-input w-full"
              />
            </div>
            <div className="">
              <div>
                <label
                  htmlFor="options"
                  className="block text-sm font-medium mb-1"
                >
                  Industry
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div>
                <select
                  id="options"
                  name="industry"
                  value={data.industry}
                  onChange={handleChangeSelect}
                  className="block  py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
                >
                  <option value="">Not Applicable</option>
                  {industry.map((options, index) => (
                    <option key={index} value={options}>
                      {options}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <h2 className="mb-2">Primary Details</h2>
          <div className="grid  grid-cols-1 sm:grid-cols-1  md:grid-cols-2 gap-3 mb-6">
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLineOne"
                value={data.addressLineOne}
                onChange={handleChange}
                placeholder="Plot No. 312, Swastic Grand NCS No 645, C/o Sushila Prasad"
                className="p-2 border form-input w-full"
              />
            </div>
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLineTwo"
                value={data.addressLineTwo}
                onChange={handleChange}
                className="p-2 border form-input  w-full"
                placeholder="Andherdev Marg, Jabalpur"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-2 gap-3 mb-6">
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                onChange={handleChange}
                value={data.country}
                placeholder="Not Applicable"
                defaultValue={data.country}
                className="p-2 border form-input w-full "
              />
            </div>
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Pincode*
              </label>
              <input
               name="pincode"
               onChange={handleChange}
               value={data.pincode}
                type="text"
                placeholder="45XXXX"
                defaultValue={data.pincode}
                className="p-2 border form-input w-full"
              />
            </div>
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                State
              </label>
              <input
               name="state"
               onChange={handleChange}
               value={data.state}
                type="text"
                placeholder="Not Applicable"
                defaultValue={data.state}
                className="p-2 border form-input w-full"
              />
            </div>
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                value={data.city}
                placeholder="Enter City"
                defaultValue={data.city}
                className="p-2 border form-input w-full"
              />
            </div>
          </div>

          <h2>Contact Details</h2>
          <div className="grid  grid-cols-1 sm:grid-cols-1  md:grid-cols-2 gap-3 mb-6">
            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Phone No.
              </label>
              <input
                name="phoneNo"
                onChange={handleChange}
                value={data.phoneNo}
                type="number"
                placeholder="78XXXXXXX80"
                className="p-2 border form-input w-full"
              />
            </div>

            <div>
              <label htmlFor="" className="block text-sm font-medium mb-1">
                Fax No.
              </label>
              <input
                name="faxNo"
                onChange={handleChange}
                value={data.faxNo}
                type="text"
                placeholder="Not Applicable"
                className="p-2 border form-input w-full"
              />
            </div>
            <div className="">
              <div>
                <label htmlFor="" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  type="text"
                  className="p-2 border form-input w-full"
                  placeholder="info@knowifycapital.com"
                />
              </div>

              <div>
                <label htmlFor="" className="block text-sm font-medium mb-1">
                  Website
                </label>
                <input
                  name="website"
                  onChange={handleChange}
                  value={data.website}
                  type="text"
                  placeholder="Not Applicable"
                  className="p-2 border form-input w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="block text-sm font-medium mb-1">
                  Company Established From
                </label>
                <input
                  type="date"
                  name="companyEstablishedFrom"
                  onChange={handleChange}
                  value={data.companyEstablishedFrom}
                  defaultValue={data.companyEstablishedFrom}
                  placeholder="Not Applicable"
                  className="p-2 border form-input w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Signature
              </label>
              <div className="w-full border-dashed border-2 border-sky-300 rounded-lg justify-center items-center flex flex-col gap-4 p-2 h-[90%]">
                <p className="text-center text-red-400 w-3/4 hidden sm:block ">
                  The type of the uploaded file should be .jpeg/.jpg/.png/.bmp &
                  size up to 100 KB, recommended signature dimension: 125px X
                  55px.
                </p>
                <label
                  htmlFor="file-upload"
                  className="flex items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Upload File
                </label>
                <input id="file-upload" type="file" className="hidden" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <button onClick={()=>{
              navigate('/erp/myCompanies')
            }}  className="border border-gray-500 text-gray-500 px-3 py-1 rounded-lg">
              Cancel
            </button>
            <button
             
              onClick={handleSubmit}
              className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
