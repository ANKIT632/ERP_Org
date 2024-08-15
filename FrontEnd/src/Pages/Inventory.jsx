import React, { useState, useEffect } from "react";
import axios from "axios";
import InventoryCard from "../Component/InventoryCard";
import jwtDecode from "jwt-decode";
import AddInventory from "../Component/AddInventory";
const Inventory = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [selectedOption, setSelectedOption] = useState("7-days");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filterInventoryData = (data, selectedOption) => {
    const currentDate = new Date();
    return data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      if (selectedOption === "7-days") {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        return itemDate >= sevenDaysAgo && itemDate <= currentDate;
     
      } else if (selectedOption === "this-month") {
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const endOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          1
        ); // Start of next month
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
      const userToken = localStorage.getItem("erp_admin_token");
      const inventory = jwtDecode(userToken);
      setId(inventory.id);

      let res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-inventory/${id}`
      );
      const filteredData = filterInventoryData(res.data, selectedOption);
      setData(filteredData);
    })();
  }, [id, selectedOption]);

  // useEffect(() => {
  //     const filteredData = filterInventoryData(data, selectedOption);
  //     setData(filteredData);
  //     console.log(filteredData, "filterddata")
  //   }, [selectedOption, data]);

  return (
    <div className="text-right px-6  py-4">
      <div className="flex justify-end flex-col lg:flex-row items-center gap-4">
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
      <AddInventory />
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-3 ">
        {data.map((inventory, index) => (
          <div key={index}>
            {/* // code category quantity unit store costs gstt min stock itemType date */}
            <div className="flex justify-center items-center">
              <InventoryCard
                userId={id}
                id={inventory._id}
                name={inventory.name}
                itemType={inventory.itemType.name}
                date={inventory.createdAt}
                code={inventory.code}
                category={inventory.category}
                quantity={inventory.quantity}
                unit={inventory.unit}
                store={inventory.store}
                stdCost={inventory.stdCost}
                purchCost={inventory.purchCost}
                stdSaleCost={inventory.stdSaleCost}
                gst={inventory.gst}
                minStock={inventory.minStock}
                leadTime={inventory.leadTime}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
