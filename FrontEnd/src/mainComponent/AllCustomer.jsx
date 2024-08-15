import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function AllCustomer() {
  const [openIndex, setOpenIndex] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [customerUpdateData, setCustomerUpdateData] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = useState(null);

  const handleEditClick = (index) => {
    setEditingIndex(index);
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
    const res = axios.patch(
      `${import.meta.env.VITE_APP_BASE_URL}/customer/${id}`,
      customerUpdateData
    );
    toast.success("Customer Edited Successfully!");
    location.reload();
    setEditingIndex(null);
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/customer/${id}`
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
      .get(`${import.meta.env.VITE_APP_BASE_URL}/customer`)
      .then((res) => {
        setCustomerData(res.data.response);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="border py-5 px-4 w-full rounded-lg border-gray-300 shadow">
      <div className="bg-white w-full overflow-x-auto rounded-lg border ">
        <Toaster />
        <div className="overflow-y-scroll h-[500px] ">
          <table className="w-full border rounded-md">
            <thead className="bg-blue-200 text-gray-800 text-sm sm:text-xs md:text-sm">
              <tr className="border-b border-gray-300 p-4">
                <th className="p-3">SR NO</th>
                <th>Account Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Country</th>
                <th>State</th>
                <th>PAN</th>
                <th>Account Number</th>
                <th>IFSC Code</th>
                <th>Pincode</th>
                <th>Bank Name</th>
                <th>Actions</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-xs md:text-sm">
              {customerData.map((customer, index) => (
                <tr
                  key={customer._id}
                  className="border-b border-gray-200 text-center"
                >
                  <td className="p-2">{index + 1}</td>
                  <td>{customer.accountName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address1}</td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        placeholder={customer.country}
                        onChange={handleOnchange}
                        name="country"
                        value={
                          customerUpdateData.country || customerData.country
                        }
                      />
                    ) : (
                      customer.country
                    )}
                  </td>
                  <td>{customer.state}</td>
                  <td>{customer.pan}</td>
                  <td>{customer.accountNumber}</td>
                  <td>{customer.ifscCode}</td>
                  <td>{customer.pincode}</td>
                  <td>{customer.bankName}</td>
                  <td>
                    <div className="dropdown  flex flex-col bg-white items-center ">
                      <button
                        className="flex justify-end items-center"
                        onClick={() => handleOpen(index)}
                      >
                        Action
                        <IoMdArrowDropdown />
                      </button>
                      {openIndex === index && (
                        <ul className="menu  border bg-white mt-6  rounded-md absolute ">
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
                                setShowModal(true);
                                handleEditClick(customer._id);
                                setItemId(customer._id);
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
                    <h2 className="text-lg font-medium mb-4">Edit Customer</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-4">
                        <label
                          htmlFor="accountName"
                          className="block text-sm font-medium mb-1"
                        >
                          Account Name
                        </label>
                        <input
                          type="text"
                          id="accountName"
                          name="accountName"
                          placeholder="Enter account name"
                          value={customerData.accountName}
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
                          id="phone"
                          name="phone"
                          placeholder="99XXXXXXX01"
                          value={customerData.phone}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                          value={customerData.pan}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
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
                          value={customerData.address1}
                          onChange={handleOnchange}
                          className="p-2 border form-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
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
                          value={customerData.accountNumber}
                          onChange={handleOnchange}
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
                          value={customerData.ifscCode}
                          onChange={handleOnchange}
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
                          value={customerData.bankName}
                          onChange={handleOnchange}
                          className="p-2 border form-input"
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
  );
}
