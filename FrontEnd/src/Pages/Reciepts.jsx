import React, { useState } from 'react'
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { BiArrowBack } from "react-icons/bi";

export default function Reciepts() {
  const VoucherCount = 0;
  const [showModal, setShowModal] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="flex flex-col justify-center  items-center m-1 gap-4">
      {/* <ComponentToPrint contentref={componentRef} data={data} isVisible={isVisible} setIsVisible={setIsVisible} /> */}

      <button
        //  style={{ display: isVisible ? "none" : "block" }}
        className="bg-blue-700 self-center text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 my-2"
        type="button"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={() => { setShowModal(true); setIsVisible(false); }}

      >
        Create Reciepts
      </button>

      {/* <quotaitonPrint /> */}
      {showModal ? (
        <>
          <div className="mx-auto  my-2 border-sm p-2 px-4 border w-full flex flex-col flex-wrap  gap-6">


            <div className='flex  items-center  gap-2 '>

              <BiArrowBack onClick={() => { setShowModal(false); setIsVisible(true) }} className='text-2xl cursor-pointer hover:text-zinc-500 active:text-zinc-800' />
              <h1 className="text-2xl font-semibold">Create Reciepts</h1>
            </div>

            {/* div-1 */}

            <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2  lg:gap-10">

              <div className='flex flex-col'>
                <label className="text-sm font-semibold text-gray-800">
                  Voucher No.
                </label>
                <input
                  type="text"
                  name="voucherNo"
                  defaultValue={"R" + VoucherCount}
                  className="form-input p-2 bg-gray-200 "
                />
              </div>
              <div className='flex flex-col'>
                <label className="text-sm font-semibold text-gray-800">
                  Account
                </label>
                <select
                  name="account"
                  placeholder="Please select account"
                  id="account"
                  className="form-input p-2 focus:border-blue-300"
                >
                  <option value="account1">Account1</option>
                  <option value="account1">Account2</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className="text-sm font-semibold text-gray-800">Email</label>
                <input
                  type="text"
                  name="voucherNo"
                  placeholder="example@domain.com"
                  className="form-input p-2 focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col justify-center items-end">
                <p className="font text-sm md:text-lg sm:text-sm ">Amount Recived</p>
                <p className="font-bold text-xl md:text-2xl sm:text-xl">$0.00</p>
              </div>
            </div>


            {/* div-2 */}

            <div className="w-full  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 sm:gap-2 md:gap-2  lg:gap-10">
              <div className='flex flex-col '>
                <label className="text-sm font-semibold text-gray-800">
                  Reciept Date
                </label>
                <input
                  type="date"
                  name="recieptDate"
                  id="recieptDate"
                  className="form-input p-1.5 focus:border-blue-300"
                />
              </div>
              <div className='flex flex-col'>
                <label className="text-sm font-semibold text-gray-800">Mode</label>
                <select
                  name="mode"
                  placeholder="Please select Mode"
                  id="mode"
                  className="form-input p-2 focus:border-blue-300"
                >
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className="text-sm font-semibold text-gray-800">
                  Reference No
                </label>
                <select
                  name="mode"
                  placeholder="Please select Mode"
                  id="mode"
                  className="form-input p-2 focus:border-blue-300"
                >
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className="text-sm font-semibold text-gray-800">
                  Deposit To
                </label>
                <select
                  name="deposiTo"
                  placeholder="Please select account"
                  id="deposiTo"
                  className="form-input p-2 focus:border-blue-300"
                >
                  {" "}
                  <option value="account1">Account1</option>
                  <option value="account1">Account2</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className="text-sm font-semibold text-gray-800">
                  Amount Received
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                  name="amountRecieved"
                  className="form-input p-2 focus:border-blue-300"
                />
              </div>
            </div>

            {/* div-3 */}
            <div className='w-full' >
              <h1 className="text-xl font-semibold mb-1">Outstanding Transactions</h1>
              <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 md:gap-2  lg:gap-10 ">
                <div className='flex flex-col '>
                  <label className="text-sm font-semibold text-gray-800">
                    Find Invoice No.
                  </label>
                  <select
                    name="inovice"
                    placeholder="Find Invoice No."
                    id="invoice"
                    className="form-input p-2 focus:border-blue-300"
                  >
                    <option value="invoice1">inovice1</option>
                    <option value="invoice1">invoice2</option>
                  </select>
                </div>

                <div className='flex flex-col'>
                  <label className="text-sm font-semibold text-gray-800">
                    Form Date
                  </label>
                  <input
                    type="date"
                    name="formDate"
                    placeholder="example@domain.com"
                    className="form-input p-2 focus:border-blue-300"
                  />
                </div>
                <div className='flex flex-col'>
                  <label className="text-sm font-semibold text-gray-800">
                    To Date
                  </label>
                  <input
                    type="date"
                    name="voucherNo"
                    placeholder="example@domain.com"
                    className="form-input p-2 focus:border-blue-300"
                  />
                </div>

                <div className="flex justify-center items-end mb-2 gap-2">
                  <button className="border border-blue-500 text-blue-500 px-3  py-1 rounded-md text-sm hover:bg-blue-100 active:bg-white">
                    Search
                  </button>
                  <button className="border bg-gray-500 px-3 text-white py-1 rounded-md text-sm hover:bg-gray-600 active:bg-gray-500">
                    Reset
                  </button>

                  <div className='flex gap-2 '>
                    <input type="checkbox" name="overdueStatus" />
                    <label className="text-sm font-semibold ">Overdue Status</label>
                  </div>
                </div>
              </div>

              <div>


              </div>
            </div>

            {/* div-4 */}
            <div className='w-full mt-4 overflow-x-auto min-w-100'>
              <table className=" mt-4 w-full ">
                <thead>
                  <tr className="flex justify-between gap-2 text-gray-800 text-xs bg-gray-200 px-4 p-2 w-full">
                    <th>DESCRIPTION </th>
                    <th> DUE DATE</th>
                    <th>ORIGINAL AMOUNT (₹) </th>
                    <th>DUE AMOUNT (₹)</th>
                    <th>PAYMENT (₹) </th>
                    <th>DISCOUNT AMOUNT (₹) </th>
                    <th>TDS (₹)</th>
                  </tr>
                </thead>
                <tbody className="p-4">
                  <p className="text-center text-xs text-gray-700 p-2">
                    Please select customer!
                  </p>
                </tbody>
              </table>
            </div>


            {/* div-5 */}
            <div className='w-full flex  sm:justify-between  max-sm:flex-col-reverse'>

              <div className=" w-full flex flex-col my-2  md:w-2/6 sm:w-full ">
                <label className="text-sm font-semibold">Narration</label>
                <textarea name="" id="" cols="80" rows="4" className="border rounded-md p-2 form-input focus:border-blue-300" placeholder="Write your narration for this receipt."></textarea></div>

              <div className="w-full bg-gray-200 p-4 md:w-[300px] h-fit flex ">

                <div className=" text-sm font-semibold flex flex-col  w-full">
                  <div className="flex justify-between">
                    <p>AMOUNT TO APPLY</p>
                    <p>₹0.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>AMOUNT TO CREDIT</p>
                    <p>₹0.00</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex justify-between ">
              <button onClick={() => { setShowModal(false); setIsVisible(true) }} className="border border-gray-500 text-gray-500 px-3  py-1 rounded-md text-sm hover:bg-gray-200 active:bg-white">
                Cancel
              </button>
              <button className="border border-blue-500 text-blue-500 px-3  py-1 rounded-md text-sm hover:bg-blue-100 active:bg-white">
                Save
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>

  );
}
