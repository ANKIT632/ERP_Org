import axios from "axios";
import React, { useState } from "react";
import AllCustomer from "../mainComponent/AllCustomer";
import { toast, Toaster } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    accountName: "",
    sortName: "",
    email: "",
    phone: "",
    contactName: "",
    defaultPeriod: "",
    pan: "",
    mode: "Cheque",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    openingBalance: 0,
    pincode: null,
    provideBankDetails: "yes",
    crdr: "cr",
  });
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/customer`,
        formData,
        {
          header: {
            "content-type": "application/json",
          },
        }
      );

      toast.success("Customer Created Successfully!");
      location.reload();
    } catch (error) {
      console.log(error, "error");
      toast.error("Customer created unsuccessfully");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-4 w-full  border bg-white px-4 py-2 rounded-lg shadow">
      <Toaster />
      <button
        className="bg-blue-700 m-4 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={() => {
          setShowModal(true);
          setIsVisible(false);
        }}
      >
        Create Customer
      </button>

      {showModal ? (
        <>
          <div className="bg-white w-full rounded-lg shadow-lg max-w-4xl mx-auto my-8">
            <div className="flex  gap-2">
              <BiArrowBack
                className="border text-3xl p-1 border-gray-500 rounded-md"
                onClick={() => {
                  setShowModal(false);
                  setIsVisible(true);
                }}
              />
              <h2 className="text-xl font-semibold mb-6">New Customer </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="accountName"
                    className="block text-sm font-medium mb-1"
                  >
                    Account Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    placeholder="Barry Tone"
                    value={formData.accountName}
                    onChange={handleChange}
                    className="p-2 border form-input "
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="sortName"
                    className="block text-sm font-medium mb-1"
                  >
                    Short/Alias Name
                  </label>
                  <input
                    type="text"
                    id="sortName"
                    name="sortName"
                    placeholder="Jack"
                    value={formData.sortName}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border form-input "
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    phone No.
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="99XXXXXXX01"
                    value={formData.phone}
                    onChange={handleChange}
                    className="p-2 border form-input "
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-medium mb-1"
                  >
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    placeholder="Contact Person Name"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <div>
                  <label
                    htmlFor="defaultCreditPeriod"
                    className="block text-sm font-medium mb-1"
                  >
                    Default Credit Period (In days)
                  </label>
                  <input
                    type="text"
                    id="defaultPeriod"
                    name="defaultPeriod"
                    placeholder="Default Credit Period (In days)"
                    value={formData.defaultPeriod}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <div>
                  <label
                    htmlFor="pan"
                    className="block text-sm font-medium mb-1"
                  >
                    PAN/IT/TAN No.
                  </label>
                  <input
                    type="text"
                    id="pan"
                    name="pan"
                    placeholder="PAN/IT/TAN No."
                    value={formData.pan}
                    onChange={handleChange}
                    className="p-2 border form-input "
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mode"
                    className="block text-sm font-medium mb-1"
                  >
                    Mode
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="mode"
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Cheque">Cheque</option>
                    <option value="Net banking">Net banking</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="IMPS">IMPS</option>
                    <option value="NEFT">NEFT</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="address1"
                    className="block text-sm font-medium mb-1"
                  >
                    Address
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    placeholder="Floor No., Building Name"
                    value={formData.address1}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <div>
                  <label
                    htmlFor="address2"
                    className="block text-sm font-medium mb-1"
                  >
                    Address 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    placeholder="Near by Location, Landmark, Sub"
                    value={formData.address2}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium mb-1"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="India"
                    value={formData.country}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium mb-1"
                  >
                    Pincode
                  </label>
                  <input
                    type="number"
                    id="pincode"
                    name="pincode"
                    placeholder="39XX01"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium mb-1"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="MADHYA PRADESH"
                    value={formData.state}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="p-2 border form-input "
                  />
                </div>
                <label className="text-sm font-medium mb-1 flex">
                  Provide bank details?
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="provideBankDetailsYes"
                      name="provideBankDetails"
                      value="yes"
                      checked={formData.provideBankDetails === "yes"}
                      onChange={handleChange}
                    />
                    <label htmlFor="provideBankDetailsYes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="provideBankDetailsNo"
                      name="provideBankDetails"
                      value="no"
                      checked={formData.provideBankDetails === "no"}
                      onChange={handleChange}
                    />
                    <label htmlFor="provideBankDetailsNo">No</label>
                  </div>
                </div>

                {formData.provideBankDetails === "yes" ? (
                  <>
                    <div>
                      <label
                        htmlFor="accountHolder"
                        className="block text-sm font-medium mb-1"
                      >
                        Account Holders Name
                      </label>
                      <input
                        type="text"
                        id="accountHolder"
                        name="accountHolder"
                        placeholder="Account Holder Name"
                        value={formData.accountHolder}
                        onChange={handleChange}
                        className="p-2 border form-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="accountNumber"
                        className="block text-sm font-medium mb-1"
                      >
                        A/C No.
                      </label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="Account Number"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className="p-2 border form-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="ifscCode"
                        className="block text-sm font-medium mb-1"
                      >
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        placeholder="IFSC Code"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        className="p-2 border form-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="bankName"
                        className="block text-sm font-medium mb-1"
                      >
                        Bank Name
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        placeholder="Bank Name"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="p-2 border form-input"
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="pb-2 flex flex-col">
                <label className="text-lg ">Opening Balance </label>
                <div className="flex">
                  <input
                    type="number"
                    placeholder="₹ 0.00"
                    className="p-2 border form-input"
                    onChange={handleChange}
                    value={formData.openingBalance}
                    name="openingBalance"
                  />
                  <select
                    name="crdr"
                    className=""
                    onChange={handleChange}
                    value={formData.crdr}
                  >
                    <option value="cr">cr</option>
                    <option value="dr">dr</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className=" border border-blue-500 text-blue-500  px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <AllCustomer />
        </>
      )}
    </div>
  );
};
export default CreateCustomer;
