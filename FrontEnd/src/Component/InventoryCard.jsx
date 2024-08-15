import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dropdown } from "primereact/dropdown";

const InventoryCard = (props) => {
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

  const itemType = [
    { name: "Products" },
    { name: "Materials" },
    { name: "Spares" },
    { name: "Assemblies" },
  ];

  const [inventoryData, setInventoryData] = useState([]);
  const [editingInventoryId, setEditingInventoryId] = useState(null);
  const [editingInventoryData, setEditingInventoryData] = useState(null);

  const handleUpdateInventory = async (inventoryId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/${
          props.userId
        }/update-inventory/${inventoryId}`,
        editingInventoryData
      );
      setInventoryData((prevInventoryData) =>
        prevInventoryData.map((inventory) =>
          inventory._id === inventoryId
            ? { ...editingInventoryData }
            : inventory
        )
      );
      setEditingInventoryData(null);
      setEditingInventoryId(null);
      toast.success("Inventory updeted successfully!", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(
        "An error occurred while updating the inventory.",
        toastOptions
      );
    }
  };

  const handleDeleteInventory = async (userId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/${
          props.userId
        }/delete-inventory/${userId}`
      );
      setInventoryData((prevInventoryData) =>
        prevInventoryData.filter((user) => user._id !== userId)
      );
      window.location.reload();
      toast.success("inventory deleted successfully", toastOptions);
    } catch (error) {
      toast.error(
        "An error occurred while deleting the inventory.",
        toastOptions
      );
    }
  };

  const toggleEditField = (userId) => {
    if (editingInventoryId === userId) {
      setInventoryData((prevInventoryData) =>
        prevInventoryData.map((user) =>
          user._id === userId ? { ...editingInventoryData } : user
        )
      );
      setEditingInventoryData(null);
      setEditingInventoryId(null);
    } else {
      const userToEdit = inventoryData.find((user) => user._id === userId);
      setEditingInventoryData({ ...userToEdit });
      setEditingInventoryId(userId);
    }
  };
  const cancelEdit = () => {
    setEditingInventoryData(null);
    setEditingInventoryId(null);
  };

  return (
    <div className="max-w-[700px] w-full bg-white rounded-lg shadow-sm shadow-black">
      <div className="flex justify-between items-center bg-blue-900 px-4 py-3 rounded-t-lg border-b text-white border-black shadow-sm shadow-gray-400">
        <p className="text-white font-semibold uppercase ">
          <span className="text-sm ">Code{" "}</span>:
          {editingInventoryId === props.id ? (
            <input
              className="w-[100px] focus:outline-blue-400 text-black rounded ml-1 px-1.5 "
              type="text"
              value={editingInventoryData.code || props.code}
              onChange={(e) =>
                setEditingInventoryData({
                  ...editingInventoryData,
                  code: e.target.value,
                })
              }
            />
          ) : (
            <span className="pl-1">{props.code}</span>
          )}
        </p>
        <p className="text-white">{props.date}</p>
      </div>
      <div className="sm:px-6 p-3">
        <div className="flex text-sm md:text-base text-gray-600 justify-start">
          <span className="md:ml-4 sm:ml-1 text-base font-semibold md:text-4xl ">
            {editingInventoryId === props.id ? (
              <input
                className="text-black max-w-[200px] w-full focus:outline-blue-400 rounded"
                type="text"
                value={editingInventoryData.name}
                defaultValue={props.name}
                onChange={(e) =>
                  setEditingInventoryData({
                    ...editingInventoryData,
                    name: e.target.value,
                  })
                }
              />
            ) : (
              props.name
            )}
          </span>
        </div>
        <div className="flex justify-start items-center mt-1">
          <p className="text-sm md:text-base md:ml-5 sm:ml-2 ">
            <span className="uppercase">Category :</span>
            <span className="md:ml-4 text-base font-semibold md:text-lg">
              {editingInventoryId === props.id ? (
                <input
                  className={`text-black max-w-[200px] border border-zinc-300 px-2 w-full focus:outline-blue-400 rounded `}
                  type="text"
                  value={editingInventoryData.category}
                  defaultValue={props.category}
                  onChange={(e) =>
                    setEditingInventoryData({
                      ...editingInventoryData,
                      category: e.target.value,
                    })
                  }
                />
              ) : (
                props.category
              )}
            </span>
          </p>
        </div>
        <div className="border px-8 py-2 border-zinc-400 rounded-xl mt-2">
          <div className="mb-4 flex items-center">
            <p className="flex w-1/2 text-sm md:text-base text-gray-600">
              <span className="uppercase underline underline-offset-2">
                Quantity:
              </span>
              <span className="md:ml-4 sm:ml-1 text-base font-semibold md:text-lg">
                {editingInventoryId === props.id ? (
                  <input
                    className="text-black max-w-[138px] pl-2 border border-zinc-300 w-full focus:outline-blue-400 rounded "
                    type="text"
                    value={editingInventoryData.quantity}
                    defaultValue={props.quantity}
                    onChange={(e) =>
                      setEditingInventoryData({
                        ...editingInventoryData,
                        quantity: e.target.value,
                      })
                    }
                  />
                ) : (
                  props.quantity
                )}
              </span>
            </p>

            {/* yha pr dropdown lagana hai  */}
            <p className="ml-4 flex w-1/2 text-sm md:text-base text-gray-600 ">
              <span className="uppercase underline underline-offset-2">
                Type:
              </span>
              <span className="md:ml-4 sm:ml-1  text-sm font-semibold md:text-lg">
                {" "}
                {editingInventoryId === props.id ? (
                  <Dropdown
                    value={editingInventoryData.itemType}
                    onChange={(e) =>
                      setEditingInventoryData({
                        ...editingInventoryData,
                        itemType: e.target.value,
                      })
                    }
                    options={itemType}
                    optionLabel="name"
                    placeholder={props.itemType}
                    className="text-black max-w-[200px] w-full border border-zinc-300 h-[30px] items-center focus:outline-blue-400 rounded"
                  />
                ) : (
                  props.itemType
                )}
              </span>
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <p className="text-sm w-1/2 md:text-base text-gray-600 text-left">
              <span className="uppercase underline underline-offset-2">
                Min Stock:
              </span>

              <span className="md:ml-4 sm:ml-1 text-base font-semibold md:text-lg">
                {editingInventoryId === props.id ? (
                  <input
                    className="text-black max-w-[130px] border border-zinc-300 px-2 w-full focus:outline-blue-400 rounded "
                    type="text"
                    value={editingInventoryData.minStock}
                    defaultValue={props.minStock}
                    onChange={(e) =>
                      setEditingInventoryData({
                        ...editingInventoryData,
                        minStock: e.target.value,
                      })
                    }
                  />
                ) : (
                  props.minStock
                )}
              </span>
            </p>
            <p className="ml-4 text-sm w-1/2 md:text-base text-gray-600 text-left">
              <span className="uppercase underline underline-offset-2">
                Lead Time:
              </span>
              <span className="md:ml-4 sm:ml-1 text-base font-semibold md:text-lg">
                {editingInventoryId === props.id ? (
                  <input
                    className="text-black max-w-[130px] border border-zinc-300 px-2 w-full focus:outline-blue-400 rounded "
                    type="text"
                    value={editingInventoryData.leadTime}
                    defaultValue={props.leadTime}
                    onChange={(e) =>
                      setEditingInventoryData({
                        ...editingInventoryData,
                        leadTime: e.target.value,
                      })
                    }
                  />
                ) : (
                  props.leadTime
                )}
              </span>
            </p>
          </div>
          <div className="mb-2 flex items-center">
            <p className=" flex text-sm w-1/2 md:text-base text-gray-600 text-left ">
              <span className="uppercase underline underline-offset-2">
                GST:
              </span>
              <span className="md:ml-4 sm:ml-1 text-base font-semibold md:text-lg">
                {editingInventoryId === props.id ? (
                  <input
                    className="text-black max-w-[130px] w-full border border-zinc-300 px-2 focus:outline-blue-400 rounded "
                    type="text"
                    value={editingInventoryData.gst}
                    defaultValue={props.gst}
                    onChange={(e) =>
                      setEditingInventoryData({
                        ...editingInventoryData,
                        gst: e.target.value,
                      })
                    }
                  />
                ) : (
                  props.gst
                )}
              </span>
            </p>
            <p className="ml-4 flex text-sm w-1/2 md:text-base text-gray-600 text-left ">
              <span className="uppercase underline underline-offset-2">
                Store:
              </span>
              <span className="md:ml-4 sm:ml-1 text-base font-semibold md:text-lg">
                {editingInventoryId === props.id ? (
                  <input
                    className="text-black max-w-[150px] w-full border border-zinc-300 px-2 focus:outline-blue-400 rounded "
                    type="text"
                    value={editingInventoryData.store}
                    defaultValue={props.store}
                    onChange={(e) =>
                      setEditingInventoryData({
                        ...editingInventoryData,
                        store: e.target.value,
                      })
                    }
                  />
                ) : (
                  props.store
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col justify-between items-center mt-3 border-t border-gray-400 pt-2">
          <div className="flex flex-col justify-start items-start">
            <div className="text-sm md:text-sm sm:text-sm text-gray-800 font-semibold">
              <span className="uppercase">
                Pur. Cost:
              </span>
              <span className="md:ml-4 sm:ml-1 text-sm font-semibold md:text-base">
                {editingInventoryId === props.id ? (
                  <input
                    className="text-black max-w-[100px] border border-zinc-300 px-2 w-full focus:outline-blue-400 rounded "
                    type="text"
                    value={editingInventoryData.purchCost}
                    defaultValue={props.purchCost}
                    onChange={(e) =>
                      setEditingInventoryData({
                        ...editingInventoryData,
                        purchCost: e.target.value,
                      })
                    }
                  />
                ) : (
                  props.purchCost
                )}
              </span>
            </div>
            <div className="text-sm text-gray-800 font-semibold mt-0.5">
              <span className="uppercase ">
                STd. sale Cost:
              </span>
              <span className="md:ml-4 sm:ml-1 text-sm font-semibold md:text-base">
                {editingInventoryId === props.id ? (
                  <input
                    className="text-black max-w-[100px] w-full border border-zinc-300 px-2 focus:outline-blue-400 rounded "
                    type="text"
                    value={editingInventoryData.stdSaleCost}
                    defaultValue={props.stdSaleCost}
                    onChange={(e) =>
                      setEditingInventoryData({
                        ...editingInventoryData,
                        stdSaleCost: e.target.value,
                      })
                    }
                  />
                ) : (
                  props.stdSaleCost
                )}
              </span>
            </div>
          </div>
          {/* <p className={props.isPaid ? 'text-green-600' : 'text-red-600'}>
                {props.isPaid ? <span className='px-3 py-1 bg-green-200 rounded-md'>Paid</span> : <span className='px-3 py-1 bg-red-200 rounded-md'>Unpaid</span>}
              </p> */}
          {editingInventoryId === props.id ? (
            <div className="flex justify-center space-x-2">
              <i
                className="fa-solid fa-check hover:text-green-500 cursor-pointer"
                onClick={() => handleUpdateInventory(props.id)}
              >
                <AiOutlineCheck />
              </i>
              <i
                className="fa-solid fa-xmark hover:text-red-500 cursor-pointer"
                onClick={cancelEdit}
              >
                <AiOutlineClose />
              </i>
            </div>
          ) : (
            <div className="flex justify-center space-x-2">
              <i
                className="fa-solid fa-user-pen hover:text-blue-500 cursor-pointer"
                onClick={() => toggleEditField(props.id)}
              >
                <BiEditAlt />
              </i>
              <i
                className="fa-solid fa-trash hover:text-red-500 cursor-pointer"
                onClick={() => handleDeleteInventory(props.id)}
              >
                <AiOutlineDelete />
              </i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
