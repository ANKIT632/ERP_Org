import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AllCompany from "./AllCompany";
export default function MyCompanies() {
  const [data, setData] = useState({});
  const [activeSection, setActiveSection] = useState("withGst");
  const [gstNumber, setGstNumber] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [gstDetails, setGstDetails] = useState({
    gstNumber: "",
    companyName: "",
    companyEstablishedFrom: new Date(),
    aliasName: "",
    address1: "",
    address2: "",
    country: "",
    pincode: 0,
    state: "",
    city: "",
    mobile: 0,
    email: "",
    registrationType: ""
  });

  const [gstFlag, setGstFlag] = useState(false);

  const getGstDetails = async () => {
    try {
      const response = await fetch(
        `http://sheet.gstincheck.co.in/check/dbf0bdde69dee8813ef43f6b379492b0/${gstNumber}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setGstDetails(data.data);
      setGstFlag(data.flag);
      // console.log(data, "RESPONSE");
    } catch (error) {
      console.error("Error fetching GSTIN details:", error);
    }
  };

  const handleSubmit = async () => {
    try {

      const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/company`, data);
      if (res) {
        toast.success("Company Created Successfully");
      }
      console.log(res);
      location.reload();

    } catch (error) {
      toast.error("Company Created Unsuccessfully")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  console.log(data, "data myComponies");
  return (
    <>
      <div className="flex  justify-end">
        <button
          className="bg-blue-700 m-4  text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none ease-linear transition-all duration-150 hover:bg-blue-600 "
          type="button"
          style={{ display: isVisible ? "block" : "none" }}
          onClick={() => {
            setShowModal(true);
            setIsVisible(false);
          }}
        >
          Create Company
        </button>
      </div>

      {showModal ? (
        <>
          <div className="max-w-4xl mx-auto p-2 w-full">
            <Toaster />
            <h1 className="py-2 font-semibold text-2xl text-zinc-900">
              Create Company
            </h1>
            <div className="p-4 bg-white shadow-md border rounded-md border-gray-300">
              <div className="flex gap-6 mb-6 border-b pb-3">
                <button
                  className={`flex items-center gap-2 ${activeSection === "withGst"
                      ? "text-blue-600 border-b border-blue-400 pb-2"
                      : "text-gray-600 pb-2"
                    }`}
                  onClick={() => setActiveSection("withGst")}
                >
                  <span></span>
                  With GST
                </button>
                <button
                  className={`flex items-center gap-2 text-gray-700${activeSection === "withoutGst"
                      ? "text-blue-600 border-b border-blue-400 pb-2"
                      : "text-gray-600 pb-2"
                    }`}
                  onClick={() => setActiveSection("withoutGst")}
                >
                  <span></span>
                  Non GST
                </button>
              </div>
              {activeSection === "withoutGst" && (
                <>
                  <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>


                      <label
                        htmlFor="company_name"
                        className="block text-sm  text-zinc-700 font-semibold"
                      >
                        GSTIN <span className="text-gray-400">(optional)</span>
                      </label>

                      <input
                        type="text"
                        name="gstNumber"
                        id="gstNumber"
                        placeholder="23XXXXXXXXXXZK"
                        onChange={handleChange}
                        className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">

                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Company Name*
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        placeholder="Barry Tone PVT. LTD."
                        onChange={handleChange}
                        className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="legalName"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Legal Name
                      </label>
                      <input
                        type="text"
                        name="legalName"
                        id="legalName"
                        placeholder="Barry Tone"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="aliasName"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Alias Name
                      </label>
                      <input
                        type="text"
                        name="aliasName"
                        id="aliasName"
                        placeholder="Jack"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="address2"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        placeholder="Near by Location, Landmark, Sub-district"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="address1"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Address Line 1*
                      </label>
                      <input
                        type="text"
                        name="address1"
                        id="address1"
                        placeholder="Floor No., Building Name"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Pincode*
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        placeholder="39XX01"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Country
                      </label>
                      <input
                        id="country"
                        name="country"
                        autocomplete="country"
                        placeholder="country"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      ></input>
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        City*
                      </label>
                      <input
                        id="city"
                        name="city"
                        autocomplete="city"
                        placeholder="city"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      ></input>
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        autocomplete="state"
                        placeholder="State"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      ></input>
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Email*
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@domain.com"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="mobileNumber"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Mobile No.*
                      </label>
                      <input
                        type="text"
                        name="mobileNumber"
                        id="mobileNumber"
                        placeholder="7880093480"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="registration_type"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Registration Type
                      </label>
                      <input
                        id="registrationType"
                        name="registrationType"
                        autocomplete="registrationType"
                        placeholder="register type"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      ></input>
                    </div>
                    <div className="sm:col-span-1">
                      <label
                        htmlFor="companyEstablishedFrom"
                        className="block text-sm font-medium text-zinc-700"
                      >
                        Company Established From*
                      </label>
                      <input
                        type="date"
                        name="companyEstablishedFrom"
                        id="companyEstablishedFrom"
                        placeholder="16-04-2024"
                        onChange={handleChange} className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button onClick={() => {
                      setShowModal(false);
                      setIsVisible(true);
                    }} className="border border-zinc-300 text-zinc-700 rounded-lg px-4 py-2">
                      Cancel
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-lg px-4 py-2">
                      Save
                    </button>
                  </div>
                </>
              )}
              {activeSection === "withGst" && (
                <>
                  <label
                    htmlFor="company_name"
                    className="block text-sm  text-zinc-700 font-semibold"
                  >
                    GSTIN <span className="text-red-500">*</span>
                  </label>
                  <div className="sm:col-span-1 flex gap-2">
                    <input
                      type="text"
                      name="gstNumber"
                      id="gstNumber"
                      placeholder="23XXXXXXXXXXZK"
                      onChange={(e) => {
                        setGstNumber(e.target.value);
                      }}
                      className="p-2 mt-1  focus:outline-blue-300 block w-full shadow-sm sm:text-sm border-zinc-300 rounded-md"
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-900 text-white p-2 rounded-md"
                      onClick={getGstDetails}
                    >
                      Verify
                    </button>
                  </div>
                  <p className="text-gray-500 pt-1">
                    Enter your 15 digit GSTIN number
                  </p>
                  <>
                    <div className="pt-6">
                      <h2 className="text-lg font-semibold mb-4">
                        GSTIN Legal Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                          <label
                            htmlFor="companyName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Company Name*
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            value={gstDetails.tradeNam || ""}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="aliasName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Alias Name
                          </label>
                          <input
                            type="text"
                            id="aliasName"
                            name="aliasName"
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            value={gstDetails.aliasName || ""}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="address1"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address Line 1*
                          </label>
                          <input
                            type="text"
                            id="address1"
                            name="address1"
                            value={gstDetails.pradr?.adr || ""}
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="address2"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address Line 2
                          </label>
                          <input
                            type="text"
                            id="address2"
                            name="address2"
                            value={gstDetails.pradr?.addr.loc || ""}
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Country
                          </label>
                          <input
                            id="country"
                            name="country"
                            value={"India"}
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="pincode"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Pincode*
                          </label>
                          <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            value={gstDetails.pradr?.addr.pncd || ""}
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700"
                          >
                            State
                          </label>
                          <input
                            id="state"
                            name="state"
                            value={gstDetails.pradr?.addr.stcd || ""}
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          ></input>
                        </div>
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            City*
                          </label>
                          <input
                            id="city"
                            name="city"
                            value={gstDetails.pradr?.addr.loc || ""}
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          ></input>
                        </div>
                        <div>
                          <label
                            htmlFor="mobile"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mobile No.*
                          </label>
                          <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            onChange={handleChange}
                            className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email*
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="companyEstablishedFrom"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Company Established From*
                          </label>
                          <input
                            type="text"
                            id="companyEstablishedFrom"
                            name="companyEstablishedFrom"
                            value={gstDetails.rgdt || ""}
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="registrationType"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Registration Type
                          </label>
                          <input
                            id="registrationType"
                            name="registrationType"
                            value={gstDetails.dty || ""}
                            onChange={handleChange} className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => {
                          setShowModal(false);
                          setIsVisible(true);
                        }} className="border border-zinc-300 text-zinc-700 rounded-lg px-4 py-2">
                        Cancel
                      </button>
                      <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                        Save
                      </button>
                    </div>
                  </>
                  {gstFlag ? (
                    <></>
                  ) : (
                    ""
                  )}
                </>
              )}


            </div>
          </div>
        </>
      ) : (
        <>
          <AllCompany />
        </>
      )}


    </>
  );
}
