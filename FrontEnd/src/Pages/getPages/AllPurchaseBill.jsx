import { AiFillPrinter, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ReactToPrint } from "react-to-print";

export default function AllPurchaseBill() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [editedInvoiceData, setEditedInvoiceData] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const [itemId, setItemId] = useState(null);
  const [filterInvoiceData, setFilterInvoiceData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const componentRef = useRef(null);

  const handleSaveClick = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/sales-invoice/${
          editedInvoiceData._id
        }`,
        editedInvoiceData
      );
      toast.success("Sales Invoice Edited Successfully!");
      location.reload();
      setEditingIndex(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("Failed to edit sales invoice");
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/sales-invoice`)
      .then((res) => {
        setInvoiceData(res.data.response);
        const filteredData = res.data.response.filter(
          (invoice) => invoice._id === editingIndex
        );
        setFilterInvoiceData(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [editingIndex]);

  const handleEditClick = (index, invoice) => {
    setEditingIndex(index);
    setEditedInvoiceData(invoice);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/sales-invoice/${id}`
        );
        toast.success("invoice Deleted Successfully!");
        location.reload();
        setEditingIndex(null);
      } catch (error) {
        toast.error("Error deleting item!");
      }
    }
  };

  // const handlePrintInvoice = () => {
  //   handlePrint();
  // };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setEditedInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...editedInvoiceData.products];
    updatedProducts[index][name] = value;
    setEditedInvoiceData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));
  };



  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border py-5 px-4 w-full rounded-lg border-gray-300 shadow">
      <div className="bg-white w-full overflow-x-auto rounded-lg border">
        <Toaster />
        <div>
          <table className="w-full border rounded-md">
            <thead className="bg-blue-200 text-gray-800 text-sm sm:text-xs md:text-sm">
              <tr className="border-b border-gray-300 p-4">
                <th className="p-3  border border-gray-300">SR NO</th>
                <th className="p-3  border border-gray-300" >Vendor</th>
                <th className="p-3  border border-gray-300" >Email</th>
                <th className="p-3  border border-gray-300" >Mobile No</th>
                <th className="p-3  border border-gray-300" >PO No</th>
                <th className="p-3  border border-gray-300">Bill NO</th>
                <th className="p-3  border border-gray-300">Bill Data</th>
                <th className="p-3  border border-gray-300">Due Date</th>
                <th className="p-3  border border-gray-300">Terms (Days)</th>
                <th className="p-3  border border-gray-300">Book</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-xs md:text-sm">
              {invoiceData.map((invoice, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-center"
                >
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">{invoice.invoiceDate.split("T")[0]}</td>
                  <td className="p-2 border border-gray-300">INV{invoice.invoiceNumber + 1}</td>
                  <td className="p-2 border border-gray-300">{invoice.customerName}</td>
                  <td className="p-2 border border-gray-300">{invoice.taxAmount}</td>
                  <td className="p-2 border border-gray-300">{invoice.totalAmount}</td>
                  <td className="p-2 border border-gray-300">{invoice.isPaid ? "paid" : "UnPaid"}</td>
                  <td>
                    <span className="">1</span>
                  </td>
                  <td>
                    <span className="">2</span>
                  </td>
                  <td>
                    <span className="">3</span>
                  </td>
                  <td>
                    <div
                      className="dropdown flex flex-col bg-white  relative"
                     
                    >
                      <button
                        className="flex  items-center"
                        onClick={() => handleOpen(index)}
                      >
                        Action
                        <IoMdArrowDropdown />
                      </button>
                      {openIndex === index && (
                        <ul className="menu  border bg-white mt-6  rounded-md absolute top-2 right-0 z-10">
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => handleDelete(invoice._id)}
                            >
                              <AiFillDelete /> Delete{" "}
                            </button>
                          </li>
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => {
                                setShowPrintModal(!showPrintModal);
                                setEditingIndex(invoice._id);
                              }}
                            >
                              {" "}
                              <AiFillPrinter /> Print
                            </button>
                          </li>
                          <li className="menu-item hover:bg-blue-300">
                            <button
                              className="flex justify-center items-center gap-4 px-4 py-1"
                              onClick={() => handleEditClick(index, invoice)}
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


              {/* Edit  of action */}

              {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-20 overflow-y-auto ">
                  <div className="bg-white p-8 rounded-md flex flex-col gap-4">
                    <h2 className="text-xl font-medium ">
                      Edit Purchase Bill
                    </h2>
                    <div className="grid grid-cols-3 max-xs:grid-cols-1  max-sm:grid-cols-2 gap-2">
                      <div className=" flex flex-col">
                        <label
                          htmlFor="customerName"
                          className="block text-sm font-medium mb-1"
                        >
                          Vendor Info.
                        </label>
                        <input
                          type="text"
                          id="customerName"
                          name="customerName"
                          placeholder="Enter customer name"
                          value={editedInvoiceData.customerName}
                          onChange={handleOnchange}
                          className="p-2 border form-input"
                        />
                      </div>

                      <div className="flex flex-col">
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
                          value={invoiceData.phone}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>


                      <div className="flex flex-col">
                        <label
                          htmlFor="Bill"
                          className="block text-sm font-medium mb-1"
                        >
                          Bill No.
                        </label>
                        <input
                          type="text"
                          id="Bill"
                          name="Bill"
                          placeholder="Bill No"
                          value={invoiceData.phone}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>



                      <div className="flex flex-col">
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
                          value={invoiceData.email}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="Po No."
                          className="block text-sm font-medium mb-1"
                        >
                          Po No.
                        </label>
                        <input
                          type="text"
                          id="Po No."
                          name="Po No."
                          placeholder="Po No."
                          value={invoiceData.email}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>
                        
                      <div className="flex flex-col">
                        <label
                          htmlFor="Terms"
                          className="block text-sm font-medium mb-1"
                        >
                          Terms (Days) No.
                        </label>
                        <input
                          type="text"
                          id="Terms"
                          name="Terms"
                          placeholder="Terms (Days)"
                          value={invoiceData.phone}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="Due Date"
                          className="block text-sm font-medium mb-1"
                        >
                          Due Date 
                        </label>
                        <input
                          type="Date"
                          id="Due Date"
                          name="Due Date"
                          value={invoiceData.phone}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>

                      
                      <div className="flex flex-col">
                        <label
                          htmlFor="Bill Date"
                          className="block text-sm font-medium mb-1"
                        >
                          Bill Date 
                        </label>
                        <input
                          type="Date"
                          id="Bill Date"
                          name="Bill Date"
                          value={invoiceData.phone}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>

                      
                      <div className="flex flex-col">
                        <label
                          htmlFor="Book"
                          className="block text-sm font-medium mb-1"
                        >
                          Book 
                        </label>
                        <input
                          type="text"
                          id="Book"
                          name="Book"
                          placeholder="please select book"
                          value={invoiceData.phone}
                          onChange={handleOnchange}
                          className="p-2 border form-input "
                        />
                      </div>

                    
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <h2 className="text-xl font-semibold">PRODUCT/SERVICE</h2>
                    </div>
                    {editedInvoiceData.products &&
                      editedInvoiceData.products.map(
                        (product, productIndex) => (
                          <div
                            key={productIndex}
                            className="grid max-xs:grid-cols-1 max-sm:grid-cols-2 grid-cols-3 gap-2 mb-4"
                          >
                            <div className="flex flex-col gap-1">
                              <label className="font-semibold text-sm">
                                Product / Service Name
                              </label>
                              <input
                                className="form-input"
                                type="text"
                                placeholder="Enter Product Name"
                                name="productName"
                                value={product.productName}
                                onChange={(e) =>
                                  handleProductChange(e, productIndex)
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="font-semibold text-sm">
                                Quantity
                              </label>
                              <input
                                className="form-input"
                                type="number"
                                placeholder="QTY"
                                name="productQuantity"
                                value={product.productQuantity}
                                onChange={(e) =>
                                  handleProductChange(e, productIndex)
                                }
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="font-semibold text-sm">
                                Rate
                              </label>
                              <input
                                className="form-input"
                                type="number"
                                placeholder="RATE"
                                name="productAmount"
                                value={product.productAmount}
                                onChange={(e) =>
                                  handleProductChange(e, productIndex)
                                }
                              />
                            </div>
                          </div>
                        )
                      )}
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white px-4 py-2 mr-2"
                        onClick={() => handleSaveClick(itemId)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-200 hover:text-white hover:bg-gray-400 active:bg-gray-200 px-4 py-2"
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


     {/* print  of action*/}
          {showPrintModal && (
             <div
             className="fixed inset-0 z-20   bg-[#0005] backdrop-blur-sm    overflow-y-auto "
             onClick={(e) => {
               if (e.target === e.currentTarget) {
                 setShowPrintModal(false);
               }
             }}
           >
              <div className=" shadow-lg max-w-4xl mx-auto border rounded-md bg-white p-2">
                <div ref={componentRef}>
                  {filterInvoiceData.length > 0 && (
                    <div className="p-4">
                      <div className="grid max-sm:grid-cols-2 grid-cols-3 gap-4 mb-4">
                        <div className="">
                          <h1 className="text-xl font-bold ">
                            KNOWIFY GLOBAL INFOSOLUTIONS PRIVATE LIMITED
                          </h1>
                          <p className="text-sm">
                            Address: Plot No. 312, Swastic Grand NCS No 645,
                            G/Sushila Prasad, Andherdev Marg, Jabalpur,
                            JABALPUR, MADHYA PRADESH, 482002
                          </p>
                          <p className="text-sm">
                            Email: info@knowifycapital.com
                          </p>
                          <p className="text-sm">Mobile: 788093480</p>
                          <p className="text-sm font-bold">
                            GSTIN: 23AAJCK8156D1ZK
                          </p>
                          <p className="text-sm font-bold">
                            Bill to: Cash Sales MADHYA PRADESH
                          </p>
                          <p className="text-sm">Country: India</p>
                        </div>
                        
                        <div >
                        
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Tax Invoice</h2>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-bold">Invoice Number</h3>
                              <p>{filterInvoiceData[0].invoiceNumber}</p>
                            </div>
                            <div>
                              <h3 className="font-bold">Invoice Date</h3>
                              <p>{filterInvoiceData[0].createdAt}</p>
                            </div>
                            <div></div>
                            <div>
                              <h3 className="font-bold">
                                Ship to: {filterInvoiceData[0].customerName}
                              </h3>
                              <p>MADHYA PRADESH</p>
                              <p>Place Of Supply: 23-MADHYA PRADESH</p>
                              <p>Country: India</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                      <table className="overflow-x-auto">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2">Sr no.</th>
                            <th className="border px-4 py-2">
                              Product/Service
                            </th>
                            <th className="border px-4 py-2">HSN/SAC</th>
                            <th className="border px-4 py-2">Qty</th>
                            <th className="border px-4 py-2">Rate</th>
                            <th className="border px-4 py-2">Discount</th>
                            <th className="border px-4 py-2">Taxable Amt</th>
                            <th className="border px-4 py-2">Tax</th>
                            <th className="border px-4 py-2">Total (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterInvoiceData.map((invoice, index) => (
                            <tr key={index}>
                              <td className="border px-4 py-2 ">{index + 1}</td>
                              {invoice.products.map((product, productIndex) => (
                                <React.Fragment key={productIndex}>
                                  <td className="border px-4 py-2">
                                    {product.productName}
                                  </td>
                                  <td className="border px-4 py-2">{"34"}</td>
                                  <td className="border px-4 py-2">
                                    {product.productQuantity}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {product.productRate}
                                  </td>
                                </React.Fragment>
                              ))}
                              <td className="border px-4 py-2">
                                {invoice.discount}
                              </td>
                              <td className="border px-4 py-2">
                                {invoice.taxAmount}
                              </td>
                              <td className="border px-4 py-2">
                                {invoice.taxPercentage}
                              </td>
                              <td className="border px-4 py-2">
                                {invoice.totalAmount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      </div>

                      <div className="flex justify-between items-center border-t mt-2 pt-2">
                        <p>Sub Total</p>

                        <p>{filterInvoiceData[0].subTotal}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t mt-2 pt-2">
                        <div>
                          <p>Taxable Amt</p>
                          <p>CGST</p>
                          <p>SGST</p>
                          <p className="font-bold">Total Amount(₹)</p>
                          <p className="font-bold">Is Paid</p>
                        </div>
                        <div className="text-right">
                          <p>{filterInvoiceData[0].taxAmount}</p>
                          <p>0.00</p>
                          <p>0.00</p>
                          <p>{filterInvoiceData[0].totalAmount}</p>
                          <p>
                            {filterInvoiceData[0].isPaid === true
                              ? "Paid"
                              : "UnPaid"}
                          </p>
                        </div>
                      </div>

                    <div className="overflow-x-auto">
                      <table className="border-t mt-2 pt-2 w-full ">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2">HSN/SAC</th>
                            <th className="border px-4 py-2">Taxable Amt(₹)</th>
                            <th className="border px-4 py-2">IGST</th>
                            <th className="border px-4 py-2">CGST</th>
                            <th className="border px-4 py-2">SGST</th>
                            <th className="border px-4 py-2">CESS</th>
                            <th className="border px-4 py-2">
                              Total Tax Amt(₹)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2">4545</td>
                            <td className="border px-4 py-2">10.00</td>
                            <td className="border px-4 py-2">0%</td>
                            <td className="border px-4 py-2">0.00</td>
                            <td className="border px-4 py-2">0%</td>
                            <td className="border px-4 py-2">0.00</td>
                            <td className="border px-4 py-2">0%</td>
                            <td className="border px-4 py-2">0.00</td>
                            <td className="border px-4 py-2">0.00</td>
                          </tr>
                        </tbody>
                      </table>
                     </div> 
                      <p className="text-center font-bold mt-4">
                        For, KNOWIFY GLOBAL INFOSOLUTIONS PRIVATE LIMITED
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-end">
                  <ReactToPrint
                    trigger={() => (
                      <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white px-4 py-2 mr-2">
                        Print
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                  <button
                    className="bg-gray-200 text-gray-800 hover:text-white hover:bg-gray-400 active:bg-gray-200 px-4 py-2"
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
