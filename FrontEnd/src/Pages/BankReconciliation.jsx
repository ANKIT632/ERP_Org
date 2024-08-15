import { AiOutlineCalendar } from "react-icons/ai"; 
import React, { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
// import createCustomer from "../mainComponent/createCustomer";

export default function BankReconciliation() {
  const [showModal, setShowModal] = React.useState(false);
  const [isVisible , setIsVisible] = useState(true);

  const [showCustomerModal , setShowCustomerModal] = React.useState(false)

  return (
    <div className="flex flex-col justify-center items-center ">
     
        <button
        //  style={{ display: isVisible ? "none" : "block" }}
          className="bg-blue-700  self-center text-white  mt-10  active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
          type="button"
          style={{ display: isVisible ? "block" : "none" }}
          onClick={() => { setShowModal(true); setIsVisible(false); }}

        >
          Create Bank Reconciliation
        </button>
        {/* <quotaitonPrint /> */}
        {showModal ? (
          <>
         <div className="bg-white p-1 w-[80vw]">
      <div className="flex items-center space-x-2 mb-6">
      <BiArrowBack className="border text-2xl rounded-md border-gray-500 text-gray-500 mt-1 px-1" onClick={() =>{ setShowModal(false); setIsVisible(true) }}/>
        <h1 className="text-2xl font-semibold">Create Account</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border px-5 py-2 rounded-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="under-group">
            Under group
          </label>
          <select id="under-group" className="form-select w-full">
            <option>Bank Accounts</option>
            <option>Savings Accounts</option>
          </select>
        </div>
        <div>
            
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 " htmlFor="account-name">
            Account Name <span className="text-red-500">*</span>
          </label>
          <input id="account-name" className="form-input w-full" type="text" placeholder="Barry Tone PVT. LTD." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="short-name">
            Short/Alias Name
          </label>
          <input id="short-name" className="form-input w-full" type="text" placeholder="Jack" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input id="email" className="form-input w-full" type="email" placeholder="example@domain.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mobile-no">
            Mobile No.
          </label>
          <input id="mobile-no" className="form-input w-full" type="text" placeholder="99XXXXXX01" />
        </div>
        <div />
        <div className="col-span-1 md:col-span-2 px-5 p-2 border rounded-md bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="account-holder-name">
                Account Holder's Name <span className="text-red-500">*</span>
              </label>
              <input id="account-holder-name" className="form-input w-full" type="text" placeholder="text pvt ltd" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="account-number">
                A/C No. <span className="text-red-500">*</span>
              </label>
              <input id="account-number" className="form-input w-full" type="text" placeholder="32XXXXXXXX01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ifsc-code">
                IFSC Code <span className="text-red-500">*</span>
              </label>
              <input id="ifsc-code" className="form-input w-full" type="text" placeholder="AAXXXXXX01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bank-name">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input id="bank-name" className="form-input w-full" type="text" placeholder="Internet Banking" />
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Opening Balance</h2>
          <div className="flex items-center">
            <input className="form-input mr-2" type="text" placeholder="0.00" />
            <select className="form-select">
              <option>Dr</option>
              <option>Cr</option>
            </select>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Status</h2>
          <div className="flex items-center gap-2">
            <input id="status-active" type="radio" name="status" value="active" />
            <label htmlFor="status-active">Active</label>
            <input id="status-inactive" type="radio" name="status" value="inactive" />
            <label htmlFor="status-inactive">Inactive</label>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md">Cancel</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Save</button>
        </div>
      </div>
    </div>
        </>
      ) : null}
    </div>

      );
    }
    