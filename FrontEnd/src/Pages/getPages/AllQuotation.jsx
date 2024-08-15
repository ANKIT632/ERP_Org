import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { AiFillPrinter } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ReactToPrint } from "react-to-print";

export default function AllQuotation() {
  const [quotationData, setQuotationData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [customerUpdateData, setCustomerUpdateData] = useState({
    customerName: "",
  });
  const [filterQuotationData, setFilterQuotationData] = useState([]);

  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const componentRef = useRef(null);



  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = (id) => {
    const res = axios.patch(
      `${import.meta.env.VITE_APP_BASE_URL}/quotation/${id}`,
      customerUpdateData
    );

    toast.success("Customer Edited Successfully!");
    setEditingIndex(null);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setCustomerUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/Quotation/${id}`
        );
        toast.success("Customer Deleted Successfully!");

        setEditingIndex(null);
      } catch (error) {
        toast.error("Error deleting item!");
      }
    }
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...data.products];
    updatedProducts[index][name] = value;
    setData({ ...data, products: updatedProducts });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/getAllQuotation`)
      .then((res) => {
        setQuotationData(res.data.data);
        const filteredData = res.data.data.filter(
          (quotaiton) => quotaiton._id === editingIndex
        );
        setFilterQuotationData(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [editingIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border py-5 px-4 w-full rounded-lg border-gray-300 shadow">
      <div className="bg-white w-full overflow-x-auto">
        <Toaster />
        <div className="">
          <table className="w-full border rounded-md shadow-md ">
            <thead className="bg-blue-200 text-gray-800 text-sm">
              <tr className="border-b border-gray-300 ">
                <th className="p-3 whitespace-nowrap">SR NO</th>
                <th className="max-sm:px-2 whitespace-nowrap">quotationDate</th>
                <th className="max-sm:px-2 whitespace-nowrap">quotationNo</th>
                <th className="max-sm:px-2 whitespace-nowrap">Customer Name</th>
                <th className="max-sm:px-2 whitespace-nowrap">Customer Mobile</th>
                <th className="max-sm:px-2 whitespace-nowrap">Due Date</th>
                <th className="max-sm:px-2 whitespace-nowrap">Sub Total</th>
                <th className="max-sm:px-2 whitespace-nowrap">Total Amount(₹)</th>
                <th className="max-sm:px-2 whitespace-nowrap">Total GST (₹)</th>
                <th className="max-sm:px-2 whitespace-nowrap"> </th>
                <th className="max-sm:px-2 whitespace-nowrap">Actions</th>
                <th className="max-sm:px-2 whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="self">
              {quotationData.map((quotation, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-center"
                >
                  <td className="p-1">{index + 1}</td>
                  <td className="">
                    {quotation.quotationDate &&
                      quotation.quotationDate.split("T")[0]}
                  </td>
                  <td className="">{quotation.quotationNo}</td>
                  <td className="">{quotation.customerName}</td>
                  <td className="">{quotation.customerMobile}</td>
                  <td className="">
                    {quotation.validQuotationDate &&
                      quotation.validQuotationDate.split("T")[0]}
                  </td>
                  <td className="">{quotation.subtotal}</td>
                  <td className="">{quotation.totalAmount}</td>
                  <td className="">{quotation.tax}</td>
                  <td className="">
                    <span className=""></span>
                  </td>
                  <td>
                    <div
                      className="dropdown  flex flex-col bg-white items-center relative px-3"
                      useRef={componentRef}
                    >
                      <button
                        className="flex justify-end items-center"
                        onClick={() => handleOpen(index)}
                      >
                        Action
                        {openIndex === index ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                      </button>
                      {openIndex === index && (
                        <ul className="menu  border bg-white  rounded-md absolute right-0 top-[35px] z-10" onClick={() => handleOpen(index)}>
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => handleDeleteClick(quotation._id)}
                            >
                              <AiFillDelete /> Delete{" "}
                            </button>
                          </li>
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => {
                                // handlePrint()
                                setShowPrintModal(!showPrintModal);
                                setEditingIndex(quotation._id);
                              }}
                            >
                              {" "}
                              <AiFillPrinter /> Print
                            </button>
                          </li>
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => {
                                setShowModal(true);
                                handleEditClick(quotation._id);
                                setItemId(customer._id);
                              }}
                            >
                              <AiFillEdit />
                              Edit
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 ">
                  <div className="bg-white p-8 rounded-md flex flex-col gap-4 w-[80vw]">
                    <h2 className="text-lg font-medium mb-4">Edit Quotation</h2>

                    <div>
                      {quotationData &&
                        quotationData.map((quotation, quotationIndex) => (
                          <>
                            {editingIndex === quotation._id && (
                              <div key={quotation._id}>
                                {/* Render the rest of the content */}
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="mb-4">
                                    <label
                                      htmlFor="customerName"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Customer Name
                                    </label>
                                    <input
                                      type="text"
                                      id="customerName"
                                      name="customerName"
                                      placeholder="Enter account name"
                                      value={quotationData.customerName}
                                      defaultValue={quotation.customerName}
                                      onChange={handleOnchange}
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="customerEmail"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      id="customerEmail"
                                      name="email"
                                      placeholder="example@domain.com"
                                      value={quotationData.customerEmail}
                                      defaultValue={quotation.customerEmail}
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
                                      value={quotationData.customerMobile}
                                      defaultValue={quotation.customerMobile}
                                      onChange={handleOnchange}
                                      className="p-2 border form-input "
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <label
                                      htmlFor="pan"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Quotation NO.
                                    </label>
                                    <input
                                      type="number"
                                      id="quotationNo"
                                      name="quotationNo"
                                      placeholder="Quotation No."
                                      value={quotationData.quotationNo}
                                      defaultValue={quotation.quotationNo}
                                      onChange={handleOnchange}
                                      className="p-2 border form-input "
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="address1"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Quotation Date
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="date"
                                      id="quotationDate"
                                      name="quotationDate"
                                      placeholder="Floor No., Building Name"
                                      value={quotationData.quotationDate}
                                      defaultValue={quotation.quotationDate}
                                      onChange={handleOnchange}
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="address1"
                                      className="block text-sm font-medium mb-1"
                                    >
                                      Valid Quotation Date
                                      <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="date"
                                      id="validQuotationDate"
                                      name="validQuotationDate"
                                      placeholder="Valid Quotation Date"
                                      value={quotationData.validQuotationDate}
                                      defaultValue={
                                        quotation.validQuotationDate
                                      }
                                      onChange={handleOnchange}
                                      className="p-2 border form-input"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                  <h2 className="text-xl font-semibold">
                                    PRODUCT/SERVICE
                                  </h2>
                                </div>
                                {quotation.products.map(
                                  (product, productIndex) =>
                                    product.productName && (
                                      <div
                                        key={product._id}
                                        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4"
                                      >
                                        <div className="">
                                          <label
                                            htmlFor=""
                                          className="font-semibold text-xs"
                                          >
                                            Product / Service Name
                                          </label>
                                          <input
                                            className="p-2 border form-input"
                                            type="text"
                                            placeholder="Enter Product Name"
                                            name="productName"
                                            value={product.productName}
                                            onChange={(e) =>
                                              handleProductChange(
                                                e,
                                                quotationIndex,
                                                productIndex
                                              )
                                            }
                                          />
                                        </div>
                                        <div>
                                          <label
                                            htmlFor=""
                                            className="font-semibold text-xs"
                                          >
                                            Quantity
                                          </label>
                                          <input
                                            className="p-2 border form-input"
                                            type="number"
                                            placeholder="QTY"
                                            name="productQuantity"
                                            value={product.productQuantity}
                                            onChange={(e) =>
                                              handleProductChange(
                                                e,
                                                quotationIndex,
                                                productIndex
                                              )
                                            }
                                          />
                                        </div>
                                        <div>
                                          <label
                                            htmlFor=""
                                            className="font-semibold text-xs"
                                          >
                                            Rate
                                          </label>
                                          <input
                                            className="p-2 border form-input"
                                            type="number"
                                            placeholder="RATE"
                                            name="productAmount"
                                            value={product.productAmount}
                                            onChange={(e) =>
                                              handleProductChange(
                                                e,
                                                quotationIndex,
                                                productIndex
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                    )
                                )}
                              </div>
                            )}
                          </>
                        ))}

                      <div className="flex justify-end">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 mr-2"
                          onClick={() => handleSaveClick(editingIndex)}
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
                  {/* Add other form fields here */}
                </div>
              )}
            </tbody>
          </table>
          {showPrintModal && (
            <div
              className="fixed top-0 left-0 z-50  w-full h-screen bg-[#0005] backdrop-blur-sm flex justify-center items-center"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowPrintModal(false);
                }
              }}
            >
              <div className="shadow-lg max-w-6xl w-full mx-auto border rounded-md bg-white p-2">
                <div ref={componentRef} className="p-4">
                  {filterQuotationData.length > 0 && (
                    <>
                      <div className="max-w-4xl mx-auto my-8 p-4">
                        <div className="flex justify-between mb-4">
                          <div>
                            <h1 className="text-xl font-bold">
                              KNOWIFY GLOBAL INFOSOLUTIONS PRIVATE LIMITED
                            </h1>
                            <p className="text-sm">
                              Address: Plot No. 312, Jabalpur, JABALPUR, MADHYA
                              PRADESH, 482002
                            </p>
                            <p className="text-sm">GSTIN: 23AAJCK8156D1ZK</p>
                            <p className="text-sm">
                              Email: info@knowifycapital.com
                            </p>
                            <p className="text-sm">Mobile: 7880398480</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">
                              Quotation No.: Q
                              {filterQuotationData[0].quotationNo}
                            </p>
                            <p className="text-sm">
                              Quotation Date:{" "}
                              {
                                filterQuotationData[0].quotationDate.split(
                                  "T"
                                )[0]
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between mb-4">
                          <div>
                            <h2 className="font-bold">Bill To</h2>
                            <p className="text-sm">
                              {filterQuotationData[0].customerName}
                            </p>
                            <p className="text-sm">
                              {filterQuotationData[0].customerEmail}
                            </p>
                            <p className="text-sm">
                              {filterQuotationData[0].customerMobile}
                            </p>
                          </div>
                        </div>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border px-4 py-2">Sr no.</th>
                              <th className="border px-4 py-2">
                                Product/Service
                              </th>
                              <th className="border px-4 py-2">Qty</th>
                              <th className="border px-4 py-2">Rate(₹)</th>
                              <th className="border px-4 py-2">GST</th>
                              <th className="border px-4 py-2">Amount(₹)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterQuotationData[0].products &&
                              filterQuotationData[0].products.map(
                                (product, index) => (
                                  <tr key={index}>
                                    <td className="border px-4 py-2">
                                      {index + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                      {product.productName}
                                    </td>
                                    <td className="border px-4 py-2">
                                      {product.productQuantity}
                                    </td>
                                    <td className="border px-4 py-2">
                                      {product.productAmount}
                                    </td>
                                    <td className="border px-4 py-2">
                                      {filterQuotationData[0].tax}
                                    </td>
                                    <td className="border px-4 py-2">
                                      {product.productQuantity *
                                        product.productAmount}
                                    </td>
                                  </tr>
                                )
                              )}

                            <tr>
                              <td className="border"></td>
                              <td className="border"></td>
                              <td
                                className="border px-4 py-2 text-right"
                                colSpan="3"
                              >
                                TOTAL
                              </td>
                              <td className="border px-4 py-2">
                                {filterQuotationData[0].subtotal}
                              </td>
                              <td className="border"></td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex justify-end items-center mt-4">
                          <div className="text-end">
                            <p className="text-sm">Invoice Amount</p>
                            <p className="text-sm font-semibold">
                              {filterQuotationData[0].totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="text-end">
                  <ReactToPrint
                    trigger={() => (
                      <button className="bg-blue-500 text-white px-4 py-2 mr-2">
                        Print
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2"
                    onClick={() => setShowPrintModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
