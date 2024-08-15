import axios from "axios";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import AllUnit from "./AllUnit";

export default function CreateUnit() {
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const componentRef = useRef(null);

  const [formData, setFormData] = useState({
    shortName: "",
    unitName: "",
  });

  const unitData = [
    { unitName: "BAGS" },
    { unitName: "BALE" },
    { unitName: "BUNDLES" },
    { unitName: "BUCKLES" },
    { unitName: "BILLION OF UNITS" },
    { unitName: "BOX" },
    { unitName: "BOTTLES" },
    { unitName: "BUNCHES" },
    { unitName: "CANS" },
    { unitName: "CUBIC METERS" },
    { unitName: "CUBIC CENTIMETERS" },
    { unitName: "CENTIMETERS" },
    { unitName: "CARTONS" },
    { unitName: "DOZENS" },
    { unitName: "DRUMS" },
    { unitName: "GREAT GROSS" },
    { unitName: "GRAMMES" },
    { unitName: "QOSS" },
    { unitName: "GROSS YA DS" },
    { unitName: "KILOGRAMS" },
    { unitName: "KILOLITRE" },
    { unitName: "KILOMETRE" },
    { unitName: "LITRES" },
    { unitName: "MILILITRE" },
    { unitName: "METERS" },
    { unitName: "METRIC TON" },
    { unitName: "NUMBERS" },
    { unitName: "pACKS" },
    { unitName: "PIECES" },
    { unitName: "PAIRS" },
    { unitName: "QUINTAL" },
    { unitName: "ROLLS" },
    { unitName: "SETS" },
    { unitName: "SQUARE FEET" },
    { unitName: "SQUARE METERS" },
    { unitName: "SQUARE YARDS" },
    { unitName: "TABLETS" },
    { unitName: "TEN cposs" },
    { unitName: "THOUSANDS" },
    { unitName: "TONNES" },
    { unitName: "TUBES" },
    { unitName: "US CALLONS" },
    { unitName: "UNITS" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/unit`,
        formData,
        {
          header: {
            "content-type": "application/json",
          },
        }    
      );
      toast.success("Unit Created Successfully");
      location.reload();
    } catch (error) {
      console.log(error, "error");
      toast.error("Unit created unsuccessfully!");
    }
  };

  return (
    <div className="flex relative flex-col justify-center items-center my-4 w-full border bg-white px-4 py-2 rounded-lg shadow">
      <button
        className="bg-blue-700 m-4 self-end text-white hover:bg-blue-600  active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline ease-linear transition-all duration-150"
        type="button"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={() => {
          setShowModal(!showPrintModal);
        }}
      >
        Create Unit
      </button>
      {showModal ? (
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
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="shortName"
                    >
                      Short Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="shortName"
                      name="shortName"
                      placeholder="Enter Short Name"
                      value={formData.shortName}
                      onChange={handleChange}
                      className="p-2 border form-input"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="unitName"
                    >
                      Unit Name
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="unitName"
                      name="unitName"
                      value={formData.unitName}
                      onChange={handleChange}
                      className="p-2 border form-select form-input text-gray-600"
                      required
                    >
                      <option value="" >Select Unit Name</option>
                      {unitData.map((unit, index) => (
                        <option key={index} value={unit.unitName}>
                          {unit.unitName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            </div>
            <div className="flex justify-end py-2 gap-5">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg border border-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AllUnit />
      )}
    </div>
  );
}
