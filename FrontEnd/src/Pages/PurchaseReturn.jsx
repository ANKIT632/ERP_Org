import { AiOutlineCalendar } from "react-icons/ai";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
// import createCustomer from "../mainComponent/createCustomer";

export default function PurchaseReturn() {
  const [showModal, setShowModal] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [showCustomerModal, setShowCustomerModal] = React.useState(false);

  return (
    <div className="flex flex-col justify-center my-2 items-center m-1 w-[80vw] ">
      <button
        //  style={{ display: isVisible ? "none" : "block" }}
        className="bg-blue-700 self-center text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={() => {
          setShowModal(true);
          setIsVisible(false);
        }}
      >
        Create Purchase Return
      </button>
      {/* <quotaitonPrint /> */}
      {showModal ? (
        <>
          <div className="bg-white">
            <div className="items-center space-x-4 mb-6 flex justify-between">
              <div className="flex items-center space-x-4 py-4 ">
                <BiArrowBack
                  onClick={() => {
                    setShowModal(false);
                    setIsVisible(true);
                  }}
                />
                <h1 className="text-2xl font-semibold ">
                  Create Purchase Return (Dr. Note){" "}
                  {/* <span className="text-gray-400">{data.quotationNo}</span> */}
                  <span className="text-lg text-gray-500">(PO0001)</span>
                </h1>
              </div>
              <button className="border bg-gray-800 text-gray-200 px-4 py-2 rounded-md">
                Print
              </button>
            </div>
            <div className="border rounded-md p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Vendor info.</h2>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="vendor"
                  >
                    Vendor*
                  </label>
                  <select
                    id="Vendor"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="">Please select Vendor</option>
                    <option value="Vendor">Vendor 1</option>
                    <option value="Vendor">Vendor 2</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="creditNoteNo"
                  >
                    Debit Note No.
                  </label>
                  <input
                    type="text"
                    id="creditNoteNo"
                    placeholder="CN0001"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="creditNoteDate"
                  >
                    Debit Note Date*
                  </label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      id="creditNoteDate"
                      placeholder="20-03-2024"
                      className="border border-gray-300 rounded-md p-2 pr-40"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="creditNoteNo"
                  >
                    Reference No.
                  </label>
                  <input
                    type="text"
                    id="creditNoteNo"
                    placeholder="CN0001"
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="creditNoteDate"
                  >
                    Reference Date
                  </label>
                  <div className="flex items-center">
                    <input
                      type="date"
                      id="creditNoteDate"
                      placeholder="20-03-2024"
                      className="border border-gray-300 rounded-md p-2  pr-40"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded-md ">
              <table className="w-full ">
                <thead>
                  <tr className="flex gap-8 text-gray-600 text-sm bg-gray-200 p-6 w-full">
                    <th className="">SR.NO.</th>
                    <th>PRODUCT/SERVICE</th>
                    <th>BATCH/LOT NO.</th>
                    <th>EXPR. DATE</th>
                    <th>MRP</th>
                    <th>BILL NO.</th>
                    <th>BILL DATE</th>
                    <th>BILL QTY </th>
                    <th>QTY</th>
                    <th>RATE (₹)</th>
                    <th>TAXABLE AMT. (₹)</th>
                    <th>GST RATE(%)</th>
                    <th>CESS(%)</th>
                    <th>AMOUNT (₹)</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div className="text-sm text-gray-600 mt-2 text-center">
                You have not selected any Vendor!
              </div>
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
                  style={{ width: "80%" }}
                  className="border border-gray-300 rounded-md p-2 h-24 "
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
                  <div className="text-sm">SGST</div>
                  <div>₹0.00</div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm">CGST</div>
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
              <button className="border border-blue-700 text-blue-700 rounded-md p-2">
                Cancel
              </button>
              <button className="border border-blue-700 text-blue-700 rounded-md p-2">
                Save & Next
              </button>
              <button className="border border-blue-700 text-blue-700 rounded-md p-2">
                Save
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
