import { AiOutlinePlusCircle } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import jwtDecode from "jwt-decode";

import toast, { Toaster } from "react-hot-toast";
import AllPurchaseBill from "./getPages/AllPurchaseBill";
import { useNavigate } from "react-router-dom";



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


export default function PurchaseBill() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [autoRoundOff, setAutoRoundOff] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [currency, setCurrency] = useState("$");

  const [data, setData] = useState({
    customerName: "",
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
    totalAmount: 0,
    isPaid: true,
  });

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
    setData((prevData) => ({
      ...prevData,
      customerName: selectedCustomerObject
        ? selectedCustomerObject.accountName
        : "",
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
        `${import.meta.env.VITE_APP_BASE_URL}/purchaseBill`,
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

      console.log('purchase post', res)
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
  }, [data.products, data.discountPercentage, data.discount, data.taxPercentage]);

  const handleActionClick = (action) => {
    if (action === "click") {
      navigate("/erp/create-customer")
    }
    // Close the dropdown after selecting an action
    // setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center m-1 w-full  ">
      <Toaster />
      <div className="flex w-full justify-end">
        <button
          className={`bg-blue-700  text-white hover:bg-blue-600  active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none  ease-linear transition-all duration-150 my-3 ${showModal?" hidden":""}`}
          type="button"
          onClick={() => {
            setShowModal(true);
            setIsVisible(false);
          }}
        >
          Create Purchase Bill
        </button>
      </div>

{/* create form */}
      {showModal ? (
        <>
          <div className=" py-4 overflow-x-hidden ">
            <div className="flex items-center gap-2  ">
              <BiArrowBack
                className="border text-3xl p-1 cursor-pointer border-gray-500 rounded-md hover:bg-gray-200 active:bg-white"
                onClick={() => {
                  setShowModal(false);
                  setIsVisible(true);
                }}
              />
              <h1 className="text-2xl font-semibold ">Create Purchase Bill</h1>

            </div>

            <div className=" mx-auto my-8  bg-white rounded-md shadow w-[90vw] p-4 border ">
              <h1 className="font-semibold mb-1">Vendor Info.</h1>

              {/* div-1  vendor info*/}

              <div className="grid grid-cols-3  max-sm:grid-cols-2 max-xs:grid-cols-1 gap-6 mb-6 w-full ">
                {/* Left column */}

                <div>
                  <label className="block text-sm font-medium">
                    Vendor*
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={selectedCustomer ? selectedCustomer : "Select Customer"}
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
                  <label htmlFor="block text-sm font-medium">Bill No.</label>
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
                  <label className="block text-sm font-medium ">Due Date*</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    type="date"
                    placeholder="21-03-2024"
                    name="invoiceDate"
                    value={data.invoiceDate}
                    onChange={handleChange}
                  />
                </div>


                {/* Middle column */}

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
                  <label className="block text-sm font-medium ">Bill Date*</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    type="date"
                    placeholder="21-03-2024"
                    name="invoiceDate"
                    value={data.invoiceDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium ">PO No*</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="A0001Z"
                    name="invoiceDate"
                    value={data.invoiceDate}
                    onChange={handleChange}
                  />
                </div>

                {/* Right column */}

                <div className="w-full">
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



              </div>

              {/* Table */}
              <div className="mb-6 overflow-x-scroll overflow-y-hidden sm:overflow-hidden">
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
                              className="w-full max-sm:w-[140px] px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                              value={selectedProduct}
                              onChange={handleProductChange}
                            >
                              <option value="">Select Product</option>
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
                            className=" px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 max-sm:w-14 w-full"
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
                            className="w-full max-sm:w-36 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 max-sm:w-24"
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
                  className="my-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                  onClick={(e) => addRow(e)}
                >
                  + Add Row
                </button>
              </div>
              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                {/* Left column */}
                <div>
                  <textarea
                    className="w-full px-4 py-2 h-40 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Write your special notes for this purchase bill."
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
                    <span className="font-bold text-2xl">{currency}{data.totalAmount}</span>
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

                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md   hover:bg-gray-200 active:bg-white"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white rounded-md hover"
                  onClick={handleSubmission}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>

          <AllPurchaseBill />
        </>
      )}
    </div>
  );
}
