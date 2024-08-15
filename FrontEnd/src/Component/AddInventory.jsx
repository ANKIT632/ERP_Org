import { AiOutlineRightCircle } from "react-icons/ai";
import { BsPercent } from "react-icons/bs";
import React, { useState } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS

export default function AddInventory() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="flex justify-center my-4 items-center">
      <button
        className="bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add inventory
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-7xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add inventory</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="">
                  <Inventory setShowModal={setShowModal} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

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

const Inventory = ({ setShowModal }) => {
  const [item, setItem] = useState({
    name: "",
    code: "",
    category: "",
    subCategory: "",
    quantity: 0,
    unit: {},
    store: "",
    stdCost: "",
    purchCost: "",
    stdSaleCost: "",
    description: "",
    internalNotes: "",
    hsnSac: "",
    gst: "",
    minStock: 0,
    leadTime: 0,
    itemType: {},
  });

  const unit = [
    { name: "cm" },
    { name: "ft" },
    { name: "g" },
    { name: "in" },
    { name: "kg" },
    { name: "km" },
    { name: "m" },
    { name: "mg" },
    { name: "mm" },
    { name: "no.s" },
    { name: "pcs" },
  ];
  const itemType = [
    { name: "Products" },
    { name: "Materials" },
    { name: "Spares" },
    { name: "Assemblies" },
  ];
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmission = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/create-inventory`,
        item,
        {
          header: {
            "content-type": "application/json",
          },
        }
      );
      console.log(res, "inventory poststtttt");
      if (res.item.inventoryAlreadyExist) {
        toast.error("code already exists", toastOptions);
        setShowModal(false);
      }
      toast.success("Inventory successfully!", toastOptions);
      setShowModal(false);
    } catch (error) {
      console.log(error, "inventoryu post errror");
      toast.error("invnetory unsuccessfully.", toastOptions);
      setShowModal(false);
    }
  };

  const customDropdownStyle = {
    backgroundColor: "white", // Change to desired background color
  };

  return (
    <section className="bg-blueGray-50">
      <div className="w-full rounded mx-auto h-full ">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 h-full  bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-2xl font-bold pl-5">
                Enter Item
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmission}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className=" peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline  outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                    placeholder=" "
                    value={item.name}
                    onChange={handleChange}
                    id="name"
                    name="name"
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                    Name
                  </label>
                </div>
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                    placeholder=" "
                    value={item.code}
                    onChange={handleChange}
                    id="code"
                    name="code"
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                    Code
                  </label>
                </div>
                <div className="flex sm:gap-4 md:gap-7 gap-4 2xl:gap-10  sm:flex-col md:flex-row flex-col">
                  <div className="relative w-1/2 min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                      placeholder=" "
                      value={item.category}
                      onChange={handleChange}
                      id="category"
                      name="category"
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                      Category
                    </label>
                  </div>
                  <div className="relative w-4/3 min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                      placeholder=" "
                      value={item.subCategory}
                      onChange={handleChange}
                      id="subCategory"
                      name="subCategory"
                      type="text"
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                      Sub-Category
                    </label>
                  </div>
                  <div className="flex ">
                    <div className="relative w-1/2 md:min-w-[200px] min-w-[100px] sm:min-w-[100px] h-10 ">
                      <input
                        className="peer w-1/2 absolute right-[100px] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                        placeholder=" "
                        value={item.quantity}
                        onChange={handleChange}
                        id="quantity"
                        name="quantity"
                        type="number"
                      />
                      <label className="flex w-1/2 h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                        Quantity
                      </label>
                    </div>
                    <div
                      style={{ width: "100px", height: "40px" }}
                      className="peer ml-7 w-full sm:w-1/2 h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                    >
                      <Dropdown
                        value={item.unit}
                        onChange={handleChange}
                        options={unit}
                        optionLabel="name"
                        name="unit"
                        placeholder="Unit"
                        className="w-full md:w-14rem h-full rounded-[7px]"
                      />
                    </div>
                  </div>
                  <div className="relative w-1/2 xl:min-w-[355px] min-w-[150px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                      placeholder=" "
                      value={item.store}
                      onChange={handleChange}
                      id="store"
                      name="store"
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                      Store
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex ">
                <div className="flex-1 flex md:grid-cols-4 gap-10 items-center">
                  <div style={{ width: "200px" }}>
                    <div>
                      <div className="border border-[#ccc] rounded px-1">
                        <label style={{ marginRight: "5px" }}>₹</label>
                        <input
                          style={{ width: "calc(100% - 15px)" }}
                          value={item.purchCost}
                          onChange={handleChange}
                          id="purchCost"
                          name="purchCost"
                          placeholder="Std. Cost"
                          x
                          type="number"
                          className="p-1 rounded border-l border-[#ccc] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "200px" }}>
                    <div>
                      <div className="border border-[#ccc] rounded px-1">
                        <label style={{ marginRight: "5px" }}>₹</label>
                        <input
                          style={{ width: "calc(100% - 15px)" }}
                          value={item.stdCost}
                          onChange={handleChange}
                          id="stdCost"
                          name="stdCost"
                          type="number"
                          placeholder="Purch. Cost"
                          className="p-1 rounded border-l border-[#ccc] focus:outline-none "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex ml-4 md:grid-cols-4 gap-10 items-center">
                  <div style={{ width: "200px" }}>
                    <div>
                      <div className="border border-[#ccc] rounded px-1">
                        <label style={{ marginRight: "5px" }}>₹</label>
                        <input
                          style={{ width: "calc(100% - 15px)" }}
                          value={item.stdSaleCost}
                          onChange={handleChange}
                          id="stdSaleCost"
                          name="stdSaleCost"
                          placeholder="Std Sale Cost"
                          type="number"
                          className="p-1 rounded border-l border-[#ccc] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{ width: "200px", height: "40px" }}
                      className="peer w-full sm:w-1/2 h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                    >
                      <Dropdown
                        value={item.itemType}
                        onChange={handleChange}
                        options={itemType}
                        optionLabel="name"
                        name="itemType"
                        placeholder="Items Type"
                        className="w-full md:w-14rem h-full bg-white rounded-[7px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-screeen flex flex-col sm:flex-col md:flex-row pt-3 gap-4">
                <div className="sm:w-screen md:w-1/2 mt-2 relative">
                  <textarea
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                    style={{ resize: "none" }}
                    value={item.description}
                    onChange={handleChange}
                    id="description"
                    name="description"
                    rows="4"
                    placeholder=" "
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                    Description
                  </label>
                </div>

                <div className="sm:w-screen md:w-1/2 mt-2 relative">
                  <textarea
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                    style={{ resize: "none" }}
                    value={item.internalNotes}
                    onChange={handleChange}
                    id="internalNotes"
                    name="internalNotes"
                    rows="4"
                    placeholder=" "
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                    Notes
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pb-3 pt-4 flex-col sm:flex-col md:flex-row">
                <div className="flex justify-center items-center gap-3">
                  <div className="relative w-1/2 min-w-[200px] h-10">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                      value={item.hsnSac}
                      onChange={handleChange}
                      id="hsnSac"
                      name="hsnSac"
                      type="text"
                      placeholder=" "
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                      HSN
                    </label>
                  </div>

                  <div className=" min-w-[200px] h-10 flex justify-center gap-1 items-center">
                    <div className="relative w-1/2 min-w-[200px] h-10">
                      <input
                        value={item.gst}
                        onChange={handleChange}
                        id="gst"
                        name="gst"
                        type="text"
                        placeholder=" "
                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                      />

                      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                        GST
                      </label>
                    </div>
                    <BsPercent size={25} />
                  </div>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <div className="relative w-1/2 min-w-[200px] h-10">
                    <input
                      value={item.minStock}
                      onChange={handleChange}
                      id="minStock"
                      name="minStock"
                      type="number"
                      placeholder=""
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                      Min Stock
                    </label>
                  </div>

                  <div className="relative w-1/2 min-w-[200px] h-10">
                    <input
                      value={item.leadTime}
                      onChange={handleChange}
                      id="leadTime"
                      name="leadTime"
                      type="number"
                      placeholder=" "
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-400"
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-blue-400 before:border-blue-gray-200 peer-focus:before:!border-blue-400 after:border-blue-gray-200 peer-focus:after:!border-blue-400">
                      Lead Time
                    </label>
                  </div>
                </div>

                <div>{/* //itemType */}</div>
              </div>
              <div className="w-full flex justify-start items-center mt-4">
                <button
                  type="submit"
                  className="bg-green-600 flex justify-center items-center text-white active:bg-green-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg gap-2 outline-none focus:outline-none mr-1 mb-1 w-full max-w-[160px] ease-linear transition-all duration-150 "
                >
                  Submit
                  <AiOutlineRightCircle size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
