import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function AllAccount() {
  const [openIndex, setOpenIndex] = useState(null);
  const [accountData, setAccountData] = useState([]);
  const [accountUpdateData, setAccountUpdateData] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = useState(null);
  const componentRef = useRef(null);

  

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setAccountUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = (id) => {
    const res = axios.patch(
      `${import.meta.env.VITE_APP_BASE_URL}/account/${id}`,
      accountUpdateData
    );

    toast.success("Account Edited Successfully!");
    location.reload();
    setEditingIndex(null);
  };
  console.log(accountUpdateData, "accountUpdateData")

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/account/${id}`
        );
        toast.success("Account Deleted Successfully!");
        location.reload();
        setEditingIndex(null);
      } catch (error) {
        toast.error("Error deleting account!");
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/account`)
      .then((res) => {
        setAccountData(res.data.response);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);


  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const InputField = ({ label, id, name, placeholder, value, onChange }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 border form-input"
      />
    </div>
  );

  return (
    <div className="border py-5 px-4 w-full rounded-lg border-gray-300 shadow ">
      <div className="bg-white w-full overflow-x-auto rounded-lg border ">
        <Toaster />
        <div className="overflow-y-scroll h-[500px] ">
          <table className="w-full border rounded-md ">
            <thead className="bg-blue-200 text-gray-800 text-sm sm:text-xs md:text-sm   ">
              <tr className="border-b border-gray-300  ">
                <th className="p-3 border border-gray-300 ">SR NO</th>
                <th className="p-3 border border-gray-300 " >Account Name</th>
                <th className="p-3 border border-gray-300 ">Under Group</th>
                <th className="p-3 border border-gray-300 ">Email</th>
                <th className="p-3 border border-gray-300 ">Phone</th>
                <th className="p-3 border border-gray-300 ">Address</th>
                <th className="p-3 border border-gray-300 ">Country</th>
                <th className="p-3 border border-gray-300 ">State</th>
                <th className="p-3 border border-gray-300 ">PAN</th>
                <th className="p-3 border border-gray-300 ">Account Number</th>
                <th className="p-3 border border-gray-300 ">IFSC Code</th>
                <th className="p-3 border border-gray-300 ">Pincode</th>
                <th className="p-3 border border-gray-300 ">Bank Name</th>
                <th className="pr-1 border-b border-gray-300 px-3">Actions</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-xs md:text-sm ">
              {accountData.map((customer, index) => (
                <tr
                  key={customer._id}
                  className="border border-gray-300 text-center "
                >
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">{customer.accountName}</td>
                  <td className="p-2 border border-gray-300">{customer.underGroup}</td>
                  <td className="p-2 border border-gray-300">{customer.email}</td>
                  <td className="p-2 border border-gray-300">{customer.phone}</td>
                  <td className="p-2 border border-gray-300">{customer.address1}</td>
                  <td className="p-2 border border-gray-300">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        placeholder={customer.country}
                        onChange={handleOnchange}
                        name="country"
                        value={accountUpdateData.country || accountData.country}
                      />
                    ) : (
                      customer.country
                    )}
                  </td>
                  <td className="p-2 border border-gray-300">{customer.state}</td>
                  <td className="p-2 border border-gray-300">{customer.pan}</td>
                  <td className="p-2 border border-gray-300">{customer.accountNumber}</td>
                  <td className="p-2 border border-gray-300">{customer.ifscCode}</td>
                  <td className="p-2 border border-gray-300">{customer.pincode}</td>
                  <td className="p-2 border border-gray-300">{customer.bankName}</td>
                  <td className="relative">
                    <div
                      className="dropdown  flex flex-col bg-white items-center "

                    >
                      <button
                        className="flex justify-end items-center px-3"
                        onClick={() => handleOpen(index)}
                      >
                        Action
                        { openIndex === index?<IoMdArrowDropup/>:<IoMdArrowDropdown />}
                      </button>
                      {openIndex === index && (
                        <ul className="menu  border bg-white  rounded-md absolute right-0  top-12 z-10">
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
                <>

                  <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                    {accountData.map((account) => (
                      account._id === editingIndex && (
                        <div key={account._id} className="bg-white p-8 rounded-md flex flex-col gap-4">
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
                                value={accountData.accountName}
                                defaultValue={account.accountName}
                                onChange={(e) => handleOnchange(e, account._id)}
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
                                value={accountData.email}
                                defaultValue={account.email}
                                onChange={(e) => handleOnchange(e, account._id)}
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
                                value={accountData.phone}
                                defaultValue={account.phone}
                                onChange={(e) => setAccountUpdateData({ ...accountUpdateData, phone: e.target.value })}
                                className="p-2 border form-input"
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
                                value={accountData.pan}
                                defaultValue={account.pan}
                                onChange={(e) => handleOnchange(e, account._id)}
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
                                defaultValue={account.address1}
                                value={accountData.address1}
                                onChange={(e) => handleOnchange(e, account._id)}
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
                                defaultValue={account.accountNumber}
                                value={accountData.accountNumber}
                                onChange={(e) => handleOnchange(e, account._id)}
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
                                defaultValue={account.ifscCode}
                                value={accountData.ifscCode}
                                onChange={(e) => handleOnchange(e, account._id)}
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
                                defaultValue={account.bankName}
                                value={accountData.bankName}
                                onChange={(e) => handleOnchange(e, account._id)}
                                className="p-2 border form-input"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              className="bg-blue-500 text-white px-4 py-2 mr-2"
                              onClick={() => handleSaveClick(account._id)}
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
                      )
                    ))}

                  </div>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
