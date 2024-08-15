import React, { useState, useEffect , useRef } from "react";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { AiFillPrinter } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import AllSaleInvoices from "./getPages/AllSaleInvoices";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

const toastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "dark",
};


export default function SalesInvoice() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [autoRoundOff, setAutoRoundOff] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [currency, setCurrency] = useState("$");
  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const componentRef = useRef(null);
  const [data, setData] = useState({
    customerName: "",
    customerDetails: {},
    gstin: "",
    phone: "",
    email: "",
    book: "",
    seriesName: "",
    invoiceNumber: "",
    terms: "",
    date: new Date(),
    quotationNumber: 0,
    products: [
      {
        productName: "",
        productQuantity: 1,
        productAmount: 0,
        productRate: "",
      },
    ],
    note: "",
    discount: "",
    taxPercentage: 0,
    taxAmount: 0,
    subTotal: 0,
    totalAmount : 0,
    isPaid: true,
  });

  console.log(data.customerDetails , "oddddddddddddddddddddddddddddddddd")
  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/customer`);
        setCustomerData(res.data.response);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
    fetchCustomerData();
  }, []);

  const handleCustomerChanges = (e) => {
    setSelectedCustomer(e.target.value);
    const selectedCustomerObject = customerData.find(
      (customer) => customer.accountName === e.target.value
    );
    setCustomerName(
      selectedCustomerObject ? selectedCustomerObject.accountName : ""
    );
    setCustomerId(
      selectedCustomerObject ? selectedCustomerObject._id : ""
    );
    setData((prevData) => ({
      ...prevData,
      customerName: selectedCustomerObject
        ? selectedCustomerObject.accountName
        : "",
      customerDetails: selectedCustomerObject
        ? selectedCustomerObject._id
        : {},
    }));
  };

  useEffect(() => {
    async function fetchProductData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/item`);
        console.log("Product data:", res.data.response);
        setProductData(res.data.response);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
    fetchProductData();
  }, []);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    const selectedProductObject = productData.find(
      (product) => product.productName === e.target.value
    );
    setData((prevData) => ({
      ...prevData,
      products: [
        {
          ...prevData.products[0],
          productName: selectedProductObject
            ? selectedProductObject.productName
            : "",
        },
      ],
    }));
  };

  const [rows, setRows] = useState([
    {
      id: 1,
      productName: "",
      productQuantity: "",
      productRate: "",
      productAmount: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(data, "data");

  const removeRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const addRow = (e) => {
    e.preventDefault();
    const newRow = {
      id: rows.length + 1,
      productName: "",
      productQuantity: "",
      productAmount: "",
      productRate: "",
    };
    setRows([...rows, newRow]);
    setData({
      ...data,
      products: [
        ...data.products,
        {
          productName: "",
          productQuantity: "",
          productAmount: "",
          productRate: "",
        },
      ],
    });
  };

  const handleSubmission = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/sales-invoice`,
        data,
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Successfully submitted the form");
      toast.success("Sales Invoice created successfully", toastOptions);
      setShowModal(false);
    } catch (error) {
      console.log(error, "error");
      toast.error("quotation created unsuccessfully.", toastOptions);
    }
  };

  useEffect(() => {
    // Calculate subtotal
    const subTotal = data.products.reduce((acc, product) => acc + product.productAmount * product.productQuantity, 0);

    // Calculate discount amount in Rs
    const discountAmount = (subTotal * data.discount) / 100;

    // Calculate tax amount in Rs
    const taxAmount = (subTotal * data.taxPercentage) / 100;

    // Calculate total
    const totalAmount = subTotal + taxAmount - discountAmount;

    // Update state with calculated values
    // Update state with calculated values
    setData((prevData) => ({
      ...prevData,
      subTotal,
      discountAmount,
      taxAmount,
      totalAmount,
    }));
  }, [data.products, data.discountPercentage,data.discount, data.taxPercentage]);

  const handleActionClick = (action) => {
    if (action === "click") {
      navigate("/erp/create-customer")
    } 
    if (action === "itemClick") {
      navigate("/erp/create-item")
    } 
    // Close the dropdown after selecting an action
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center my-4 w-full border bg-white px-4 py-2 rounded-lg shadow ">
      <button
        className="bg-blue-700 mt-4 mb-4 self-end text-white active:bg-blue-900 hover:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={() => {
          setShowModal(true);
          setIsVisible(false);
        }}
      >
        Create Sales Invoice
      </button>

      {showModal ? (
        <>
          <div className="w-100 p-5">
            <div className="flex items-center gap-2 mb-6 ">
              <BiArrowBack
                className="border text-3xl p-1 border-gray-500 rounded-md"
                onClick={() => {
                  setShowModal(false);
                  setIsVisible(true);
                }}
              />
              <div className="flex justify-between w-full ">
              <div className="flex justify-center items-center gap-2">
              <h1 className="text-2xl font-semibold">Create Sales Invoice</h1>
              <span className="text-sm font-medium text-gray-500">
                (INV0002)
              </span>
              </div>
              <div>
                    <button
                      className="flex justify-center items-center gap-4 px-4 py-1"
                      onClick={() => {
                        // handlePrint()
                        setShowPrintModal(!showPrintModal);
                      }}
                    >
                      {" "}
                      <AiFillPrinter /> Print
                    </button>
                  </div>
                  </div>
            </div>
          
            <div className=" mx-auto my-8  bg-white rounded-md shadow w-[80vw] p-4 border">
              <div className="grid grid-cols-3 gap-6 mb-6 ">
                {/* Left column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      Customer*
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      value={selectedCustomer? selectedCustomer:"Select Customer"}
                      defaultValue={"Select Customer"}
                      onChange={(e) => {
                        handleCustomerChanges(e);
                        handleActionClick(e.target.value);
                      }}
                    >
                      <option value="" selected >Select Option</option>
                      <option value="click" className="text-green-700">Create New Customer </option>
                      {customerData.map((customer) => (
                        <option key={customer._id} value={customer.accountName}>
                          {customer.accountName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="block text-sm font-medium">GSTIN/UIN</label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder="Please select gstin"
                      name="gstin"
                      value={data.gstin}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">Book*</label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder="Please select book"
                      name="book"
                      value={data.book}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">
                      Terms (Days)*
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder="Terms (Days)"
                      name="terms"
                      value={data.terms}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Middle column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium ">
                      Mobile No*
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder="999xxxxxx01"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">
                      Series Name*
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder=""
                      name="seriesName"
                      value={data.seriesName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">Date*</label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      type="date"
                      placeholder="21-03-2024"
                      name="invoiceDate"
                      value={data.invoiceDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Right column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium ">Email*</label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      type="text"
                      placeholder="example@domain.com"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <div></div>
                    <div>
                      <label className="block text-sm font-medium ">
                        Invoice Number*
                      </label>
                      <div className="flex">
                        <p className="px-4 py-2 border border-gray-300  bg-gray-0 bg-gray-200 ">
                          INV
                        </p>
                        <input
                          className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                          type="text"
                          placeholder="0002"
                          name="invoiceNumber"
                          value={data.invoiceNumber}
                          onChange={handleChange}
                        />
                        <p className="px-4 py-2 border border-gray-300 bg-gray-0 bg-gray-200 ">
                          Suffix
                        </p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium ">
                      Quotation No.*
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      type="number"
                      placeholder="Quotation No."
                      name="quotationNumber"
                      value={data.quotationNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="mb-6">
                <table className="w-full ">
                  <thead className="bg-gray-200 text-gray-700 text-sm w-full">
                    <tr>
                      <th className="px-4 py-2 text-left">SR.NO.</th>
                      <th className="px-4 py-2 text-left">PRODUCT/SERVICE</th>
                      <th className="px-4 py-2 text-left">QTY</th>
                      <th className="px-4 py-2 text-left">
                        RATE {currency} (EXCL. TAX)
                      </th>
                      <th className="px-4 py-2 text-left">AMOUNT {currency}</th>
                      <th className="px-4 py-2 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={row.id}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">
                          <div>
                            <select
                              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                              value={selectedProduct}
                              onChange={(e) => {
                                handleProductChange(e);
                                handleActionClick(e.target.value);
                              }}
                            >
                              <option value="">Select Product</option>
                              <option value="itemClick" className="text-green-700">Create New Item </option>
                              {productData.map((product) => (
                                <option
                                  key={product._id}
                                  value={product.productName}
                                >
                                  {product.productName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>

                        <td className="px-4 py-2">
                          <input
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            value={data.products[index].productQuantity}
                            onChange={(e) => {
                              const value = e.target.value;
                              setData((prevData) => ({
                                ...prevData,
                                products: prevData.products.map((product, i) =>
                                  i === index
                                    ? { ...product, productQuantity: value }
                                    : product
                                ),
                              }));
                            }}
                            placeholder="0.00"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            value={data.products[index].productRate}
                            onChange={(e) => {
                              const value = e.target.value;
                              setData((prevData) => ({
                                ...prevData,
                                products: prevData.products.map((product, i) =>
                                  i === index
                                    ? { ...product, productRate: value }
                                    : product
                                ),
                              }));
                            }}
                            placeholder="0.00"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            value={data.products[index].productAmount}
                            onChange={(e) => {
                              const value = e.target.value;
                              setData((prevData) => ({
                                ...prevData,
                                products: prevData.products.map((product, i) =>
                                  i === index
                                    ? { ...product, productAmount: value }
                                    : product
                                ),
                              }));
                            }}
                            placeholder="0.00"
                          />
                        </td>
                        <td>
                          <button
                            className="font-semibold hover:font-bold border-gray-400 "
                            onClick={() => removeRow(row.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={(e) => addRow(e)}
                >
                  + Add Row
                </button>
              </div>
              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-6">
                {/* Left column */}
                <div>
                  <textarea
                    className="w-full px-4 py-2 h-40 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Write your special notes for this sales invoice."
                    name="note"
                    value={data.note}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {/* Right column */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Select Currency.</span>
                    <select
                      name="currency"
                      onChange={(e) => {
                        setCurrency(e.target.value);
                      }}
                    >
                      <option value="$"> $ (United States Dollar)</option>
                      <option value="€"> € (Euro)</option>
                      <option value="£"> £ (British Pound Sterling)</option>
                      <option value="¥"> ¥ (Japanese Yen)</option>
                      <option value="CN¥"> CN¥ (Chinese Yuan)</option>
                      <option value="₹"> ₹ (Indian Rupee)</option>
                      <option value="₽"> ₽ (Russian Ruble)</option>
                      <option value="A$"> A$ (Australian Dollar)</option>
                      <option value="C$"> C$ (Canadian Dollar)</option>
                      <option value="CHF"> CHF (Swiss Franc)</option>
                      <option value="R$"> R$ (Brazilian Real)</option>
                      <option value="R"> R (South African Rand)</option>
                      <option value="₩"> ₩ (South Korean Won)</option>
                      <option value="₺"> ₺ (Turkish Lira)</option>
                      <option value="Mex$"> Mex$ (Mexican Peso)</option>
                    </select>
                  </div>
                  {/* <div className="flex justify-between">
                    <span>Taxable Amt.</span>
                    <span>{currency}0.00</span>
                  </div> */}
                   <div className="flex justify-between">
                    <span>Sub Amount</span>
                    <span>{currency}{data.subTotal}</span>
                  </div>
                   <div className="flex justify-between">
                    <span>Tax</span>
                    <input
                      type="text"
                      name="taxPercentage"
                      placeholder=" %"
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span>Total Taxable Amt.</span>
                    <span>{currency}{data.taxAmount}</span>
                  </div>
                
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <input
                    name="discount"
                      type="text"
                      placeholder=" %"
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-end gap-4  text-sm">
                    <span>Discount Amount : </span>
                    <span>{currency}{data.discountAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                    <span>{currency}{data.totalAmount}</span>
                  </div>

                  {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                    + Add service charge with tax
                  </button> */}
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={autoRoundOff}
                      id="auto-round-off"
                    />
                    <span>Auto Round Off</span>
                  </label>
                  {/* Remaining details */}
                  <div>

                <div className="space-y-2 flex items-center justify-between">
              <label className="capitalize font-medium block">is the bill Paid? :</label>
              <button
                className={`${
                  data.isPaid ? "bg-green-600" : "bg-red-600"
                } px-4 py-1 rounded text-white self-end`}
                onClick={(e) => setData({ ...data, isPaid: !data.isPaid })}
                >
                {data.isPaid ? "PAID" : "UNPAID"} <label>(click to change)</label>
              </button>
                </div>
            </div>
                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover"
                  onClick={handleSubmission}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          {showPrintModal && (
            <div
              className="fixed top-0 left-0 z-50  w-full h-screen bg-[#0005] backdrop-blur-sm flex justify-center items-center"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowPrintModal(false);
                }
              }}
            >
               <div className="absolute top-10 z-50 left-[25%] shadow-lg max-w-4xl mx-auto border rounded-md bg-white p-2">
                <div ref={componentRef}>
                 
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <h1 className="text-xl font-bold">
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
                        <div className="col-span-2">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Tax Invoice</h2>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-bold">Invoice Number</h3>
                              <p>{data.invoiceNumber}</p>
                            </div>
                            <div>
                              <h3 className="font-bold">Invoice Date</h3>
                              <p>{data.createdAt}</p>
                            </div>
                            <div></div>
                            <div>
                              <h3 className="font-bold">
                                Ship to: {data.customerName}
                              </h3>
                              <p>MADHYA PRADESH</p>
                              <p>Place Of Supply: 23-MADHYA PRADESH</p>
                              <p>Country: India</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table className="w-full">
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
                          {data.map((invoice, index) => (
                            <tr key={index}>
                              <td className="border px-4 py-2">{index + 1}</td>
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
                      <div className="flex justify-between items-center border-t mt-2 pt-2">
                        <p>Sub Total</p>

                        <p>{data.subTotal}</p>
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
                          <p>{data.taxAmount}</p>
                          <p>0.00</p>
                          <p>0.00</p>
                          <p>{data.totalAmount}</p>
                          <p>
                            {data.isPaid === true
                              ? "Paid"
                              : "UnPaid"}
                          </p>
                        </div>
                      </div>

                      <table className="border-t mt-2 pt-2 w-full">
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
                      <p className="text-center font-bold mt-4">
                        For, KNOWIFY GLOBAL INFOSOLUTIONS PRIVATE LIMITED
                      </p>
                    </div>
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
        </>
      ) : (
        <>
          <AllSaleInvoices />
        </>
      )}
    </div>
  );
}
