import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import InoviceCom from "../Component/InvoiceCom";
import { Link } from "react-router-dom";


const AllInvoices = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState("7-days");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filterInvoiceData = (data, selectedOption) => {
    const currentDate = new Date();
    return data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      if (selectedOption === "7-days") {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        return itemDate >= sevenDaysAgo && itemDate <= currentDate;
      } else if (selectedOption === "this-month") {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Start of next month
        return itemDate >= startOfMonth && itemDate < endOfMonth;
      } else if (selectedOption === "6-months") {
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
        return itemDate >= sixMonthsAgo && itemDate <= currentDate;
      } else if (selectedOption === "1-year") {
        const oneYearAgo = new Date(currentDate);
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
        return itemDate >= oneYearAgo && itemDate <= currentDate;
      }

      return true; // Return true if no specific filter is applied
    });
  };

  useEffect(() => {
    (async () => {
      const userToken = await localStorage.getItem("erp_admin_token");
      const invoice = jwtDecode(userToken);
      setId(invoice.id);

      let res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-invoice/${id}`
      );
      const filteredData = filterInvoiceData(res.data, selectedOption);
      setData(filteredData);
    })();
  }, [id, selectedOption]);
  return (
    <div className="text-center">
      
      <div className="flex justify-end flex-col lg:flex-row items-center gap-4 pt-2">
        <select
          className="rounded-md border  border-gray-300 shadow-sm bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="7-days">Last 7 days</option>
          <option value="this-month">This Month</option>
          <option value="6-months">Six Month</option>
          <option value="1-year">Last Year</option>
        </select>
      </div>
      <Link to="/erp/invoice">
        <button className="btn px-3 py-2 bg-blue-700 rounded text-white m-2 hover:bg-blue-800">
          Create Invoice
        </button>
      </Link>
      <div className="grid  grid-cols-1 md:grid-cols-2 m-3">
        {data.map((invoice, index) => (
          <div key={index}>
            <div className="flex justify-center">
              <InoviceCom
                userId = {id}
                id = {invoice._id}
                items={invoice.items}
                subTotal={invoice.subTotal}
                discountAmount={invoice.discountAmount}
                tax={invoice.taxAmount}
                invoiceNumber={invoice.invoiceNumber}
                date={invoice.createdAt}
                billTo={invoice.billTo}
                // billFrom={invoice.billFrom.name}
                billFrom={invoice.billFrom}
                total={invoice.total}
                isPaid={invoice.isPaid}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllInvoices;
