import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import AllItem from "./AllItem";
import { useNavigate } from "react-router-dom";

export default function CreateItem() {

const navigate = useNavigate();

const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    itemGroup: "",
    itemCategory: "",
    unit: "",
    hsnCode: "",
    stockQty: "",
    stockValue: "",
    mrp: "",
    purchase: "",
    sales: "",
    gst: "",
    status: "active",
});

  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = React.useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/item`,
        formData,
        {
          header: {
            "content-type": "application/json",
          },
        }
      );

      toast.success("Item Created Successfully!");
      location.reload();
    } catch (error) {
      console.log(error, "error");
      toast.error("Item created unsuccessfully.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-4 w-full border bg-white px-4 py-2 rounded-lg shadow ">
      <Toaster />
      <button
        className="bg-blue-700 m-4 self-end text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        style={{ display: isVisible ? "block" : "none" }}
        onClick={() => {
          setShowModal(true);
          setIsVisible(false);
        }}
      >
        Create Item
      </button>

      {showModal ? (
        <>
          <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8 py-5 px-4">
            <h2 className="text-xl font-semibold mb-6">New Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="productName"
                >
                  Product Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Enter Product Name"
                  value={formData.productName}
                  onChange={handleChange}
                  className="p-2 border form-input"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="productDescription"
                >
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  placeholder="Enter Product Description"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="p-2 border form-textarea  w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="itemGroup"
                  >
                    Item Group
                  </label>
                  <input
                    type="text"
                    id="itemGroup"
                    name="itemGroup"
                    placeholder="Enter Item Group"
                    value={formData.itemGroup}
                    onChange={handleChange}
                    className="p-2 border form-input"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="itemCategory"
                  >
                    Item Category
                  </label>
                  <input
                    type="text"
                    id="itemCategory"
                    name="itemCategory"
                    placeholder="Enter Item Category"
                    value={formData.itemCategory}
                    onChange={handleChange}
                    className="p-2 border form-input"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="itemCategory"
                  >
                    Unit
                  </label>
                  <input
                    type="text"
                    id="unit"
                    name="unit"
                    placeholder="Enter Item Unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="p-2 border form-input"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="itemCategory"
                  >
                    HSN Code
                  </label>
                  <input
                    type="text"
                    id="hsnCode"
                    name="hsnCode"
                    placeholder="Enter HSN Code"
                    value={formData.hsnCode}
                    onChange={handleChange}
                    className="p-2 border form-input"
                  />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2  gap-4 mb-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="itemCategory"
                    >
                      Opening Stock Qunatity
                    </label>
                    <input
                      type="number"
                      id="stockQty"
                      name="stockQty"
                      placeholder="Enter Stock Qunatity"
                      value={formData.stockQty}
                      onChange={handleChange}
                      className="p-2 border form-input"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="itemCategory"
                    >
                      Opening Stock Value
                    </label>
                    <input
                      type="text"
                      id="stockValue"
                      name="stockValue"
                      placeholder="Enter Stock Value"
                      value={formData.stockValue}
                      onChange={handleChange}
                      className="p-2 border form-input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3  gap-4 mb-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="itemCategory"
                    >
                      MRP
                    </label>
                    <input
                      type="text"
                      id="mrp"
                      name="mrp"
                      placeholder="Enter MRP"
                      value={formData.mrp}
                      onChange={handleChange}
                      className="p-2 border form-input"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="itemCategory"
                    >
                      Purchase Price
                    </label>
                    <input
                      type="text"
                      id="purchase"
                      name="purchase"
                      placeholder="Enter Purchase Price"
                      value={formData.purchase}
                      onChange={handleChange}
                      className="p-2 border form-input"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="itemCategory"
                    >
                      Sales Price
                    </label>
                    <input
                      type="text"
                      id="sales"
                      name="sales"
                      placeholder="Enter Sales Price"
                      value={formData.sales}
                      onChange={handleChange}
                      className="p-2 border form-input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="itemCategory"
                  >
                    GST
                  </label>
                  <select
                    className="p-2 border form-input mb-4"
                    name="gst"
                    onChange={handleChange}
                    value={formData.gst}
                  >
                    <option value="0%">0%</option>
                    <option value="0.1%">0.1%</option>
                    <option value="0.2%">0.2%</option>
                    <option value="0.5%">0.5%</option>
                    <option value="1%">1%</option>
                    <option value="1.5%">1.5%</option>
                    <option value="3%">3%</option>
                    <option value="5%">5%</option>
                    <option value="6%">6%</option>
                    <option value="7.5%">7.5%</option>
                    <option value="12%">12%</option>
                    <option value="18%">18%</option>
                    <option value="28%">28%</option>
                    <option value="Exmpted">Exmpted</option>
                    <option value="nogst">nogst</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="itemCategory"
                  >
                    Status
                  </label>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-2 ">
                      <input
                        type="radio"
                        id="status"
                        name="status"
                        value="active"
                        checked={formData.status === "active"}
                        onChange={handleChange}
                      />
                      <label htmlFor="status">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2 ">
                      <input
                        type="radio"
                        id="status"
                        name="status"
                        value="inactive"
                        checked={formData.status === "inactive"}
                        onChange={handleChange}
                      />
                      <label htmlFor="status">No</label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className=" border border-blue-500 text-blue-500 item-center  px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <AllItem />
        </>
      )}
    </div>
  );
}
