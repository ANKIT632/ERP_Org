/* eslint-disable react/prop-types */
import { BiFastForward } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import Invoice from "../Component/InvoiceComponent";
import axios from "axios";
// import { toast, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import toast, { Toaster } from 'react-hot-toast';

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

function InvoicePage() {
  const ref = useRef();

  const [openPreview, setOpenPreview] = useState(false);

  const initialData = {
    date: "",
    invoiceNumber: 1,
    billFrom: {
      name: "Webseeder Tech",
      email: "Webseeder@webseeder.in",
      address: "7, TRINITY TOWER, INDORE(M.P)",
      gstNumber: "23AMLLO1300G1Z8",
    },
    billTo: {
      name: "",
      email: "",
      address: "",
      gstNumber: "",
      contactNumber: "",
    },
    items: [{ name: "", description: "", quantity: "1", price: 0 }],
    discountPercentage: 0,
    discountAmount: 0,
    taxPercentage: 0,
    taxAmount: 0,
    total: 0,
    subTotal: 0,
    note: "",
    isPaid: true,
  };

  const [data, setData] = useState(initialData);
  const [id, setId] = useState("");

  const [inventortyData, setInventoryData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [inventoryId, setInventoryId] = useState(0);
  const [newQuantity, setNewQuantity] = useState(0);

  console.log(newQuantity, "newQuantity");
  console.log(inventoryId, "inventory Id");

  useEffect(() => {
    (async () => {
      const userToken = await localStorage.getItem("erp_admin_token");
      const inventory = jwtDecode(userToken);
      setId(inventory.id);
      // console.log(id);
      let res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/all-inventory/${id}`);
      setInventoryData(res.data);
    })();
  }, [id]);

  console.log(inventortyData, "inventoru data");

  const handleSubmission = async () => {
    //
    const { date, invoiceNumber, billTo } = data;
    const { name, email, address, gstNumber, contactNumber } = billTo;
    if (
      name ==="" ||
      email === "" ||
      address === "" ||
      gstNumber === "" ||
      contactNumber === "" ||
      date === "" ||
      invoiceNumber === ""
    ) {
      toast.error('Fill all the required fields', {
        id : "heh"
      })
      
      return;
    }

    setOpenPreview(true);
    window.scrollTo(0, 0);

    //
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/create-invoice`, data, {
        header: {
          "content-type": "application/json",
        },
      });
      if (res.data.invoiceAlreadyExist) {
        toast.error("invoice already exists", toastOptions);
        return;
      }
      if (res.data.data.token) {
        toast.success("invoice successfully!", toastOptions);
      } else {
        toast.error("try again", toastOptions);
      }
    } catch (error) {
      // toast.error("Registration unsuccessfully.", toastOptions);
    }
  };
  console.log(quantity, "dataquantity");

  const handleClickChange = async (inventoryId, newQuantity) => {
    try {
      const selectedItem = inventortyData.find((item) => item._id === inventoryId);
      const updatedQuantity = selectedItem.quantity - newQuantity;
      // console.log(updatedQuantity, "updateed qunatity")
      // console.log(selectedItem, "selectedItem selectedItem")

      const data = {
        quantity: updatedQuantity,
      };

      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/${id}/update-inventory/${inventoryId}`,
        data,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // Update inventortyData in state after successful update
      setInventoryData((prevState) =>
        prevState.map((item) =>
          item._id === inventoryId ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleClickAddQunatity = async (inventoryId, newQuantity) => {
    try {
      const selectedItem = inventortyData.find((item) => item._id === inventoryId);
      console.log(newQuantity, "newQuantity");
      const updatedQuantity = parseInt(selectedItem.quantity) + parseInt(newQuantity);
      console.log(updatedQuantity, "updateed qunatity");
      console.log(selectedItem, "selectedItem selectedItem");

      const data = {
        quantity: updatedQuantity,
      };

      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/${id}/update-inventory/${inventoryId}`,
        data,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // Update inventortyData in state after successful update
      setInventoryData((prevState) =>
        prevState.map((item) =>
          item._id === inventoryId ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  useEffect(() => {
    // Calculate subtotal
    const subTotal = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Calculate discount amount in Rs
    const discountAmount = (subTotal * data.discountPercentage) / 100;

    // Calculate tax amount in Rs
    const taxAmount = (subTotal * data.taxPercentage) / 100;

    // Calculate total
    const total = subTotal + taxAmount - discountAmount;

    // Update state with calculated values
    // Update state with calculated values
    setData((prevData) => ({
      ...prevData,
      subTotal,
      discountAmount,
      taxAmount,
      total,
    }));
  }, [data.items, data.discountPercentage, data.taxPercentage]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDeleteItem = (index) => {
    const updatedItems = [...data.items];
    updatedItems.splice(index, 1); // Remove item at given index
    setData({ ...data, items: updatedItems });
    handleClickAddQunatity(inventoryId, newQuantity);
  };

  return (
    <>
    <Toaster
      
    />
      <div className="w-full relative z-10 flex flex-col 2xl:flex-row justify-center sm:items-center md:items-center py-4 gap-2">
        <div
          className="min-h-[70vh] max-w-6xl bg-gray-50 flex flex-col justify-start items-center sm:items-stretch  py-2 px-8 gap-8"
          ref={ref}
        >
          {/* date and invoice number */}
          <div className="flex justify-between items-center w-full">
            <div className="space-x-2">
              <label className="capitalize font-medium">date :</label>
              <input
                onChange={(e) => setData({ ...data, date: e.target.value })}
                value={data.date}
                type="date"
                className="bg-white shadow px-2 py-1 rounded"
              />
            </div>
            <div className="space-x-2">
              <label className="capitalize font-medium">invoice number :</label>
              <input
                type="number"
                className="bg-white shadow px-2 py-1 rounded w-20"
                value={data.invoiceNumber}
                onChange={(e) => setData({ ...data, invoiceNumber: e.target.value })}
              />
            </div>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-b from-gray-200" />
          {/* bill from and bill to */}
          <div className="flex max-sm:flex-col justify-between items-start w-full gap-8">

            <div className="w-full space-y-4 ">
              <label className="capitalize font-medium block">Bill From :</label>
              <div className="flex flex-col justify-center items-start gap-2 w-full">
                <input
                  type="text"
                  className="bg-white  shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  placeholder="who is this invoice from"
                  name="name"
                  disabled
                  value={"Webseeder Tech"}
                />
                <input
                  type="text"
                  className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  placeholder="email address"
                  name="email"
                  disabled
                  value={"Webseeder@webseeder.in"}
                />
                <input
                  type="text"
                  className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  placeholder="GST number"
                  name="gstNumber"
                  disabled
                  value={"23AMLLO1300G1Z8"}
                />
                <input
                  type="text"
                  className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  placeholder="billing address"
                  name="address"
                  disabled
                  value={"7, TRINITY TOWER, INDORE(M.P)"}
                />
              </div>
            </div>

            <div className="w-full space-y-4">
              <label className="capitalize font-medium block">Bill to :</label>
              <div className="flex flex-col justify-center items-start gap-2 w-full">
                <input
                  type="text"
                  className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  name="name"
                  onChange={(e) =>
                    setData({
                        ...data,
                        billTo: {
                            ...data.billTo,
                            [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()
                        }
                    })
                }
                
                  value={data.billTo.name}
                  placeholder="who is this invoice from"
                />
                <input
                  type="text"
                  className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  name="email"
                  onChange={(e) =>
                    setData({
                      ...data,
                      billTo: {
                        ...data.billTo,
                        [e.target.name]: e.target.value, // Assuming input name attributes match the property names in billTo
                      },
                    })
                  }
                  value={data.billTo.email}
                  placeholder="email address"
                />
                <input
                  type="text"
                  className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  name="gstNumber"
                  onChange={(e) =>
                    setData({
                      ...data,
                      billTo: {
                        ...data.billTo,
                        [e.target.name]: e.target.value, // Assuming input name attributes match the property names in billTo
                      },
                    })
                  }
                  value={data.billTo.gstNumber}
                  placeholder="GST number"
                />
                <input
                  type="number"
                  className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  name="contactNumber"
                  onChange={(e) =>
                    setData({
                      ...data,
                      billTo: {
                        ...data.billTo,
                        [e.target.name]: e.target.value, // Assuming input name attributes match the property names in billTo
                      },
                    })
                  }
                  value={data.billTo.contactNumber}
                  placeholder="contact number"
                />
                <input
                  type="text"
                  className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
                  name="address"
                  onChange={(e) =>
                    setData({
                      ...data,
                      billTo: {
                        ...data.billTo,
                        [e.target.name]: e.target.value, // Assuming input name attributes match the property names in billTo
                      },
                    })
                  }
                  value={data.billTo.address}
                  placeholder="billing address"
                />
              </div>
            </div>
          </div>
          <div className="h-[2px] w-full bg-gradient-to-b from-gray-200" />
          {/* items list */}
          <div className="w-full space-y-4">
            {data.items.map((item, index) => {
              return (
                <Item
                  key={index}
                  item={item}
                  data={data}
                  setData={setData}
                  index={index}
                  setQuantity={setQuantity}
                  handleDeleteItem={handleDeleteItem}
                  inventortyData={inventortyData}
                  setInventoryId={setInventoryId}
                  handleClickChange={handleClickChange}
                  setNewQuantity={setNewQuantity}
                />
              );
            })}
            <button
              onClick={() => {
                setData({
                  ...data,
                  items: [...data.items, { name: "", description: "", quantity: "1", price: 0 }],
                });
                // Add additional functionality here if needed
                handleClickChange(inventoryId, newQuantity);
              }}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-700 text-white rounded"
            >
              Add Item
            </button>
          </div>
          {/* total & sub-total */}

          <div className="w-full flex flex-col justify-start items-end gap-2">
            <div className="min-w-96 flex justify-between items-center">
              <label className="capitalize font-medium">Subtotal :</label>
              <h2>₹{data.subTotal}</h2>
            </div>
            <div className="min-w-96 flex justify-between items-center">
              <label className=" font-medium">Discount :</label>
              <h2>
                ({data.discountPercentage}%) ₹{data.discountAmount}
              </h2>
            </div>

            <div className="min-w-96 flex justify-between items-center">
              <label className="capitalize font-medium">Tax :</label>
              <h2>
                ({data.taxPercentage}%) ₹{data.taxAmount}
              </h2>
            </div>
            <div className="h-[2px] min-w-96 bg-gradient-to-b from-blue-200" />
            <div className="min-w-96 flex justify-between items-center text-lg">
              <label className="capitalize font-medium">Total :</label>
              <h2>₹{data.total}</h2>
            </div>
          </div>
          {/* note */}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <label className="capitalize font-medium">note :</label>
            <textarea
              type="text"
              value={data.note}
              className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded w-full"
              placeholder="write a note here"
              onChange={(e) => setData({ ...data, note: e.target.value })}
            />
          </div>
        </div>
        {/* yha div dala mene  */}

        {/* right section */}
        <div className="flex  flex-col">
          <div className="max-w-6xl bg-gray-200 p-10">
            <h1 className="font-bold text-lg">Available Items In Inventory</h1>
            <table className="w-full mt-4 border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-4 py-2">Name</th>
                  <th className="border border-gray-400 px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventortyData.map((item, index) => (
                  <tr key={index} className="border border-gray-400">
                    <td className="border border-gray-400 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" p-4 md-w-20 bg-gray-100 sticky top-4 rounded  space-y-4 p-2 ">
            <div className="space-y-2">
              <label className="capitalize font-medium block">tax(%) :</label>
              <input
                type="number"
                className="bg-white shadow px-2 py-1 rounded w-full"
                value={data.taxPercentage}
                onChange={(e) => setData({ ...data, taxPercentage: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="capitalize font-medium block">discount(%) :</label>
              <input
                type="number"
                className="bg-white shadow px-2 py-1 rounded w-full"
                value={data.discountPercentage}
                onChange={(e) => setData({ ...data, discountPercentage: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="capitalize font-medium block">is the bill Paid? :</label>
              <button
                className={`${
                  data.isPaid ? "bg-green-600" : "bg-red-600"
                } px-4 py-1 rounded text-white w-full`}
                onClick={(e) => setData({ ...data, isPaid: !data.isPaid })}
              >
                {data.isPaid ? "PAID" : "UNPAID"} <label>(click to change)</label>
              </button>
            </div>
            <button
              onClick={() => {
                handleSubmission();
                // handleClickChange();
              }}
              className="px-6 py-2 bg-gray-800 text-white rounded flex justify-center items-center gap-4 w-full"
            >
              Continue <BiFastForward className="text-xl" />
            </button>
          </div>
        </div>
        <Invoice
          data={data}
          contentref={ref}
          openPreview={openPreview}
          setOpenPreview={setOpenPreview}
        />
      </div>
    </>
  );
}

export default InvoicePage;

const Item = ({
  item,
  data,
  setData,
  index,
  handleDeleteItem,
  setQuantity,
  inventortyData,
  handleClickChange,
  setNewQuantity,
  setInventoryId,
}) => {
  return (
   
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="capitalize font-medium block">Item :</label>
          <div className="flex flex-col w-full">
            <select
              className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded min-w-96"
              onChange={(e) => {
                const selectedItem = inventortyData.find((item) => item.name === e.target.value);
                const updatedItems = [...data.items];
                updatedItems[index] = {
                  ...updatedItems[index],
                  id: selectedItem._id,
                  name: selectedItem.name,
                };
                setInventoryId(selectedItem._id);
                setData({ ...data, items: updatedItems });
                setQuantity(selectedItem.quantity);
              }}
              value={item.name}
            >
              <option value="">Select Item</option>
              {inventortyData.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded mt-2"
              placeholder="Item Description"
              onChange={(e) => {
                const updatedItems = [...data.items];
                updatedItems[index] = {
                  ...updatedItems[index],
                  description: e.target.value,
                };
                setData({ ...data, items: updatedItems });
              }}
              value={item.description}
            />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/4">
          <label className="capitalize font-medium block">Quantity :</label>
          <input
            type="number"
            className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded mt-2"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => {
              const updatedItems = [...data.items];
              updatedItems[index] = {
                ...updatedItems[index],
                quantity: e.target.value,
              };
              setNewQuantity(e.target.value);
              setData({ ...data, items: updatedItems });
            }}
          />
          {item.name && (
            <p className="mt-2">
              Available Quantity:{" "}
              {inventortyData.find((inventoryItem) => inventoryItem.name === item.name)?.quantity}
            </p>
          )}
        </div>

        <div className="flex flex-col w-full md:w-1/4">
          <label className="capitalize font-medium block">Price/Rate :</label>
          <input
            type="number"
            className="bg-white shadow px-2 py-1 placeholder:text-gray-500 rounded mt-2"
            placeholder="Price/Rate"
            value={item.price}
            onChange={(e) => {
              const updatedItems = [...data.items];
              updatedItems[index] = {
                ...updatedItems[index],
                price: e.target.value,
              };
              setData({ ...data, items: updatedItems });
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-4 md:mt-0">
          {console.log(index, "ondelete")}
          <button
            onClick={() => handleDeleteItem(index)}
            className="p-2 bg-red-400 text-white text-2xl rounded-full"
          >
            <AiFillDelete />
          </button>
        </div>
      </div>
      <div className="h-[2px] w-full bg-gradient-to-b from-blue-100" />
    </>
  );
};
