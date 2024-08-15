import { BiSelectMultiple } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import AllSalesReturn from "./getPages/AllSalesReturn";

export default function SalesReturns() {
  const [showModal, setShowModal] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [invoiceData, setInvoiceData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomerAllData, setSelectedCustomerAllData] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [allData, setAllData] = useState([]);
  const [showInvoiceModal, setShowInoviceModal] = React.useState(false);
  const [selectInvoiceId, setSelectInovoiceId] = useState("");
  const [selectInvoiceData, setSelectInvoiceData] = useState([]);
  // const [productData, setProductData] = useState({});

  const initializeData = {
    customer: "",
    creditNote: "",
    creditDate: "",
    note: "",
    reason: "",
    productName: "",
    productAmount: 0,
    productQuantity: 0,
    productRate: 0,
    invoiceNumber: 0,
    invoiceDate: new Date(),
    InvoiceQty: 0,
    taxAmount: 0,
    taxPercentage: 0,
    cess: "",
    subTotal: 0,
    totalAmount: 0,
    batchNumber: "",
    customerId: "",
    invoiceId: "",
  };
  const [data, setData] = useState(initializeData);
  // console.log(data, "dataa");

  const [subtotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [limitExceeded, setLimitExceeded] = useState(false);

  const handleSelectChange = (event) => {
    const selectedCustomerName = event.target.value;
    const selectedCustomerData = customerData.find(
      (customer) => customer.customerName === selectedCustomerName
    );
    setAllData(selectedCustomerData);
    setCustomerId(selectedCustomerData.customerDetails);
  };

  useEffect(() => {
    setCustomerId(allData.customerDetails);
  }, [allData]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/sales-invoice`)
      .then((res) => {
        setCustomerData(res.data.response);
        setInvoiceData(res.data.response);
      })
      .catch((err) => {
        // console.error("Error fetching data:", err);
      });
    if (customerId) {
      axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}/customer/${customerId}`)
        .then((res) => {
          setSelectedCustomerAllData(res.data.response);
        })
        .catch((err) => {
          // console.error("Error fetching data:", err);
        });
    }
    axios
      .get(
        `${import.meta.env.VITE_APP_BASE_URL}/sales-invoice/${selectInvoiceId}`
      )
      .then((res) => {
        setSelectInvoiceData(res.data.response);
      })
      .catch((err) => {
        // console.error("Error fetching data:", err);
      });
  }, [allData, selectInvoiceId, customerId]);

  let productData = [
    {
      productQuantity: 0,
      productAmount: 0,
    },
  ];
  const [isAutoRoundOff, setIsAutoRoundOff] = useState(false);
  const handleAutoRoundOffChange = () => {
    setIsAutoRoundOff((prevIsAutoRoundOff) => !prevIsAutoRoundOff);
  };

  useEffect(() => {
    let SUBTOTAL = data.productRate * data.productQuantity;
    setSubTotal(SUBTOTAL);
    setTaxAmount((SUBTOTAL* data.taxPercentage)/100);
    let taxAmount = selectInvoiceData.taxAmount;

    let totalAmount = (SUBTOTAL - ((SUBTOTAL * data.taxPercentage)/100));
    setTotalAmount(totalAmount);
    setData((prev) => ({
      ...prev,
      subTotal: SUBTOTAL,
      totalAmount: totalAmount,
      taxAmount:taxAmount
    }));
  }, [productData, data.productRate, data.productQuantity, selectInvoiceData.taxPercentage]);

  let count = 1;
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [fieldName]: value,
    });
  };
  useEffect(() => {
    if (
      selectInvoiceData &&
      selectInvoiceData.products &&
      selectInvoiceData.products.length > 0
    ) {
      setData((prevData) => ({
        ...prevData,
        invoiceNumber: selectInvoiceData.invoiceNumber,
        invoiceDate: selectInvoiceData.invoiceDate,
        taxPercentage: selectInvoiceData.taxPercentage,
        invoiceId: selectInvoiceData._id,
        taxAmount: taxAmount,
        customerId: selectInvoiceData.customerDetails,
        productName: selectInvoiceData.products[0].productName,
        productQuantity: selectInvoiceData.products[0].productQuantity,
        productAmount: selectInvoiceData.products[0].productAmount,
        productRate: selectInvoiceData.products[0].productRate,
      }));
    }
  }, [selectInvoiceData]);

  const handleSubmit = async () => {
    // console.log("button clicked");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/sales-return`,
        data
      );
      // console.log(res);
      toast.success("sales return created Successfully!");
      location.reload();
      
    } catch (error) {
      // console.error(error);
      toast.error("sales return Error");
    }
  };

  return (
    <div className="flex flex-col justify-center my-4 items-center m-1  bg-white rounded-lg border">
      <Toaster />
      <button
        className="bg-blue-700 self-end text-white m-4 active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={() => {
          setShowModal(true);
          setIsVisible(false);
        }}
      >
        Create Sale Returns
      </button>
      {showInvoiceModal ? (
        <>
          <div className="fixed top-0 left-0 z-50  w-full h-screen bg-[#0005] backdrop-blur-sm flex justify-center items-center">
            <div className=" border bg-white border-gray-300 rounded-md ">
              <div className="text-lg  p-4 flex items-center gap-2 ">
                <BiSelectMultiple size={20} />
                Select Inovice
              </div>
              <table className="text-sm">
                <tr className="border border-gray-300 ">
                  <th className="p-4">INVOICE NO.</th>
                  <th className="p-4">INVOICE DATE</th>
                  <th className="p-4">SHIPPING STATE</th>
                </tr>
                <tbody>
                  {invoiceData
                    .filter((invoice) => {
                      return invoice.customerDetails === customerId;
                    })
                    .map((invoice, index) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-200"
                          onClick={() => {
                            setSelectInovoiceId(invoice._id);
                            setShowInoviceModal(false);
                          }}
                        >
                          <td className="p-4">{invoice.invoiceNumber}</td>
                          <td className="p-4">{invoice.createdAt}</td>
                          <td className="p-4">
                            {selectedCustomerAllData.address2}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="flex justify-end p-4">
                <button
                  className="border border-gray-500 text-gray-500 px-2 py-1 rounded-md"
                  onClick={() => setShowInoviceModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal ? (
        <>
          <div className="bg-white p-8 w-full">
            <div className="items-center space-x-4 mb-6 flex justify-between">
              <div className="flex items-center space-x-4 py-4 ">
                <BiArrowBack
                  onClick={() => {
                    setShowModal(false);
                    setIsVisible(true);
                  }}
                />
                <h1 className="text-2xl font-semibold ">Create Sale Return </h1>
              </div>
              <button className="border bg-gray-800 text-gray-200 px-4 py-2 rounded-md">
                Print
              </button>
            </div>
            <div className="border rounded-md p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Customer info.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="customer"
                  >
                    Customer*
                  </label>
                  <select
                    id="customer"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    onChange={(e) => {
                      handleSelectChange(e);
                      setData((prevData) => ({
                        ...prevData,
                        customer: e.target.value,
                      }));
                    }}
                    value={data.customer}
                  >
                    <option value="" disabled>
                      Please select customer
                    </option>
                    {customerData.map((customer, index) => (
                      <option key={index} value={customer.customerName}>
                        {customer.customerName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="creditNoteNo"
                  >
                    Credit Note No.
                  </label>
                  <input
                    type="text"
                    id="creditNoteNo"
                    placeholder="CN0001"
                    name="creditNote"
                    value={data.creditNote}
                    className="border border-gray-300 rounded-md p-2 w-full "
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="creditNoteDate"
                  >
                    Credit Note Date*
                  </label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      id="reason"
                      name="creditDate"
                      value={data.creditDate}
                      placeholder="20-03-2024"
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 "
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="reason"
                  >
                    Reason
                  </label>
                  <div className="flex items-center">
                    <select
                      id="reason"
                      name="reason"
                      value={data.reason}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="Sales Return">Sales Return</option>
                      <option value="Post Sale Discount">
                        Post Sale Discount
                      </option>
                      <option value="Deficiency in Service">
                        Deficiency in Service
                      </option>
                      <option value="Correction in Invoice">
                        Correction in Invoice
                      </option>
                      <option value="Change in POS">Change in POS</option>
                      <option value="Finalization of Provisional Assessment">
                        Finalization of Provisional Assessment
                      </option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 p-2">
                <div>
                  <p>Billing Address</p>
                  <p>{selectedCustomerAllData.address1}</p>
                </div>
                <div className="px-3">
                  <p>Shipping Address</p>
                  <p>{selectedCustomerAllData.address2}</p>
                </div>
              </div>
            </div>
            <div className="border rounded-md ">
              <table className="w-full">
                <thead className="">
                  <tr className="  text-gray-600 text-sm bg-gray-200 w-full">
                    <th className="">SR.NO.</th>
                    <th>PRODUCT/SERVICE</th>
                    <th>MRP</th>
                    <th>QTY</th>
                    <th>RATE (₹) (EXCL. TAX)</th>
                    <th>BATCH/LOT NO.</th>

                    <th>INVOICE NO.</th>
                    <th>INVOICE DATE</th>
                    <th>INVOICE QTY</th>
                    <th>TAXABLE AMT. (₹)</th>
                    <th>GST RATE(%)</th>
                    <th>CESS(%)</th>
                    <th>AMOUNT (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center text-gray-700">
                    <td className="p-4">{count}</td>
                    {selectInvoiceData.products &&
                    selectInvoiceData.products.length > 0 ? (
                      <>
                        {selectInvoiceData.products.map(
                          (filteredData, index) => {
                            return (
                              <React.Fragment key={index}>
                                <td>{filteredData.productName}</td>
                                <td>
                                  <p className="border text-center p-1 min-w-20 bg-gray-200">
                                    {filteredData.productAmount}
                                  </p>
                                </td>
                                <td>
                                  <input
                                    className="border text-center p-1 min-w-20  "
                                    type="number"
                                    value={data.productQuantity}
                                    defaultValue={filteredData.productQuantity}
                                    max={filteredData.productQuantity}
                                    onChange={(e) => {
                                      const newValue = e.target.value;
                                      setData((prevData) => ({
                                        ...prevData,
                                        productQuantity: newValue,
                                      }));
                                      if (
                                        newValue > filteredData.productQuantity
                                      ) {
                                        setLimitExceeded(true);
                                      } else {
                                        setLimitExceeded(false);
                                      }
                                    }}
                                  />
                                  {limitExceeded && (
                                    <div className="text-xs text-red-400">
                                      Quantity Limit{" "}
                                      {filteredData.productQuantity}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  <input
                                    className="border text-center p-1 min-w-20"
                                    type="number"
                                    value={data.productRate}
                                    defaultValue={filteredData.productRate}
                                    onChange={(e) => {
                                      const newValue = e.target.value;
                                      setData((prevData) => ({
                                        ...prevData,
                                        productRate: newValue,
                                      }));
                                    }}
                                  />
                                </td>
                              </React.Fragment>
                            );
                          }
                        )}
                        <td>
                          <p className="border text-center min-w-20 p-1 bg-gray-200">
                            N/A
                          </p>
                        </td>
                        <td>
                          {" "}
                          <p className="border min-w-20 bg-gray-200 p-1">
                            {selectInvoiceData.invoiceNumber
                              ? selectInvoiceData.invoiceNumber
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p className="border min-w-20 bg-gray-200 p-1">
                            {selectInvoiceData.createdAt
                              ? selectInvoiceData.createdAt
                              : "-"}
                          </p>
                        </td>
                        <td>
                          <p className="border min-w-20 bg-gray-200 p-1">{1}</p>
                        </td>
                        <td>
                          <p className="border min-w-20 bg-gray-200 p-1">
                            {selectInvoiceData.taxAmount
                              ? selectInvoiceData.taxAmount
                              : "-"}
                          </p>
                        </td>
                        {/* <td>
                          <p className="border min-w-20 bg-gray-200 p-1">
                            {selectInvoiceData.taxPercentage
                              ? selectInvoiceData.taxPercentage
                              : "-"}
                          </p>
                        </td> */}
                        <td>
                          <input
                            className="border text-center p-1 min-w-20"
                            type="number"
                            value={data.taxPercentage}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setData((prevData) => ({
                                ...prevData,
                                taxPercentage: newValue,
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <p className="border min-w-20 bg-gray-200 p-1">N/A</p>
                        </td>
                        <td>
                          <p className="border min-w-20 bg-gray-200 p-1">
                            {selectInvoiceData.totalAmount
                              ? selectInvoiceData.totalAmount
                              : "-"}
                          </p>
                        </td>
                      </>
                    ) : (
                      <React.Fragment>
                        <td colSpan="3">No products found</td>
                      </React.Fragment>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="py-4">
              <button
                className="border border-blue-700 text-blue-700 rounded-md px-2 py-1"
                onClick={() => {
                  setShowInoviceModal(true);
                }}
              >
                Add Invoice
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
                  id="specialNotes"
                  placeholder="Write your special notes for this sales return."
                  value={data.note}
                  name="note"
                  onChange={handleChange}
                  style={{ width: "80%" }}
                  className="border border-gray-300 rounded-md p-2 h-24 "
                ></textarea>
              </div>
              <div className="py-10">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">SUBTOTAL</div>
                  <div>₹{subtotal}</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">Tax Amount</div>
                  <div>₹{taxAmount}</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">SGST</div>
                  <div>₹0.00</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">CGST</div>
                  <div>₹0.00</div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoRoundOff"
                      checked={isAutoRoundOff}
                      onChange={handleAutoRoundOffChange}
                    />
                    <label
                      className="text-sm font-medium ml-2"
                      htmlFor="autoRoundOff"
                    >
                      Auto Round Off
                    </label>
                  </div>
                  <div>₹{isAutoRoundOff ? Math.round(subtotal) : subtotal}</div>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <div>Total Amt.</div>
                  <div>₹{totalAmount}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsVisible(true);
                }}
                className="border border-blue-700 text-blue-700 rounded-md p-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="border border-blue-700 text-blue-700 rounded-md p-2"
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <AllSalesReturn />
        </>
      )}
    </div>
  );
}
