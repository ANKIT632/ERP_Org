import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BiPin } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

export default function AllUnit() {
  const data = [
    { shortName: "BAG", unitName: "BAGS" },
    { shortName: "BAL", unitName: "BALE" },
    { shortName: "BDL", unitName: "BUNDLES" },
    { shortName: "BKL", unitName: "BUCKLES" },
    { shortName: "BOU", unitName: "BILLION OF UNITS" },
    { shortName: "BOX", unitName: "BOX" },
    { shortName: "BTL", unitName: "BOTTLES" },
    { shortName: "BUN", unitName: "BUNCHES" },
    { shortName: "CAN", unitName: "CANS" },
    { shortName: "CBM", unitName: "CUBIC METERS" },
    { shortName: "CCM", unitName: "CUBIC CENTIMETERS" },
    { shortName: "CMS", unitName: "CENTIMETERS" },
    { shortName: "CTN", unitName: "CARTONS" },
    { shortName: "DOZ", unitName: "DOZENS" },
    { shortName: "OPM", unitName: "DRUMS" },
    { shortName: "CCK", unitName: "GREAT GROSS" },
    { shortName: "CMS", unitName: "GRAMMES" },
    { shortName: "CPS", unitName: "QOSS" },
    { shortName: "CYO", unitName: "GROSS YA DS" },
    { shortName: "KCS", unitName: "KILOGRAMS" },
    { shortName: "KME", unitName: "KILOLITRE" },
    { shortName: "LTP", unitName: "KILOMETRE" },
    { shortName: "MTR", unitName: "LITRES" },
    { shortName: "MTS", unitName: "MILILITRE" },
    { shortName: "NOS", unitName: "METERS" },
    { shortName: "PAC", unitName: "METRIC TON" },
    { shortName: "PCS", unitName: "NUMBERS" },
    { shortName: "PRS", unitName: "pACKS" },
    { shortName: "QTL", unitName: "PIECES" },
    { shortName: "AOL", unitName: "PAIRS" },
    { shortName: "SQF", unitName: "QUINTAL" },
    { shortName: "SQM", unitName: "ROLLS" },
    { shortName: "SAV", unitName: "SETS" },
    { shortName: "TBS", unitName: "SQUARE FEET" },
    { shortName: "TOM", unitName: "SQUARE METERS" },
    { shortName: "THO", unitName: "SQUARE YARDS" },
    { shortName: "TON", unitName: "TABLETS" },
    { shortName: "TON", unitName: "TEN cposs" },
    { shortName: "TUB", unitName: "THOUSANDS" },
    { shortName: "UCS", unitName: "TONNES" },
    { shortName: "UNT", unitName: "TUBES" },
    { shortName: "YDS", unitName: "US CALLONS" },
    { shortName: "0TH", unitName: "UNITS" },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const [showCustomTable, setShowCustomTable] = useState(true);
  const [itemData, setItemData] = useState([]);
  const [itemUpdateData, setItemUpdateData] = useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = useState(null);
  const componentRef = useRef(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const handleEditClick = (index) => {
    setEditingIndex(index);
    console.log(index, "item id");
  };
  console.log(editingIndex, "editng eindex");

  const handleSaveClick = () => {
    const res = axios.patch(
      `${import.meta.env.VITE_APP_BASE_URL}/unit/${editingIndex}`,
      formData
    );
    console.log(res, "res ediut")
    toast.success("Unit Updated Successfully!");
    location.reload();
    setEditingIndex(null);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/unit`)
      .then((res) => {
        setItemData(res.data.response);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // setItemData((prev)=>({...prev, }))
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this unit?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/unit/${id}`
        );
        toast.success("Unit Deleted Successfully!");
        location.reload();
        setEditingIndex(null);
      } catch (error) {
        toast.error("Error deleting unit!");
      }
    }
  };

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="border py-5 px-4 w-full rounded-lg border-gray-300 shadow ">
        <div className="p-4 text-gray-800">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-xl pb-2">Unit</h1>
            <BiPin size={20} />
          </div>
          <div className="border border-gray-400  rounded-md shadow ">
            <div className="py-2 mx-2">
              <button
                className={`px-4 ${showCustomTable
                    ? "text-blue-600 border-b-2 border-blue-500 "
                    : ""
                  }`}
                onClick={() => {
                  setShowCustomTable(true);
                }}
              >
                Custom
              </button>
              <button
                className={`px-4 ${!showCustomTable
                    ? "text-blue-600 border-b-2 border-blue-500 "
                    : ""
                  }`}
                onClick={() => setShowCustomTable(false)}
              >
                Default
              </button>
            </div>
            {showCustomTable ? (
              <div className="overflow-y-scroll h-[500px]">
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead className="sticky top-0 bg-blue-200 z-10">
                    <tr>
                      <th className="px-2 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                        Short Name
                      </th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                        GST Short Name
                      </th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                        Unit Name
                      </th>
                      <th className=" py-3  text-xs font-medium text-black  tracking-wider border text-end px-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {itemData.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-blue-100"}
                      >
                        <td className="px-2 p-2 whitespace-nowrap text-sm text-gray-500 border">
                          {item.shortName}
                        </td>
                        <td className="px-2 p-2 whitespace-nowrap text-xs text-gray-500 border">OTH</td>
                        <td className="px-2 p-2 whitespace-nowrap text-sm text-gray-500 border">
                          {item.unitName}
                        </td>
                        <td className="px-2 p-2 whitespace-nowrap text-sm text-gray-500 border">
                          <div className="dropdown  flex flex-col bg-white items-end ">
                            <button
                              className="flex justify-end items-end"
                              onClick={() => handleOpen(index)}
                            >
                              Action
                              {openIndex === index ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                            </button>
                            {openIndex === index && (
                              <ul className="menu  border bg-white mt-6  rounded-md absolute ">
                                <li className="menu-item hover:bg-blue-300">
                                  <button
                                    className="flex justify-center items-center gap-4 px-4 py-1"
                                    onClick={() => handleDeleteClick(item._id)}
                                  >
                                    <AiFillDelete /> Delete{" "}
                                  </button>
                                </li>
                                <li className="menu-item hover:bg-blue-300">
                                  <button
                                    className="flex justify-center items-center gap-4 px-4 py-1"
                                    onClick={() => {
                                      setShowModal(true);
                                      handleEditClick(item._id);
                                      setItemId(item._id);
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
                      </tr>
                    ))}
                    {showModal && (
                      <div
                        className="fixed top-0 left-0 z-50  w-full h-screen bg-[#0005] backdrop-blur-sm flex justify-center items-center"
                        onClick={(e) => {
                          if (e.target === e.currentTarget) {
                            setShowModal(false);
                          }
                        }}
                      >
                        <div className="shadow-lg max-w-6xl w-full mx-auto border rounded-md bg-white p-2">
                          <div className="p-4">
                            <>
                              <div className="max-w-4xl mx-auto my-8 p-4">
                                <div className="mb-4">
                                  <label
                                    className="block text-sm font-medium text-gray-700"
                                    htmlFor="shortName"
                                  >
                                    Short Name
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    id="shortName"
                                    name="shortName"
                                    placeholder="Enter Short Name"
                                    value={formData.shortName}
                                    onChange={handleChange}
                                    className="p-2 border form-input"
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    className="block text-sm font-medium text-gray-700"
                                    htmlFor="unitName"
                                  >
                                    Unit Name
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <select
                                    id="unitName"
                                    name="unitName"
                                    value={formData.unitName}
                                    onChange={handleChange}
                                    className="p-2 border form-select form-input text-gray-600"
                                    required
                                  >
                                    <option value="">Select Unit Name</option>
                                    {data.map((data, index) => (
                                      <option key={index} value={data.unitName}>
                                        {data.unitName}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </>
                          </div>
                          <div className="flex justify-end py-2 gap-5">
                            <button
                              className="bg-gray-200 text-gray-800 px-4 py-2"
                              onClick={() => setShowModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 mr-2"
                              onClick={handleSaveClick}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-y-scroll h-[500px]">
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead className="sticky top-0 bg-blue-200 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                        Short Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                        Unit Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-blue-100"}
                      >
                        <td className="px-2 p-2 whitespace-nowrap text-sm text-gray-500 border">
                          {item.shortName}
                        </td>
                        <td className="px-2 p-2 whitespace-nowrap text-sm text-gray-500 border">
                          {item.unitName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
