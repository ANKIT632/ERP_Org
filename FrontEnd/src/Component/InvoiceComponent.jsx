/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from "react";
import PrintBtn from "./PrintBtn";
import logo from "../assets/react.svg";

const Invoice = ({ data, contentref, openPreview, setOpenPreview }) => {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpenPreview(false);
        }
      }}
      className={`absolute w-full h-full top-0 left-0 bg-[#0004] min-h-screen  backdrop-blur-sm space-y-4 py-4 duration-200 ${
        openPreview ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={contentref}
        className="max-w-3xl bg-white mx-auto rounded p-4 space-y-4"
      >
        {/* logo and invoice details */}
        <div className="w-full flex justify-between items-center">
          <div>
            <img
              src={logo}
              className="h-10 w-full object-contain object-left"
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="font-bold">INVOICE</h1>
            <p>
              Invoice# <span className="font-medium">{data.invoiceNumber}</span>
            </p>
            <p>
              Invoice Date <span className="font-medium">{data.date}</span>
            </p>
            <p>
              Invoice Amount{" "}
              <span className="font-medium">Rs.{data.total}</span>
            </p>
            <p
              className={`font-bold text-xl ${
                !data.isPaid ? "text-red-300" : "text-green-300"
              }`}
            >
              {!data.isPaid ? "UNPAID" : "PAID"}
            </p>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-b from-gray-200" />
        {/* billed from */}
        <div className="w-full flex flex-col justify-start items-start">
          <label className="font-medium text-sm">BILLED FROM</label>
          <p>{data.billFrom.name}</p>
          <p>{data.billFrom.address}</p>
          <p className="max-w-sm">{data.billFrom.email}</p>
          <p>
            GSTIN :{" "}
            <span className="font-medium uppercase">
              {data.billFrom.gstNumber}
            </span>
          </p>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-b from-gray-200" />
        {/* billed to */}
        <div className="w-full flex flex-col justify-start items-start">
          <label className="font-medium text-sm">BILLED TO</label>
          <p>{data.billTo.name}</p>
          <p>{data.billTo.address}</p>
          <p className="max-w-sm">{data.billTo.email}</p>
          <p className="max-w-sm">{data.billTo.contactNumber}</p>
          <p>
            GSTIN :{" "}
            <span className="font-medium uppercase">
              {data.billTo.gstNumber}
            </span>
          </p>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-b from-gray-200" />
        <div className="w-full grid grid-cols-3 font-medium">
          <div className="w-full flex justify-start items-center">
            <h2 >Item Name</h2>
          </div>
          <div className="w-full flex justify-center items-center">
            <span>Quantity</span>
          </div>
          <div className="w-full flex justify-end items-center">
            <span>Amount (INR)</span>
          </div>
        </div>
        <div className="divide-y-2">
          {data.items.map((item) => {
            return <Item data={item} />;
          })}
        </div>
        {/* amount */}
        <div className="w-full flex flex-col gap-2">
          <div className=" flex justify-between ">
            <label className=" font-medium">Subtotal :</label>
            <h2>₹{data.subTotal}</h2>
          </div>
          <div className=" flex justify-between items-center">
            <label className=" font-medium">Discount :</label>
            <h2>
              ({data.discountPercentage}%) ₹{data.discountAmount}
            </h2>
          </div>
          <div className=" flex justify-between items-center">
            <label className=" font-medium">Tax :</label>
            <h2>
              ({data.taxPercentage}%) ₹{data.taxAmount}
            </h2>
          </div>
          <div className="h-[2px]  bg-gradient-to-b from-blue-200" />
          <div className=" flex justify-between items-center text-lg">
            <label className=" font-medium">Total :</label>
            <h2>₹{data.total}</h2>
          </div>
        </div>
        {/* notes */}
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <small className="text-start w-full text-gray-700">
            This is a system generated invoice and does not require signature.
          </small>

           <div className="bg-gray-200 w-full p-2">
          <label className=" font-medium">Note </label>
          <p>{data.note}</p>
          </div>

        </div>

        <div className="w-full flex  ">
        <PrintBtn contentref={contentref} />
        <button
          onClick={() => setOpenPreview(false)}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
      </div>

   
    </div>
  );
};

export default Invoice;

const Item = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-3">
      <div className="w-full flex justify-start items-center">
        <h2 className="capitalize">{data.name}</h2>
      </div>
      <div className="w-full flex justify-center items-center">
        <span>{data.quantity}</span>
      </div>
      <div className="w-full flex justify-end items-center">
        <span>Rs.{data.quantity * data.price}</span>
      </div>
    </div>
  );
};
