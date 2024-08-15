// sales report 
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
const ErpReport = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState("Last 7 days");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    (async () => {
      const userToken = await localStorage.getItem("erp_admin_token");
      const decodedToken = jwtDecode(userToken);
      setId(decodedToken.id);
      const currentDate = new Date();

      const invoiceRes = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-invoice/${decodedToken.id}`
      );
      const filteredInvoiceData = invoiceRes.data.filter((item) => {
        const itemDate = new Date(item.createdAt);
        if (selectedOption === "7-days") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(currentDate.getDate() - 7);
          return itemDate >= sevenDaysAgo && itemDate <= currentDate;
        } else if (selectedOption === "30-days") {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(currentDate.getDate() - 30);
          return itemDate >= thirtyDaysAgo && itemDate <= currentDate;
        } else if (selectedOption === "this-month") {
          const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          return itemDate >= startOfMonth && itemDate <= endOfMonth;
        } else if (selectedOption === "6-months") {
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
          return itemDate >= sixMonthsAgo && itemDate <= currentDate;
        } else if (selectedOption === "1-year") {
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
          return itemDate >= oneYearAgo && itemDate <= currentDate;
        }

        return true; // Return true if no specific filter is applied
      });
      setInvoiceData(filteredInvoiceData);

      const inventoryRes = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-inventory/${decodedToken.id}`
      );

      const filteredInventoryData = inventoryRes.data.filter((item) => {
        const itemDate = new Date(item.createdAt);
        if (selectedOption === "7-days") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(currentDate.getDate() - 7);
          return itemDate >= sevenDaysAgo && itemDate <= currentDate;
        } else if (selectedOption === "this-month") {
          const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          return itemDate >= startOfMonth && itemDate <= endOfMonth;
        } else if (selectedOption === "6-months") {
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
          return itemDate >= sixMonthsAgo && itemDate <= currentDate;
        } else if (selectedOption === "1-year") {
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
          return itemDate >= oneYearAgo && itemDate <= currentDate;
        }

        return true; // Return true if no specific filter is applied
      });
      setInventoryData(filteredInventoryData);
    })();
  }, [selectedOption]);

  

  const mergedData = invoiceData.map((invoice) => {
    const inventoryItem = inventoryData.find(() => true);
    return {
      invoiceNumber: invoice.invoiceNumber,
      billFrom: invoice.billFrom.name,
      billTo: invoice.billTo.name,
      items: invoice.items
  ? invoice.items.map((item) => ({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    }))
  : [],

      discountPercentage: invoice.discountPercentage,
      discountAmount: invoice.discountAmount,
      taxPercentage: invoice.taxPercentage,
      taxAmount: invoice.taxAmount,
      total: invoice.total,
      subTotal: invoice.subTotal,
      note: invoice.note,
      isPaid: invoice.isPaid,
      createdAt: invoice.createdAt,
    };
  });

  const sortedMergedData = mergedData.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  console.log(mergedData, "mergeddata");

  return (
    <div>
      <div className="flex  self-start gap-4 py-4 pr-4">
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
      <div ref={componentRef} className="overflow-x-auto">
        <div className="flex flex-col justify-center items-center gap-3 my-3">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            WEBSEEDER TECHNOLOGY PVT LTD
          </h1>
          <h1 className="text-xl font-bold text-gray-700 text-center">
            SALES REPORT
          </h1>
        </div>

        <table className="max-w-[1400px] mx-auto w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr className="text-black font-black text-xs">
              <th
                scope="col"
                className="border border-gray-400 py-3 text-left font-medium uppercase tracking-wider"
              >
                SNO
              </th>
              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Invoice Number
              </th>
              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Sell Product
              </th>

              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Paid / Unpaid
              </th>

              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Bill From
              </th>
              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Bill To
              </th>
              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Discount %
              </th>
              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Discount /-
              </th>
              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Tax %
              </th>
              <th
                scope="col"
                className="border border-gray-400 px-2 py-3 text-left font-medium uppercase tracking-wider"
              >
                Credit
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 border border-gray-400">
            {sortedMergedData.map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {index + 1}
                </td>
                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.invoiceNumber ? item.invoiceNumber : "-"}
                </td>
                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.createdAt ? item.createdAt : "-"}
                </td>

                <td className="px-2 py- whitespace-nowrap text-sm border border-gray-400">
                  {item.items && item.items.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {item.items.map((product, index) => (
                        <li key={index} className="whitespace-nowrap">
                          {product.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.isPaid === undefined
                    ? "-"
                    : item.isPaid
                    ? "Paid"
                    : "Unpaid"}
                </td>

                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.billFrom ? item.billFrom : "-"}
                </td>
                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.billTo ? item.billTo : "-"}
                </td>
                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.discountPercentage
                    ? `${item.discountPercentage}%`
                    : "-"}
                </td>
                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.discountAmount ? `${item.discountAmount}/-` : "-"}
                </td>
                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.taxPercentage ? `${item.taxPercentage}%` : "-"}
                </td>

                <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                  {item.subTotal ? `${item.subTotal}/-` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center p-4">
        <button
          onClick={handlePrint}
          className="mt-10 px-10 py-2 bg-gray-700 hover:bg-gray-900 text-white rounded-md "
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default ErpReport;
