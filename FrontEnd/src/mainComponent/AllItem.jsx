import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function AllItem() {
  const [openIndex, setOpenIndex] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [itemUpdateData, setItemUpdateData] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [itemId, setItemId] = useState(null);
  const dropdownRef = useRef(null);

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = (id) => {
    const res = axios.patch(
      `${import.meta.env.VITE_APP_BASE_URL}/item/${id}`,
      itemUpdateData
    );
    toast.success("Item Edited Successfully!");
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
          `${import.meta.env.VITE_APP_BASE_URL}/item/${id}`
        );
        toast.success("Item Deleted Successfully!");
        location.reload();
        setEditingIndex(null);
      } catch (error) {
        toast.error("Error deleting item!");
      }
    }
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setItemUpdateData({ ...itemUpdateData, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/item`)
      .then((res) => {
        setItemData(res.data.response);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border py-5 px-4 w-full rounded-lg border-gray-300 shadow">
      <div className="bg-white w-full overflow-x-auto border rounded-lg ">
        <Toaster position="top-center" />
        <div className="overflow-y-scroll h-[500px] ">
          <table className="w-full  ">
            <thead className="bg-blue-200 text-gray-800 text-xs sm:text-xs md:text-sm">
              <tr>
                <th className="p-3 border border-gray-300">SR NO</th>
                <th className="p-3 border border-gray-300">Product Name</th>
                <th className="p-3 border border-gray-300">Product Description</th>
                <th className="p-3 border border-gray-300">Item Group</th>
                <th className="p-3 border border-gray-300">Item Category</th>
                <th className="p-3 border border-gray-300">Unit</th>
                <th className="p-3 border border-gray-300">HSN Code</th>
                <th className="p-3 border border-gray-300">Opening Stock Qunatity</th>
                <th className="p-3 border border-gray-300">Opening Stock Value</th>
                <th className="p-3 border border-gray-300">MRP</th>
                <th className="p-3 border border-gray-300">Purchase Price</th>
                <th className="p-3 border border-gray-300">Sales Price</th>
                <th className="p-3 border border-gray-300">GST</th>
                <th className="p-3 border border-gray-300">Status</th>
                <th></th>
                <th className="pr-1">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-xs md:text-sm">
              {itemData.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 text-center "
                >
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">{item.productName}</td>
                  <td className="p-2 border border-gray-300">{item.productDescription}</td>
                  <td className="p-2 border border-gray-300">{item.itemGroup}</td>
                  <td className="p-2 border border-gray-300">{item.itemCategory}</td>
                  <td className="p-2 border border-gray-300">{item.unit}</td>
                  <td className="p-2 border border-gray-300">{item.hsnCode}</td>
                  <td className="p-2 border border-gray-300">{item.stockQty}</td>
                  <td className="p-2 border border-gray-300">{item.stockValue}</td>
                  <td className="p-2 border border-gray-300">{item.mrp}</td>
                  <td className="p-2 border border-gray-300">{item.purchase}</td>
                  <td className="p-2 border border-gray-300">{item.sales}</td>
                  <td className="p-2 border border-gray-300">{item.gst}</td>
                  <td className="p-2 border border-gray-300">{item.status}</td>
                  <td ></td>
                  <td className="p-2 relative ">
                    <div className="dropdown  flex flex-col bg-white items-center ">
                      <button
                        className="flex justify-end items-center"
                        onClick={() => handleOpen(index)}
                      >
                        Action
                       { openIndex === index?<IoMdArrowDropup/>:<IoMdArrowDropdown />}
                      </button>
                      {openIndex === index && (
                        <ul className="menu  border bg-white rounded-md absolute z-10 right-0 top-[35px]" >
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
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white p-8 rounded-md flex flex-col gap-4">
                    <h2 className="text-lg font-medium mb-4">Edit Item</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-4">
                        <label
                          htmlFor="productName"
                          className="block text-sm font-medium mb-1"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="productName"
                          name="productName"
                          placeholder="Enter Product Name"
                          value={itemData[0].productName}
                          onChange={handleOnchange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="productDescription"
                          className="block text-sm font-medium mb-1"
                        >
                          Product Description
                        </label>
                        <input
                          type="text"
                          id="productDescription"
                          name="productDescription"
                          placeholder="Enter Product Description"
                          value={itemData.productDescription}
                          onChange={handleOnchange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="itemGroup"
                          className="block text-sm font-medium mb-1"
                        >
                          Item Group
                        </label>
                        <input
                          type="text"
                          id="itemGroup"
                          name="itemGroup"
                          placeholder="Enter Item Group"
                          value={itemData.itemGroup}
                          onChange={handleOnchange}
                          className="p-2 border form-input"
                        />
                      </div>
                      {itemData.map(
                        (item) =>
                          item._id === editingIndex && (
                            <div
                              key={item._id}
                              className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50"
                            >
                              <div className="bg-white p-8 rounded-md flex flex-col gap-4">
                                <h2 className="text-lg font-medium mb-4">
                                  Edit Item
                                </h2>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="mb-4">
                                    <label
                                      htmlFor="productName"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Product Name
                                    </label>
                                    <input
                                      type="text"
                                      id="productName"
                                      name="productName"
                                      placeholder="Enter Product Name"
                                      value={itemData.productName}
                                      defaultValue={item.productName}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="productDescription"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Product Description
                                    </label>
                                    <input
                                      type="text"
                                      id="productDescription"
                                      name="productDescription"
                                      placeholder="Enter Product Description"
                                      value={itemData.productDescription}
                                      defaultValue={item.productDescription}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="itemGroup"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Item Group
                                    </label>
                                    <input
                                      type="text"
                                      id="itemGroup"
                                      name="itemGroup"
                                      placeholder="Enter Item Group"
                                      value={itemData.itemGroup}
                                      defaultValue={item.itemGroup}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="itemCategory"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Item Category
                                    </label>
                                    <input
                                      type="text"
                                      id="itemCategory"
                                      name="itemCategory"
                                      placeholder="Enter Item Category"
                                      defaultValue={item.itemCategory}
                                      value={itemData.itemCategory}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="unit"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Item Unit
                                    </label>
                                    <input
                                      type="text"
                                      id="unit"
                                      name="unit"
                                      placeholder="Enter Item Unit"
                                      defaultValue={item.unit}
                                      value={itemData.unit}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="hsnCode"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      HSN Code
                                    </label>
                                    <input
                                      type="text"
                                      id="hsnCode"
                                      name="hsnCode"
                                      placeholder="Enter HSN Code"
                                      defaultValue={item.hsnCode}
                                      value={itemData.hsnCode}
                                      onChange={handleOnchange}
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="stockQty"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Stock Qty
                                    </label>
                                    <input
                                      type="text"
                                      id="stockQty"
                                      name="stockQty"
                                      placeholder="Enter Stock Qty"
                                      defaultValue={item.stockQty}
                                      value={itemData.stockQty}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="stockValue"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Stock Value
                                    </label>
                                    <input
                                      type="text"
                                      id="stockValue"
                                      name="stockValue"
                                      placeholder="Enter Stock Value"
                                      defaultValue={item.stockValue}
                                      value={itemData.stockValue}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="mrp"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      MRP
                                    </label>
                                    <input
                                      type="text"
                                      id="mrp"
                                      name="mrp"
                                      placeholder="Enter MRP"
                                      defaultValue={item.mrp}
                                      value={itemData.mrp}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="purchase"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Purchase
                                    </label>
                                    <input
                                      type="text"
                                      id="purchase"
                                      name="purchase"
                                      placeholder="Enter Purchase"
                                      defaultValue={item.purchase}
                                      value={itemData.purchase}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="sales"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      sales
                                    </label>
                                    <input
                                      type="text"
                                      id="sales"
                                      name="sales"
                                      placeholder="Enter Sales"
                                      defaultValue={item.sales}
                                      value={itemData.sales}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="gst"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      GST
                                    </label>
                                    <input
                                      type="text"
                                      id="gst"
                                      name="gst"
                                      placeholder="Enter GST"
                                      value={itemData.gst}
                                      defaultValue={item.gst}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <label
                                      htmlFor="status"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Stock Value
                                    </label>
                                    <input
                                      type="text"
                                      id="status"
                                      name="status"
                                      placeholder="Enter Status"
                                      defaultValue={item.status}
                                      value={itemData.status}
                                      onChange={(e) =>
                                        handleOnchange(e, item._id)
                                      }
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <button
                                    className="bg-blue-500 text-white px-4 py-2 mr-2"
                                    onClick={() => handleSaveClick(item._id)}
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
                          )
                      )}
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
