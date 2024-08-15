import { CgRemove } from "react-icons/cg";
import { BiArrowBack } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AllPurchaseOrder from "./AllPurchaseOrder";
import { toast } from "react-hot-toast";

export default function PurchaseOrder() {
  const [customerData, setCustomerData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [purchaseData, setPurchaseData] = useState({
    vendor: "",
    phone: "",
    email: "",
    poNumber: "",
    poDate: new Date().toISOString().slice(0, 10),
    quotationNo: "",
    quotationRef: "",
    service: [],
    note: "",
    products: [
      {
        productName: "",
        productQuantity: 1,
        productAmount: 0,
        productRate: "",
      },
    ],
    taxAmount: 0,
    subTotal: 0,
    totalAmount: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [rows, setRows] = useState([
    {
      id: 1,
      productName: "",
      productQuantity: "",
      productRate: "",
      productAmount: "",
    },
  ]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    setPurchaseData({
      ...purchaseData,
      products: [
        ...purchaseData.products,
        {
          productName: "",
          productQuantity: "",
          productAmount: "",
          productRate: "",
        },
      ],
    });
  };

  const removeRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    setPurchaseData({
      ...purchaseData,
      products: updatedRows.map((row) => ({
        ...purchaseData.products.find((p) => p.id === row.id),
      })),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Purchase Order...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/purchaseOrder`,
        purchaseData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      console.log("API Response:", res);

      if (res.status === 200 || res.status === 201) {
        console.log("Success Response Data:", res.data);
        toast.success("Purchase Created Successfully!", {
          duration: 8000,
        });
        setShowModal(false);
        setIsVisible(true);
        fetchPurchaseOrders();
      } else {
        console.log("Non-success Response Data:", res.data);
        toast.error("Purchase created unsuccessfully");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Purchase created unsuccessfully");
    }
  };

  useEffect(() => {
    async function fetchProductData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/item`
        );
        console.log("Product data:", res.data.response);
        setProductData(res.data.response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchProductData();
  }, []);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/customer`
        );
        console.log("Customer data:", res.data.response);
        setCustomerData(res.data.response);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
    fetchCustomerData();
  }, []);

  useEffect(() => {
    async function fetchPurchaseOrders() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/purchaseOrder`
        );
        setPurchaseOrders(res.data.response);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
      }
    }
    fetchPurchaseOrders();
  }, []);

  const handleVendorChange = (e) => {
    const selectedVendor = e.target.value;
    if (selectedVendor === "Create Vendor") {

      toast.info("Vendor creation is not implemented yet.");
      return;
    }
    setPurchaseData((prevData) => ({
      ...prevData,
      vendor: selectedVendor,

    }));
  };

  return (
    <div className="flex flex-col justify-center items-center my-4 w-full border bg-white px-4 py-2 rounded-lg shadow">
      <button
        className="bg-blue-700 mt-4 mb-4 self-end text-white active:bg-blue-900 hover:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={() => {
          setShowModal(true);
          setIsVisible(false);
        }}
      >
        Create Purchase Order
      </button>

      {showModal ? (
        <>
          <div className=" w-[80vw]">
            <div className="items-center space-x-4 mb-6 flex justify-between">
              <div className="flex items-center space-x-4 py-4 ">
                <BiArrowBack
                  onClick={() => {
                    setShowModal(false);
                    setIsVisible(true);
                  }}
                  className="border-gray-500 border rounded-md text-2xl "
                />
                <h1 className="text-2xl font-semibold mb-1">
                  Create Purchase Order
                </h1>
                <span className="text-lg text-gray-500">(PO0001)</span>
              </div>
              <button
                className="border bg-gray-800 text-gray-200 px-4 py-2 rounded-md"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>

            <div className="border rounded-md p-4 mb-6">
              <h1 className="font-semibold text-xl py-2">Vendor Info.</h1>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Vendor*</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    value={purchaseData.vendor}
                    onChange={handleVendorChange}
                  >
                    <option value="">Select Option</option>
                    <option value="Create Vendor" className="text-green-700">
                      Create Vendor
                    </option>
                    {customerData.map((customer) => (
                      <option key={customer._id} value={customer.accountName}>
                        {customer.accountName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Mobile No.</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="99XXXXXX01"
                    value={purchaseData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={purchaseData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PO No.</label>
                  <input
                    type="number"
                    id="poNumber"
                    name="poNumber"
                    placeholder="0001"
                    value={purchaseData.poNumber}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PO Date*</label>
                  <input
                    type="date"
                    id="poDate"
                    name="poDate"
                    value={purchaseData.poDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quotation No.</label>
                  <input
                    type="number"
                    id="quotationNo"
                    name="quotationNo"
                    placeholder="0001"
                    value={purchaseData.quotationNo}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Quotation Ref.</label>
                  <input
                    type="number"
                    id="quotationRef"
                    name="quotationRef"
                    placeholder="0001"
                    value={purchaseData.quotationRef}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <table className="w-full">
                <thead className="bg-gray-200 text-gray-700 text-sm w-full">
                  <tr>
                    <th className="px-4 py-2 text-left">SR.NO.</th>
                    <th className="px-4 py-2 text-left">PRODUCT/SERVICE</th>
                    <th className="px-4 py-2 text-left">QTY</th>
                    <th className="px-4 py-2 text-left">RATE (EXCL. TAX)</th>
                    <th className="px-4 py-2 text-left">AMOUNT</th>
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
                            value={purchaseData.products[index]?.productName || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              setPurchaseData((prevData) => ({
                                ...prevData,
                                products: prevData.products.map((product, i) =>
                                  i === index
                                    ? { ...product, productName: value }
                                    : product
                                ),
                              }));
                            }}
                          >
                            <option value="">Select Product</option>
                            <option value="itemClick" className="text-green-700">
                              Create New Item
                            </option>
                            {productData.map((product) => (
                              <option key={product._id} value={product.productName}>
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
                          value={purchaseData.products[index]?.productQuantity || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPurchaseData((prevData) => ({
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
                          value={purchaseData.products[index]?.productRate || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPurchaseData((prevData) => ({
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
                          value={purchaseData.products[index]?.productAmount || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPurchaseData((prevData) => ({
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
                          className="font-semibold hover:font-bold border-gray-400"
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
            <div className="grid grid-cols-2 gap-4 mb-6 py-5">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="specialNotes"
                >
                  Special Notes
                </label>
                <textarea
                  id="note"
                  name="note"
                  style={{ width: "80%" }}
                  className="border border-gray-300 rounded-md p-2 h-24"
                  placeholder="Write your special notes for this sales return."
                  value={purchaseData.note}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="py-10">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">SUBTOTAL</div>
                  <div>0.000</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">Taxable Amt.</div>
                  <div>₹0.00</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-semibold">Sub Total</div>
                  <div>₹0.00</div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="autoRoundOff" />
                    <label
                      className="text-sm font-medium ml-2"
                      htmlFor="autoRoundOff"
                    >
                      Auto Round Off
                    </label>
                  </div>
                  <div>₹0.00</div>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <div>Total Amt.</div>
                  <div>₹0.00</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="border border-blue-700 text-blue-700 rounded-md p-2"
                onClick={() => {
                  setShowModal(false);
                  setIsVisible(true);
                }}
              >
                Cancel
              </button>
              <button
                className="border border-blue-700 text-blue-700 rounded-md p-2"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <AllPurchaseOrder purchaseOrders={purchaseOrders} />
      )}
    </div>
  );
}
