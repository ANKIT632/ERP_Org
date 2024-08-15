import { AiFillPrinter, AiFillDelete, AiFillEdit } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
export default function AllPurchaseOrder() {
  const [itemData, setItemData] = useState([]);
  const [itemUpdateData, setItemUpdateData] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/purchaseOrder`)
      .then((res) => {
        setItemData(res.data.response);
        console.log(res.data.response, "itemData");
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/item`
        );
        console.log("Product items:", res.data.response);
        setProductData(res.data.response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchProductData();
  }, []);

  const handleSaveClick = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/purchaseOrder/${itemId}`,
        itemUpdateData
      );
      toast.success("Purchase Edited Successfully!");
      // Update the item data after editing
      setItemData((prevData) =>
        prevData.map((item) =>
          item._id === itemId ? { ...item, ...itemUpdateData } : item
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating purchase:", error);
      toast.error("Failed to edit purchase.");
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this purchase?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/purchaseOrder/${id}`
        );
        toast.success("Purchase Deleted Successfully!");
        setItemData((prevData) => prevData.filter((item) => item._id !== id));
        setEditingIndex(null);
      } catch (error) {
        toast.error("Error deleting purchase!");
      }
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setItemUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = (index, item) => {
    setEditingIndex(index);
    setItemId(item._id);
    setItemUpdateData(item);
    setShowModal(true);
  };

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border py-5 px-4 w-full rounded-lg border-gray-300 shadow">
      <div className="bg-white w-full overflow-x-auto rounded-lg border">
        <Toaster position="top-center" />
        <div>
          <table className="w-full border rounded-md">
            <thead className="bg-blue-200 text-gray-800 text-xs sm:text-xs md:text-sm">
              <tr className="border-b border-gray-300 p-4">
                <th className="p-3 border border-gray-300">SR NO</th>
                <th className="p-3 border border-gray-300">Date</th>
                <th className="p-3 border border-gray-300">Po No</th>
                <th className="p-3 border border-gray-300">Vendor</th>
                <th className="p-3 border border-gray-300">GSTIN/UIN</th>
                <th className="p-3 border border-gray-300">Quotation Number</th>
                <th className="p-3 border border-gray-300">Quotation Ref</th>
                <th className="p-3 border border-gray-300">Total Gst</th>
                <th className="p-3 border border-gray-300">Total Amount</th>
                <th className="p-3 border border-gray-300">Status</th>
                <th className="p-3 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-xs md:text-sm">
              {itemData.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 text-center"
                >
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">{item.poDate}</td>
                  <td className="p-2 border border-gray-300">
                    {item.poNumber}
                  </td>
                  <td className="p-2 border border-gray-300">{item.vendor}</td>
                  <td className="p-2 border border-gray-300">{item.gstin}</td>
                  <td className="p-2 border border-gray-300">{item.quotationNo}</td>
                  <td className="p-2 border border-gray-300">{item.quotationRef}</td>
                  <td className="p-2 border border-gray-300">{item.totalGst}</td>
                  <td className="p-2 border border-gray-300">{item.totalAmount}</td>
                  <td className="p-2 border border-gray-300">{item.status}</td>
                  <td>
                    <div className="dropdown flex flex-col bg-white items-center relative">
                      <button
                        className="flex justify-end items-center"
                        onClick={() => handleOpen(index)}
                      >
                        Action
                        {openIndex === index ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                      </button>
                      {openIndex === index && (
                        <ul className="menu border bg-white  rounded-md absolute right-0 top-[28px] z-10">
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => handleDeleteClick(item._id)}
                            >
                              <AiFillDelete /> Delete
                            </button>
                          </li>
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => handleEditClick(index, item)}
                            >
                              <AiFillEdit /> Edit
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {/* show action */}
              {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                  <div className="bg-white p-8 rounded-md flex flex-col gap-4">
                    <h2 className="text-lg font-medium mb-4">Edit Purchase Order</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-4">
                        <label
                          htmlFor="vendorName"
                          className="block text-sm font-medium mb-1"
                        >
                          Vendor Name
                        </label>
                        <input
                          type="text"
                          id="vendorName"
                          name="vendorName"
                          placeholder="Enter Vendor Name"
                          value={itemUpdateData.vendorName || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="mobileNo"
                          className="block text-sm font-medium mb-1"
                        >
                          Mobile No
                        </label>
                        <input
                          type="text"
                          id="mobileNo"
                          name="mobileNo"
                          placeholder="Enter Mobile No"
                          value={itemUpdateData.mobileNo || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          value={itemUpdateData.email || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="poNumber"
                          className="block text-sm font-medium mb-1"
                        >
                          PO No
                        </label>
                        <input
                          type="text"
                          id="poNumber"
                          name="poNumber"
                          placeholder="Enter PO No"
                          value={itemUpdateData.poNumber || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="quotationNo"
                          className="block text-sm font-medium mb-1"
                        >
                          Quotation No
                        </label>
                        <input
                          type="text"
                          id="quotationNo"
                          name="quotationNo"
                          placeholder="Enter Quotation No"
                          value={itemUpdateData.quotationNo || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="quotationRef"
                          className="block text-sm font-medium mb-1"
                        >
                          Quotation Ref
                        </label>
                        <input
                          type="text"
                          id="quotationRef"
                          name="quotationRef"
                          placeholder="Enter Quotation Ref"
                          value={itemUpdateData.quotationRef || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
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
                          value={itemUpdateData.productName || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="productQty"
                          className="block text-sm font-medium mb-1"
                        >
                          Product QTY
                        </label>
                        <input
                          type="text"
                          id="productQty"
                          name="productQty"
                          placeholder="Enter Product QTY"
                          value={itemUpdateData.productQty || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="productRate"
                          className="block text-sm font-medium mb-1"
                        >
                          Product Rate
                        </label>
                        <input
                          type="text"
                          id="productRate"
                          name="productRate"
                          placeholder="Enter Product Rate"
                          value={itemUpdateData.productRate || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="productDisc"
                          className="block text-sm font-medium mb-1"
                        >
                          Product Disc
                        </label>
                        <input
                          type="text"
                          id="productDisc"
                          name="productDisc"
                          placeholder="Enter Product Disc"
                          value={itemUpdateData.productDisc || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="productAmount"
                          className="block text-sm font-medium mb-1"
                        >
                          Product Amount
                        </label>
                        <input
                          type="text"
                          id="productAmount"
                          name="productAmount"
                          placeholder="Enter Product Amount"
                          value={itemUpdateData.productAmount || ''}
                          onChange={handleOnChange}
                          className="p-2 border form-input"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 mr-2"
                        onClick={handleSaveClick}
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