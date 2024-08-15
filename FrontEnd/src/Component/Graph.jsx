import React, { useState, useEffect } from "react";

// import { chartData, getTotal } from "../helper/helper";
import jwtDecode from "jwt-decode";

import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import DonutChart from "react-donut-chart";
import Graphpara from "./Graphpara";
import RingProcessBar from "./RingProcessBar";


export default function Graph() {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    (async () => {
      const userToken = await localStorage.getItem("erp_admin_token");
      const invoice = jwtDecode(userToken);
      setId(invoice.id);
      // console.log(id);
      let res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-invoice/${id}`
      );
      let resInventory = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-inventory/${id}`
      );
      setData(res.data);
      setInventoryData(resInventory.data);
    })();
  }, [id]);

  const totalInvoice = data.reduce((acc, curr) => acc + curr.total, 0);

  const totalInventory = inventoryData.reduce(
    (acc, curr) => acc + curr.stdSaleCost * curr.quantity,
    0
  );
  console.log(totalInvoice, "total invoice");
  console.log(totalInventory, "total invenrtory");

  const profit = totalInvoice - totalInventory;
  const profitColor = profit >= 0 ? "text-green-500" : "text-red-500";
  const profitText = profit >= 0 ? "Profit" : "Loss";

  console.log(totalInventory);
  const colors = ['#48BB78', '#F56565'];
  return (
    <>
      <RingProcessBar
        purchaseValue={totalInventory}
        saleValue={totalInvoice}
      />

     <Graphpara totalInvoice={totalInvoice} totalInventory={totalInventory} profitColor={profitColor} profitText={profitText} profit={profit}/>
    </>
  );
}

