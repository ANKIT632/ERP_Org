import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import EditCompany from "./EditCompany";
import { Link, useNavigate } from "react-router-dom";


export default function AllCompany() {
  const [openIndex, setOpenIndex] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [customerUpdateData, setCustomerUpdateData] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = useState(null);
  const [activeButton, setActiveButton] = useState('All');

  const navigate = useNavigate();
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleEditClick = (index) => {
    // setEditingIndex(index);
    <EditCompany />;
  };

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setCustomerUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = (id) => {
    try {
      const res = axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/company/${id}`,
        customerUpdateData
      );
      toast.success("company Edited Successfully!");
      location.reload();
      setEditingIndex(null);
    } catch (error) {
      toast.error("company Edited UnSuccessfully!");
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/company/${id}`
        );
        toast.success("Customer Deleted Successfully!");
        location.reload();
        setEditingIndex(null);
      } catch (error) {
        toast.error("Error deleting item!");
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/company`)
      .then((res) => {
        // console.log(res.data.response, "gfasdddddddddddddddddddddddd");
        setCustomerData(res.data.response);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="border py-5 px-4 w-full rounded-lg border-gray-300 shadow">
      <div className="bg-white w-full  rounded-lg border ">
        <Toaster />
        <div className=" h-full cursor-pointer ">
          <div className="flex gap-6 px-4">
            <p
              className={activeButton === "All" ? "border-b-4 border-blue-400  font-semibold px-4 py-2" : "px-4 py-2"}
              onClick={() => handleClick("All")}
            >
              All
            </p>
            <p
              className={activeButton === "Own" ? "border-b-4 border-blue-400  font-semibold px-4 py-2" : "px-4 py-2"}
              onClick={() => handleClick("Own")}
            >
              Own
            </p>
            <p
              className={activeButton === "Managed" ? "border-b-4 border-blue-400  font-semibold px-4 py-2" : "px-4 py-2"}
              onClick={() => handleClick("Managed")}
            >
              Managed
            </p>
            <p
              className={activeButton === "Shared" ? "border-b-4 border-blue-400  font-semibold px-4 py-2" : "px-4 py-2"}
              onClick={() => handleClick("Shared")}
            >
              Shared
            </p>
          </div>
          <div className="overflow-x-auto overflow-y-auto min-h-[300px]">

          <table className="w-full border rounded-md  ">
            <thead className="bg-blue-200 text-gray-800 text-sm sm:text-xs md:text-sm">
              <tr className="border-b border-gray-300 p-4">
                <th className="p-3 whitespace-nowrap">SR NO</th>
                <th className="max-sm:px-3 whitespace-nowrap">Company Name</th>
                <th className="max-sm:px-3 whitespace-nowrap">GSTIN/UIN</th>
                <th className="max-sm:px-3 whitespace-nowrap">Mobile No.</th>
                {/* <th className="max-sm:px-3 whitespace-nowrap">Organization</th> */}
                <th className="max-sm:px-3 whitespace-nowrap">City</th>
                <th className="max-sm:px-3 whitespace-nowrap">State</th>
                <th className="max-sm:px-3 whitespace-nowrap">Establish Date</th>
                <th className="max-sm:px-3 whitespace-nowrap">Subscription</th>
                <th className="max-sm:px-3 whitespace-nowrap">Actions</th>
                <th ></th>
                <th ></th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-xs md:text-sm">
              {customerData.map((customer, index) => (
                <tr
                  key={customer._id}
                  className="border-b border-gray-200 text-center"
                >
                  <td className="p-2">{index + 1}</td>
                  <td>{customer.companyName}</td>
                  <td>{customer.gstNumber}</td>
                  <td>{customer.phoneNo}</td>
                  {/* <td>{customer.organization}</td> */}
                  <td>{customer.city}</td>
                  <td>{customer.state}</td>
                  <td>{customer.companyEstablishedFrom}</td>
                  {/* <td>{customer.subscription}</td> */}<td>None</td>
                  <td className="relative max-sm:px-3">
                    <div className="dropdown  flex flex-col bg-white items-center ">
                      <button
                        className="flex justify-end items-center"
                        onClick={() => handleOpen(index)}
                      >
                        Action
                        { openIndex === index?<IoMdArrowDropup/>:<IoMdArrowDropdown />}
                      </button>
                      {openIndex === index && (
                        <ul className="menu  border bg-white mt-6  rounded-md absolute right-0 z-10">
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => handleDeleteClick(customer._id)}
                            >
                              <AiFillDelete /> Delete{" "}
                            </button>
                          </li>
                          
                            <li className="menu-item hover:bg-blue-300">
                              <button
                                className="flex justify-center items-center gap-4 px-4 py-1"
                      
                                onClick={() => {
                                  // setShowModal(true);
                                  // handleEditClick(customer._id);
                                  // setItemId(customer._id);
                                  navigate(`/erp/editCompanies/${customer._id}`)
                                }}
                              >
                                {" "}
                                <AiFillEdit /> Edit
                              </button>
                            </li>
                        
                        </ul>
                      )}
                    </div>
                  </td>
                  <div></div>
                </tr>
              ))}
              {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white p-8 rounded-md flex flex-col gap-4">
                    <h2 className="text-lg font-medium mb-4">Edit Company</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-4">
                        <label
                          htmlFor="accountName"
                          className="block text-sm font-medium mb-1"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          placeholder="Enter Company name"
                          value={customerData.companyName}
                          onChange={handleOnchange}
                          className="p-2 border form-input"
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
                          value={customerData.email}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
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
                          id="mobileNumber"
                          name="mobileNumber"
                          placeholder="99XXXXXXX01"
                          value={customerData.phoneNo}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-4">
                        <label
                          htmlFor="accountName"
                          className="block text-sm font-medium mb-1"
                        >
                          GSTIN
                        </label>
                        <input
                          type="text"
                          id="gstNumber"
                          name="gstNumber"
                          placeholder="Enter Company name"
                          value={customerData.gstNumber}
                          onChange={handleOnchange}
                          className="p-2 border form-input"
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
                          placeholder="Enter State Name"
                          value={customerData.state}
                          onChange={handleOnchange}
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
                          placeholder="Enter City Name"
                          value={customerData.city}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 mr-2"
                        onClick={() => handleSaveClick(itemId)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-200 text-gray-800 px-4 py-2"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
