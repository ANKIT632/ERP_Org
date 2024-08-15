import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Dropdown } from "primereact/dropdown";
const Ledger = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedOption, setSelectedOption] = useState("Last 7 days");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [id, setId] = useState("");

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    (async () => {
      const userToken = await localStorage.getItem("erp_admin_token");
      const invoice = jwtDecode(userToken);
      setId(invoice.id);
      const currentDate = new Date();

      let res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-invoice/${id}`
      );

      const filteredInvoiceData = res.data.filter((item) => {
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
    })();
  }, [id, selectedOption]);

  useEffect(() => {
    (async () => {
      let res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-inventory/${id}`
      );
      const filteredInventoryData = res.data.filter((item) => {
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
  }, [id, selectedOption]);

  const mergedData = [...invoiceData, ...inventoryData];
  console.log(mergedData, "mergeddata");

  const sortedMergedData = mergedData.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div>
   <div className="flex self-start pt-4 pr-2 flex-col lg:flex-row items-center gap-4">
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


      <div className="w-full flex justify-evenly items-center mb-10 mt-3 ">
        <div className="w-[250px] bg-red py-1 border border-gray-300 shadow-sm shadow-gray-200 flex">
          <select
            className="w-full focus:outline-none"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="" disabled selected>
              Select company
            </option>
            {[
              ...new Set(sortedMergedData.map((item) => item.billTo?.name)),
            ].map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
     
      </div>

      <div ref={componentRef} className="overflow-x-auto">
        
        <div className="flex flex-col justify-center items-center gap-3 my-3">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            {selectedCompany === "" ? "Webseeder Technologies Pvt Ltd" : selectedCompany}
          </h1>
          <h1 className="text-xl font-bold text-gray-700 text-center">
            Ledger Account
          </h1>

        </div>
        <table className="max-w-[1400px] mx-auto w-full divide-y divide-gray-200  ">
          <thead className="bg-gray-200 ">
            <tr className="text-black font-black text-xs">
              <th
                scope="col"
                className=" border border-gray-400 px-4 py-3 text-left  font-medium  uppercase tracking-wider  "
              >
                SNO
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left font-medium  uppercase tracking-wider border border-gray-400"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left font-medium  uppercase tracking-wider border border-gray-400"
              >
                Sell Product
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left font-medium uppercase tracking-wider border border-gray-400"
              >
                Invoice Number
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left font-medium  uppercase tracking-wider border border-gray-400"
              >
                Purchase Prdoduct
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left font-medium  uppercase tracking-wider border border-gray-400"
              >
                Paid / Unpaid
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left  font-medium  uppercase tracking-wider border border-gray-400"
              >
                Debit
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left  font-medium  uppercase tracking-wider border border-gray-400"
              >
                Credit
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 border border-gray-400">
            {sortedMergedData
              .filter(
                (item) =>
                  !selectedCompany || item.billTo?.name === selectedCompany
              )
              .map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6  py-4 whitespace-nowrap border border-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                    {item.createdAt ? item.createdAt : "no"}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm border border-gray-400">
                    {item.items ? (
                      <ol className="list-decimal list-inside">
                        {item.items.map((item, index) => (
                          <li key={index} className="whitespace-nowrap">
                            {item.name}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      "NaN"
                    )}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                    {item.invoiceNumber ? item.invoiceNumber : "NaN"}
                  </td>
                  <td className="px-2 py-4 border border-gray-400">
                    {/* {item.quantity ? `[${item.quantity}]  ` : ""} */}
                    {item.name ? item.name : "NaN"}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                    {item.isPaid === undefined
                      ? "NaN"
                      : item.isPaid
                        ? "Paid"
                        : "Unpaid"}
                  </td>

                  <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                    {item.purchCost
                      ? `${item.purchCost * item.quantity}/-`
                      : "NaN"}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap border border-gray-400">
                    {item.subTotal ? `${item.subTotal}/-` : "NaN"}
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

export default Ledger;