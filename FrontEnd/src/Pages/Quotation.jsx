import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import React, { useState, useRef } from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import AllQuotation from "./getPages/AllQuotation";
import axios from "axios";
import { AiFillPrinter } from "react-icons/ai";
import toast from "react-hot-toast";
import { useEffect } from "react";

const toastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "dark",
};


export default function Component() {
  const [autoRoundOff, setAutoRoundOff] = useState(true);
  const [showPrintModal, setShowPrintModal] = React.useState(false);

  const initialData = {
    customerName: "",
    customerMobile: "",
    customerEmail: "",
    quotationNo: 0,
    quotationDate: "",
    validQuotationDate: "",
    products: [{ productName: "", productQuantity: 1, productAmount: 0 }],
    notes: "",
    tax: 0,
    subtotal: 0,
    totalAmount: 0,
  };

  // const [isVisible, setIsVisible] = useState(false);

  // const toggleVisibility = () => {
  //   setIsVisible(!isVisible);
  // };

  const [data, setData] = useState(initialData);

  const [showModal, setShowModal] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(data, "data");

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...data.products];
    updatedProducts[index][name] = value;
    setData({ ...data, products: updatedProducts });
  };

  const addRow = () => {
    setData({
      ...data,
      products: [
        ...data.products,
        { productName: "", productQuantity: "", productAmount: "" },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedProducts = [...data.products];
    updatedProducts.splice(index, 1);
    setData({ ...data, products: updatedProducts });
  };

  const handleSubmission = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/create-quotation`,
        data,
        {
          header: {
            "content-type": "application/json",
          },
        }
      );
      if (res.data.quntotaionAlreadyExist) {
        toast.error("code already exists", toastOptions);
        console.log(res.data, "data");
      }

      toast.success("quotaiton created successfully!", toastOptions);
      // setShowModal(false);
    } catch (error) {
      console.log(error, "error");
      toast.error("quotaiton created unsuccessfully.", toastOptions);
      setShowModal(false);
    }
  };

  useEffect(() => {
    let totalSubtotal = data.products.reduce(
      (total, product) =>
        total +
        parseFloat(product.productQuantity || 0) *
        parseFloat(product.productAmount || 0),
      0
    );
    let totalAmount = (totalSubtotal * data.tax) / 100 + totalSubtotal;

    setData((prevData) => ({
      ...prevData,
      subtotal: totalSubtotal,
      totalAmount: totalAmount,
    }));
  }, [data.products, data.tax]);

  const componentRef = useRef(null);

  return (
    <div className="flex flex-col justify-center my-4 items-center m-1 border  px-4 py-2 bg-white rounded-lg">
      {/* <ComponentToPrint
        contentref={componentRef}
        data={data}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      /> */}
      <button
        style={{ display: showModal ? "none" : "block" }}
        className="bg-blue-700 self-end m-4  text-white hover:bg-blue-600 active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Quotation
      </button>

      {/* <quotaitonPrint /> */}
      {showModal ? (
        <>
          {/* div-1 */}
          <div className="w-full">

            {/* inner-div-1 */}
            <div className="w-full border rounded-lg  mb-8 p-2  bg-white shadow-md">
              <div className="flex justify-between ">
                <div className="flex gap-2 items-center mb-4 ">
                  <p className="font-bold text-xl border py-1 px-2 rounded-md border-gray-500  text-gray-800 shadow-lg cursor-pointer hover:bg-gray-200 active:bg-white ">
                    <BiArrowBack onClick={() => setShowModal(false)} />
                  </p>
                  <h2 className="text-xl font-semibold ">Customer Info.</h2>
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

              <div className="w-full grid max-xs:grid-cols-1  max-sm:grid-cols-2 md:grid-cols-3 gap-4">

                <div className="flex flex-col">
                  <label className=" text-sm font-medium mb-1 ">
                    Customer*
                  </label>
                  <input
                    className="form-input ]"
                    type="text"
                    placeholder="Enter Customer Name"
                    name="customerName"
                    value={data.customerName}
                    onChange={handleChange}

                  />
                </div>
                <div className="flex flex-col">
                  <label className=" text-sm font-medium mb-1 ">
                    Mobile No.
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="99XXXXXX01"
                    name="customerMobile"
                    value={data.customerMobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className=" text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="example@domain.com"
                    name="customerEmail"
                    value={data.customerEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className=" text-sm font-medium mb-1">
                    Quotation No.
                  </label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="0001"
                    name="quotationNo"
                    value={data.quotationNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className=" text-sm font-medium mb-1">
                    Quotation Date*
                  </label>
                  <input
                    className="form-input"
                    type="date"
                    placeholder="19-03-2024"
                    name="quotationDate"
                    value={data.quotationDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className=" text-sm font-medium mb-1">
                    Valid Till
                  </label>
                  <input
                    className="form-input"
                    type="date"
                    placeholder="DD-MM-YYYY"
                    name="validQuotationDate"
                    value={data.validQuotationDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* inner-div-2 */}
            <div className="border rounded-lg p-6 bg-white shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  SR.NO. PRODUCT/SERVICE
                </h2>
              </div>
              <div>
                {data.products.map((product, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3   sm:grid-cols-3 md:grid-cols-5  gap-4 mb-4"
                  >
                    <div className="col-span-2">
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Enter Product Name"
                        name="productName"
                        value={product.productName}
                        defaultValue={1}
                        onChange={(e) => handleProductChange(e, index)}
                      />
                    </div>
                    <input
                      className="form-input"
                      type="number"
                      placeholder="QTY"
                      name="productQuantity"
                      value={product.productQuantity}
                      onChange={(e) => handleProductChange(e, index)}
                    />
                    <input
                      className="form-input"
                      type="number"
                      placeholder="RATE"
                      name="productAmount"
                      value={product.productAmount}
                      onChange={(e) => handleProductChange(e, index)}
                    />
                    <button
                      className="font-semibold hover:font-bold border-gray-400 "
                      onClick={() => removeRow(index)}
                    >
                      {" "}
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex   justify-end space-x-2 pb-4 mr-5 ">
                  <div className="flex cursor-pointer hover:bg-gray-700 active:bg-gray-800 gap-1 items-center border bg-gray-800 text-gray-200 px-2 py-1 rounded-md  w-fit shadow-md">
                    <AiOutlinePlusCircle onClick={addRow}  className="text-white"/>
                    <button

                      onClick={addRow}
                    >
                      Add Row
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4  p-4  bg-gray-50">
                <h2 className="text-xl font-semibold">SUBTOTAL</h2>
                <div className="flex items-center space-x-2">
                  <p>{data.subtotal}/-</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Special Notes
                </label>
                <textarea
                  value={data.notes}
                  onChange={handleChange}
                  className="form-textarea w-full"
                  placeholder="Write your special notes for this quotation."
                  name="notes"
                ></textarea>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm sm:text-sm md:text-xl  font-semibold">
                    Taxable %
                  </h2>
                  <input
                    className="p-2 border"
                    type="number"
                    placeholder="0%"
                    name="tax"
                    value={data.tax}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-between items-center mb-4 bg-gray-200 p-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={autoRoundOff}
                      id="auto-round-off"
                    />
                    <span>Auto Round Off</span>
                  </label>
                  <h2 className="text-2xl font-bold">
                    Total Amt. {data.totalAmount}/-
                  </h2>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="border border-gray-400 px-2 py-1 rounded-md hover:bg-gray-200 active:bg-white"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="border border-gray-400 px-4 py-1 rounded-md hover:bg-gray-200 active:bg-white"
                    onClick={handleSubmission}
                  >
                    Save
                  </button>
                </div>
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
              <div className="shadow-lg max-w-6xl w-full mx-auto border rounded-md bg-white p-2">
                <div ref={componentRef} className="p-4">
                  <>
                    <div className="max-w-4xl mx-auto my-8 p-4 ">
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
                            Quotation No.: Q{data.quotationNo}
                          </p>
                          <p className="text-sm">
                            Quotation Date: {data.quotationDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mb-4">
                        <div>
                          <h2 className="font-bold">Bill To</h2>
                          <p className="text-sm">{data.customerName}</p>
                          <p className="text-sm">{data.customerEmail}</p>
                          <p className="text-sm">{data.customerMobile}</p>
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
                          {data.products.map((product, index) => (
                            <tr key={index}>
                              <td className="border px-4 py-2">{index + 1}</td>
                              <td className="border px-4 py-2">
                                {product.productName}
                              </td>
                              <td className="border px-4 py-2">
                                {product.productQuantity}
                              </td>
                              <td className="border px-4 py-2">
                                {product.productAmount}
                              </td>
                              <td className="border px-4 py-2">{data.tax}</td>
                              <td className="border px-4 py-2">
                                {product.productQuantity *
                                  product.productAmount}
                              </td>
                            </tr>
                          ))}

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
                              {data.subtotal}
                            </td>
                            <td className="border"></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="flex justify-end items-center mt-4">
                        <div className="text-end">
                          <p className="text-sm">Invoice Amount</p>
                          <p className="text-sm font-semibold">
                            {data.totalAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
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
          <AllQuotation />
        </>
      )}
    </div>
  );
}
