import React, { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import DonutChart from "react-donut-chart";
import jwtDecode from "jwt-decode";
import axios from "axios";
const RingProgressBar = () => {

    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [inventoryData, setInventoryData] = useState([]);
  
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
  
  
    console.log(totalInventory);
    const colors = ['#48BB78', '#F56565'];
    
    const total = totalInvoice + totalInventory;
    const salePercentage = Math.ceil((totalInvoice / total) * 100);
    const purchasePercentage = 100 - salePercentage;
  
  console.log(salePercentage, "salepercentage")
    return (
      <>
      <div className="flex justify-center text-[30px] font-semibold">
          <DonutChart
            data={[
              {
                label: "Sale",
                value: salePercentage,
                
              },
              {
                label: "Purchase",
                value: purchasePercentage
              },
            ]}
            colors={colors}
            style={{ width: '200px', height: '200px' }}
          innerRadius={0.6}
          outerRadius={0.9}
          startAngle={270}
          strokeWidth={15}
          strokeColor="#fff"
          transitionDuration={500}
          hoverAnimation
          legend
          legendPosition="bottom"
          legendFontSize={24}
          />
           </div>
      </>
    );
  };
  export default RingProgressBar;