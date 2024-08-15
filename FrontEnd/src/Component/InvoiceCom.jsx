import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Table = ({ items }) => {
  return (
    <table className="min-w-full bg-white border-collapse ">
      <thead>
        <tr>
          <th className="text-sm md:text-base text-gray-600">Sno.</th>
          <th className="text-sm md:text-base text-gray-600">Items</th>
          <th className="text-sm md:text-base text-gray-600">Quantity</th>
          <th className="text-sm md:text-base text-gray-600">Each Price</th>
          <th className="text-sm md:text-base text-gray-600">Total Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="text-sm md:text-base text-gray-600">{index + 1}</td>
            <td className="text-sm md:text-base text-gray-600">{item.name}</td>
            <td className="text-sm md:text-base text-gray-600">
              {item.quantity}
            </td>
            <td className="text-sm md:text-base text-gray-600">{item.price}</td>
            <td className="text-sm md:text-base text-gray-600">
              {item.quantity * item.price} /-
            </td>
          </tr>
        ))}
      </tbody>
      <div></div>
    </table>
  );
};

function InvoiceCom(props) {
  const [invoiceData, setInvoiceData] = useState([]);
  const [editingInvoiceData, setEditingInvoiceData] = useState(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);


  const handleUpdateInvoice = async (invoiceId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/${props.userId}/update-invoice/${invoiceId}`,
        editingInvoiceData
      );
      setInvoiceData((prevInvoiceData) =>
        prevInvoiceData.map((invoice) =>
          invoice._id === invoiceId
            ? { ...editingInvoiceData }
            : invoice
        )
      );
      setEditingInvoiceData(null);
      setEditingInvoiceId(null);
      toast.success("invoice updeted successfully!", toastOptions);
      window.location.reload();
    } catch (error) {
      toast.error(
        "An error occurred while updating the invoice.",
        toastOptions
      );
    }
  };
  const handleDeleteInvoice = async (userId) => {
    try {
      axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/${props.userId}/delete-invoice/${userId}`
      ).then((value)=>{
        window.location.reload();
      });

      setInvoiceData((preInvoiceData) => {
        preInvoiceData.filter((user) => user._id != userId);
      });
      toast.success("inventory deleted successfully", toastOptions);
      
    } catch (error) {
      toast.error(
        "An error occurred while deleting the inventory.",
        toastOptions
      );
    }
  };

  const toggleEditField = (userId) => {
    if (editingInvoiceId === userId) {
      setInvoiceData((preInvoiceData) =>
        preInvoiceData.map((user) =>
          user._id === userId ? { ...editingInvoiceData } : user
        )
      );
      setEditingInvoiceData(null);
      setEditingInvoiceId(null);
    } else {
      const userToEdit = invoiceData.find((user) => user._id === userId);
      setEditingInvoiceData({ ...userToEdit });
      setEditingInvoiceId(userId);
    }
  };
  const cancelEdit = () => {
    setEditingInvoiceData(null);
    setEditingInvoiceId(null);
  };
  return (
    <div className="max-w-[700px] w-full  m-4 bg-white rounded-lg shadow-sm shadow-black">
      <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-t-lg">
        <p className="text-white font-semibold">
          {/* Invoice No: {props.invoiceNumber} */}
          <span className="uppercase underline underline-offset-2">Invoice No:</span>
          <span className="md:ml-4 text-base font-semibold md:text-lg">
          {
            editingInvoiceId === props.id ? (
              <input
                className="text-white max-w-[200px] w-full focus:outline-white focus:outline-[0.3px] focus:text-white rounded px-1.5 bg-transparent"
                type="text"
                value={editingInvoiceData.invoiceNumber}
                defaultValue={props.invoiceNumber}
                onChange={(e) =>
                  setEditingInvoiceData({
                    ...editingInvoiceData,
                    invoiceNumber: e.target.value,
                  })
                }
              />
            ) : (
              props.invoiceNumber
            )
          }
</span>
        </p>
        <p className="text-white">{props.date}</p>
      </div>
      <div className="md:p-6 sm:p-2 p-2">
        <div className="mb-4 flex">
          <p className="text-sm md:text-base text-gray-600">
            <span className="uppercase underline underline-offset-2">Bill To:</span>
            <span className="md:ml-4 text-base font-semibold md:text-lg">
              {editingInvoiceId === props.id ? (
                <input
                  className="text-black max-w-[200px] w-full focus:outline-blue-400 rounded px-1.5"
                  type="text"
                  value={editingInvoiceData.billTo?.name || ''}
                  placeholder={props.billTo?.name || ''}
                  onChange={(e) =>
                    setEditingInvoiceData({
                      ...editingInvoiceData,
                      billTo: {
                        ...editingInvoiceData.billTo,
                        name: e.target.value,
                      },
                    })
                  }
                />
              ) : (
                props.billTo?.name || ''
              )}
            </span>
          </p>
        </div>
        <div className="mb-4 flex">
          <p className="text-sm md:text-base text-gray-600">
           <span className="uppercase underline underline-offset-2">Bill From:</span>
            <span className="md:ml-4 text-base font-semibold md:text-lg">
              {props.billFrom?.name || ''}
            </span>
          </p>

        </div>
        <p className="text-sm md:text-base text-gray-600 text-start font-bold">
        <span className="uppercase underline underline-offset-2 mb-2">Items:-</span>

        </p>
        <Table items={props.items} />
        <div className="mb-4 flex justify-end flex-col items-end mr-2 gap-2 p-2 md:pt-6 sm:pt-2 ">
          <p className="text-sm md:text-base text-gray-600">
            Sub Total:
            <span className="ml-2 text-sm sm:text-sm text-base lg:text-base font-semibold md:text-lg">
              {props.subTotal}.00/-
            </span>
          </p>

          <p className="text-sm md:text-base text-gray-600">
            Discount:
            <span className="ml-2 text-sm sm:text-sm text-base lg:text-base font-semibold md:text-lg">
              - {props.discountAmount}/-
            </span>
          </p>
          <p className="text-sm md:text-base text-gray-600">
            tax:
            <span className="ml-2 text-sm sm:text-sm text-base lg:text-base font-semibold md:text-lg">
              + {props.tax}/-
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <p className={props.isPaid ? "text-green-600" : "text-red-600"}>
            {props.isPaid ? (
              <span className="px-3 py-1 bg-green-200 rounded-md">Paid</span>
            ) : (
              <span className="px-3 py-1 bg-red-200 rounded-md">Unpaid</span>
            )}
          </p>
          <p className="text-base text-gray-800 font-semibold mr-3">
            Total:  {props.total} /-
          </p>

          {editingInvoiceId === props.id ? (
            <div className="flex justify-center space-x-2">
              <i
                className="fa-solid fa-check hover:text-green-500 cursor-pointer"
                onClick={() => handleUpdateInvoice(props.id)}
              ><AiOutlineCheck /></i>
              <i
                className="fa-solid fa-xmark hover:text-red-500 cursor-pointer"
                onClick={cancelEdit}
              ><AiOutlineClose /></i>
            </div>
          ) : (
            <div className="flex justify-center space-x-2">
              <i
                className="fa-solid fa-user-pen hover:text-blue-500 cursor-pointer"
                onClick={() => toggleEditField(props.id)}
              ><AiOutlineEdit /></i>
              <i
                className="fa-solid fa-trash hover:text-red-500 cursor-pointer"
                onClick={() => handleDeleteInvoice(props.id)}
              ><AiOutlineDelete /></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceCom;
