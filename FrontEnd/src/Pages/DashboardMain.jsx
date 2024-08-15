import { GiReceiveMoney } from "react-icons/gi";

import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOndemandVideo } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaXing,
  FaYoutube,
} from "react-icons/fa";
import ExpenseTracker from "./ExpenseTracker";
import Graph from "../Component/Graph";
import Graphpara from "../Component/Graphpara";
import { Link } from "react-router-dom";
import RingProgressBar from "../Component/RingProcessBar";

function DashboardMain() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [inventoryData, setInventoryData] = useState([]);
  const [invoiceItem, setInvoiceItem] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [unPaidInvoiceData, setUnPaidInvoiceData] = useState([]);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const [selectedOption, setSelectedOption] = useState("Last 7 days");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const userToken = await localStorage.getItem("erp_admin_token");
      const invoice = jwtDecode(userToken);
      setId(invoice.id);
      const currentDate = new Date();

      try {
        let res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/all-invoice/${id}`
        );
        let resInventory = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/all-inventory/${id}`
        );

        setData(res.data);
        setInventoryData(resInventory.data);

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
            const startOfMonth = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              1
            );
            const endOfMonth = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0
            );
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

        const filteredInventoryData = resInventory.data.filter((item) => {
          const itemDate = new Date(item.createdAt);
          if (selectedOption === "7-days") {
            const sevenDaysAgo = new Date();
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
              0
            );
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

        const unpaidInvoices = filteredInvoiceData.filter(
          (item) => item.isPaid === "true"
        );
        setUnPaidInvoiceData(unpaidInvoices);
        setInvoiceItem(filteredInvoiceData);
        setInventoryData(filteredInventoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [id, selectedOption]);

  console.log(unPaidInvoiceData, "unpaidInvoiceData");

  // console.log(invoiceItem , "asdfhsdfkjhdkjashkjfhkadjshfhsjaj")

  const totalInvoice = invoiceItem.reduce((acc, curr) => acc + curr.total, 0);

  const totalInventory = inventoryData.reduce(
    (acc, curr) => acc + curr.stdSaleCost * curr.quantity,
    0
  );

  const profit = totalInvoice - totalInventory;
  const profitPercentage = (profit / totalInventory) * 100;
  // console.log(profitPercentage, "profit percentaage");
  const total = totalInvoice + totalInventory;
  const salePercentage = Math.ceil((totalInvoice / total) * 100);
  const purchasePercentage = 100 - salePercentage;

  return (
    <>
      <div className="bg-gray-100">

        {/* div-1 */}
        <div className="py-4 flex flex-col items-center lg:items-start lg:flex-row justify-end pr-4 gap-2">

          <div className="flex gap-4 items-center pt-2">
            <p>Show the Values</p>
            <label className="block-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked}
                onClick={toggleSwitch}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex flex-col lg:flex-row items-center  gap-4">
            <select
              className="rounded-md border border-gray-300 shadow-sm bg-white px-3 py-2 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="7-days">Last 7 days</option>
              <option value="this-month">This Month</option>
              <option value="6-months">Six Month</option>
              <option value="1-year">Last Year</option>
            </select>
            {/* <p>1 Mar - 18 Mar 2024</p> */}
          </div>
        </div>


        <div className="flex flex-col items-center sm:items-center  md:items-start lg:flex-row justify-center lg:justify-between gap-2">
          <div className="lg:w-[70%] max-w-full">
            <div className=" rounded-md pb-4">
              <div className="bg-white p-4 rounded-lg shadow-md border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Growth Pulses
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 grid-col-1 gap-4">
                  <div className="bg-[#ccf5ff] w-full p-4 rounded-lg shadow-md">
                    <div className="flex gap-4">
                      <GiProfit className="text-[#ffffff] mb-2 text-5xl bg-cyan-800 p-2 rounded-md" />
                      <p className="text-2xl  font-semibold ">
                        {isChecked ? ` ${totalInvoice.toFixed(2)}` : "****"}
                      </p>
                    </div>
                    <p className="text-lg  text-gray-800">Total Income</p>
                  </div>
                  <div className="bg-[#ffe6e6] w-full p-4 rounded-lg shadow-md">
                    <div className="flex gap-4">
                      <AiOutlinePaperClip className="text-[#ffffff] mb-2 text-5xl bg-red-800 p-2 rounded-md" />
                      <p className="text-2xl  font-semibold ">
                        {isChecked ? `${totalInventory.toFixed(2)}` : "****"}
                      </p>
                    </div>
                    <p className="text-lg text-gray-800 ">Total Expenses</p>
                  </div>
                  <div className="bg-[#e6ffea] w-full p-4 rounded-lg shadow-md">
                    <div className="flex gap-4">
                      <BiRupee className="text-[#ffffff] mb-2 text-5xl bg-green-800 p-2 rounded-md" />
                      <p className="text-2xl font-semibold ">
                        {isChecked ? `${profit.toFixed(2)}` : "****"}
                      </p>
                    </div>
                    <p className="text-lg text-gray-600">Net Profit</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-md">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4 ">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Revenue Projections
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3 grid-col-1">
                  <div className="bg-white w-full p-4 rounded-lg shadow-md border">
                    <div className="flex gap-4">
                      <MdOutlineKeyboardArrowUp className="text-[green] mb-2 text-5xl bg-green-100 p-2 rounded-md" />
                      <p className="text-2xl  font-semibold">
                        {isChecked ? `${unPaidInvoiceData.length}` : "****"}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <p className="text-xl font-semibold text-[#33cc33]">
                        100%
                      </p>
                      <p className="text-md   text-gray-800">
                        Total Receivable Amount
                      </p>
                    </div>
                  </div>
                  <div className="bg-white w-full p-4 rounded-lg shadow-md border">
                    <div className="flex gap-4">
                      <MdOutlineKeyboardArrowUp className="text-[green] mb-2 text-5xl bg-green-100 p-2 rounded-md" />
                      <p className="text-2xl  font-semibold">
                        {isChecked ? "₹0.00" : "****"}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <p className="text-xl font-semibold text-[#33cc33]">
                        100%
                      </p>
                      <p className="text-md   text-gray-800">
                        Total Payable Amount
                      </p>
                    </div>
                  </div>
                  <div className="bg-white w-full p-4 rounded-lg shadow-md border">
                    <div className="flex gap-4">
                      <BsClockHistory className="text-[blue] mb-2 text-5xl bg-blue-100 p-2 rounded-md" />
                      <p className="text-2xl  font-semibold">
                        {isChecked ? "₹0.00" : "****"}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <p className="text-xl font-semibold text-[#33cc33]">
                        100%
                      </p>
                      <p className="text-md  text-gray-800">
                        Long Time Pending Receipts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* sale div */}
            <div className="flex gap-4 py-4 flex-col md:flex-row lg-flex-row ">
              <div className="bg-white p-4 rounded-lg shadow-md border w-full sm:w-full md:w-[50%] ">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Sale/Purchase</h2>
                </div>
                <div className="flex gap-4 ">
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-md border">
                    <div className="flex items-center space-x-3">
                      <TbDiscountCheckFilled className="text-green-500 mb-2 text-5xl bg-green-100 p-2 rounded-md" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          Total Sale
                        </div>
                        <div className="text-lg font-semibold">
                          {isChecked ? `${totalInvoice.toFixed(2)}` : "****"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-md border">
                    <div className="flex items-center space-x-3">
                      <AiOutlineShoppingCart className="text-green-500 mb-2 text-5xl bg-green-100 p-2 rounded-md" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          Total Purchase
                        </div>
                        <div className="text-lg font-semibold">
                          {isChecked ? `${totalInventory.toFixed(2)}` : "****"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border w-full sm:w-full md:w-[50%]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Revenue Management</h2>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-md border">
                    <div className="flex items-center space-x-3">
                      <TbFileInvoice className="text-green-500 mb-2 text-5xl bg-green-100 p-2 rounded-md" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          No. Of Payable Bill
                        </div>
                        <div className="text-md font-semibold">
                          {isChecked ? `${invoiceItem.length}` : "****"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-md border">
                    <div className="flex items-center space-x-3">
                      <GiReceiveMoney className="text-green-500 mb-2 text-5xl bg-green-100 p-2 rounded-md" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          Expected Receivable
                        </div>
                        <div className="text-md font-semibold">
                          {isChecked ? "₹0.00" : "****"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center py-4 space-x-8  flex-col sm:flex-col md:flex-row gap-4  ">
              <div className="bg-white px-2 w-full sm:w-full md:w-[50%] border rounded-md">
                <div className="flex justify-between flex-col  mb-4">
                  <h2 className="text-xl font-semibold p-2 pt-4">Sale Analytics</h2>
                  <div className=" w-[100%]  sm:w-[100%] md:w-[100%]">
                    <RingProgressBar />
                  </div>
                </div>
{/* 
                <div className="w-full ">
                  <div
                    role="application"
                    aria-label="A bar chart showing data"
                    className="nivo_bar_svg__Wrapper-nivo_bar_svg__eCQFT nivo_bar_svg__ResponsiveWrapper-nivo_bar_svg__1Cflv"

                  >
                    <svg
                      viewBox="0 0 800 200"
                      className="nivo_bar_svg__Svg-nivo_bar_svg__1FEbv"
                    >
                      {/* SVG content for the bar chart */}
                    {/* </svg>
                  </div>
                </div> */} 
              </div>

              
              <div
                className="bg-white rounded-lg shadow-md p-4  w-full sm:w-full md:w-[50%] border h-[424px]"
                style={{ margin: "0" }}
              >
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-3" />
                    <div>
                      <p className="text-sm">
                        You have created company: KNOWIFY GLOBAL INFOSOLUTIONS
                        PRIVATE LIMITED successfully.
                      </p>
                      <p className="text-xs text-gray-500">
                        March 16th 2024, 3:35 pm
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-3" />
                    <div>
                      <p className="text-sm">You have sign up successfully.</p>
                      <p className="text-xs text-gray-500">
                        March 16th 2024, 3:34 pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto border p-5 hidden sm:hidden md:inline w-[20vw] sm:w-full rounded-md ">
            <div className="p-2 bg-white border mb-4 rounded-md ">
              <h2 className="text-xl font-semibold text-center">
                Contact Support
              </h2>
              <p className="text-sm text-gray-600 p-5">
                We’re always happy to help! Contact us anytime, and we’ll get
                back to you soon.
              </p>
              <div className="mt-4 flex justify-evenly flex-col sm:flex-col md:flex-row">
                <Link to="https://api.whatsapp.com/send?phone=+917898877166&amp;text=Hello WebSeeder Technologies, I would like to inquire about the different services&nbsp;that&nbsp;you&nbsp;offer.">
                  <button className="flex items-center justify-center space-x-2 p-2 rounded-md border">
                    <BsWhatsapp className="text-green-700" size={20} />
                    <span>WhatsApp</span>
                  </button>
                </Link>
                <Link to="mailto:hello@webseeder.in"><button className="flex items-center justify-center space-x-2 p-2 rounded-md border">
                  <AiOutlineMail className="text-red-700" size={20} />
                  <span>Email Us</span>
                </button></Link>

              </div>
            </div>
            
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border  ">
              <h2 className="text-lg font-semibold">FAQs</h2>
              <div className="mt-4 space-y-4">
                <details className="group" open>
                  <summary className="flex justify-between items-center p-4 rounded-lg bg-gray-100 cursor-pointer">
                    <span>
                      How can a tailored ERP software solution benefit my
                      business?
                    </span>
                    <MdKeyboardArrowDown />
                  </summary>
                  <div className="px-4 pb-4">
                    <p>
                      A tailored ERP software solution offers benefits such as
                      customization to fit your unique business processes,
                      scalability to adapt to growth, seamless integration with
                      existing systems, enhanced reporting and analytics
                      capabilities, and cost-effectiveness by eliminating
                      unnecessary features.
                    </p>
                  </div>
                </details>
                <details className="group">
                  <summary className="flex justify-between items-center p-4 rounded-lg bg-gray-100 cursor-pointer">
                    <span>
                      Can a tailored ERP software solution integrate with our
                      existing systems and applications?
                    </span>
                    <MdKeyboardArrowDown />
                  </summary>
                  <div className="px-4 pb-4">
                    <p>
                      Yes, our tailored ERP software solutions are designed to
                      seamlessly integrate with your existing systems and
                      applications, ensuring smooth operations and minimizing
                      disruption to your business processes.
                    </p>
                  </div>
                </details>
                <details className="group">
                  <summary className="flex justify-between items-center p-4 rounded-lg bg-gray-100 cursor-pointer">
                    <span>
                      {" "}
                      How long does it take to develop and deploy a tailored ERP
                      software solution?
                    </span>
                    <MdKeyboardArrowDown />
                  </summary>
                  <div className="px-4 pb-4">
                    <p>
                      The timeline for developing and deploying a tailored ERP
                      software solution depends on the complexity of your
                      requirements and the customization needed. We work closely
                      with your team to establish a realistic timeline and
                      ensure timely delivery.
                    </p>
                  </div>
                </details>
              </div>
            </div>
            <div className="p-4 mt-4 bg-white  mx-auto border rounded-lg flex items-center space-x-4">
              <span className="font-semibold">Follow Us</span>
              <div className="flex space-x-2">
                <Link
                  aria-label="Facebook"
                  target="_blank"
                  className="block bg-[#3b5998] text-white p-2 rounded-full"
                  to="https://www.facebook.com/webseedertech"
                >
                  <FaFacebook className="h-5 w-5" />
                </Link>
                <Link
                  aria-label="LinkedIn"
                  target="_blank"
                  className="block bg-[#0077b5] text-white p-2 rounded-full"
                  to="https://www.linkedin.com/company/webseedertech"
                >
                  <FaLinkedin className="h-5 w-5" />
                </Link>
                <Link
                  aria-label="Twitter"
                  target="_blank"
                  className="block bg-[#cfdc00] text-white p-2 rounded-full"
                  to="https://twitter.com/WebSeederTech"
                >
                  <FaTwitter className="h-5 w-5" />
                </Link>
                <Link
                  aria-label="Instagram"
                  target="_blank"
                  className="block bg-[#e4405f] text-white p-2 rounded-full"
                  to="https://www.instagram.com/webseedertech/"
                >
                  <FaInstagram className="h-5 w-5" />
                </Link>
                <Link
                  aria-label="Instagram"
                  target="_blank"
                  className="block bg-[#e4405f] text-white p-2 rounded-full"
                  to="https://in.pinterest.com/webseedertech/"
                >
                  <FaPinterest className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mx-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <div className="px-6 pt-6 2xl:container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-1" >
                <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                    <svg className="w-40 m-auto opacity-75" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M73.1866 5.7129C81.999 5.7129 90.725 7.44863 98.8666 10.821C107.008 14.1933 114.406 19.1363 120.637 25.3675C126.868 31.5988 131.811 38.9964 135.184 47.138C138.556 55.2796 140.292 64.0057 140.292 72.818C140.292 81.6304 138.556 90.3565 135.184 98.4981C131.811 106.64 126.868 114.037 120.637 120.269C114.406 126.5 107.008 131.443 98.8666 134.815C90.725 138.187 81.999 139.923 73.1866 139.923C64.3742 139.923 55.6481 138.187 47.5066 134.815C39.365 131.443 31.9674 126.5 25.7361 120.269C19.5048 114.037 14.5619 106.64 11.1895 98.4981C7.81717 90.3565 6.08144 81.6304 6.08144 72.818C6.08144 64.0057 7.81717 55.2796 11.1895 47.138C14.5619 38.9964 19.5048 31.5988 25.7361 25.3675C31.9674 19.1363 39.365 14.1933 47.5066 10.821C55.6481 7.44863 64.3742 5.7129 73.1866 5.7129L73.1866 5.7129Z" stroke="#e4e4f2" stroke-width="4.89873"/>
                        <path d="M73.5 23.4494C79.9414 23.4494 86.3198 24.7181 92.2709 27.1831C98.222 29.6482 103.629 33.2612 108.184 37.816C112.739 42.3707 116.352 47.778 118.817 53.7291C121.282 59.6802 122.551 66.0586 122.551 72.5C122.551 78.9414 121.282 85.3198 118.817 91.2709C116.352 97.222 112.739 102.629 108.184 107.184C103.629 111.739 98.222 115.352 92.2709 117.817C86.3198 120.282 79.9414 121.551 73.5 121.551C67.0586 121.551 60.6802 120.282 54.7291 117.817C48.778 115.352 43.3707 111.739 38.816 107.184C34.2612 102.629 30.6481 97.222 28.1831 91.2709C25.7181 85.3198 24.4494 78.9414 24.4494 72.5C24.4494 66.0586 25.7181 59.6802 28.1831 53.7291C30.6481 47.778 34.2612 42.3707 38.816 37.816C43.3707 33.2612 48.778 29.6481 54.7291 27.1831C60.6802 24.7181 67.0586 23.4494 73.5 23.4494L73.5 23.4494Z" stroke="#e4e4f2" stroke-width="4.89873"/>
                        <path d="M73 24C84.3364 24 95.3221 27.9307 104.085 35.1225C112.848 42.3142 118.847 52.322 121.058 63.4406C123.27 74.5592 121.558 86.1006 116.214 96.0984C110.87 106.096 102.225 113.932 91.7515 118.27C81.278 122.608 69.6243 123.181 58.7761 119.89C47.9278 116.599 38.5562 109.649 32.258 100.223C25.9598 90.7971 23.1248 79.479 24.2359 68.1972C25.3471 56.9153 30.3357 46.3678 38.3518 38.3518" stroke="url(#paint0_linear_622:13617)" stroke-width="10" stroke-linecap="round"/>
                        <path d="M73 5.00001C84.365 5.00001 95.5488 7.84852 105.529 13.2852C115.509 18.7218 123.968 26.5732 130.131 36.1217C136.295 45.6702 139.967 56.6112 140.812 67.9448C141.657 79.2783 139.648 90.6429 134.968 101C130.288 111.357 123.087 120.375 114.023 127.232C104.96 134.088 94.3218 138.563 83.0824 140.248C71.8431 141.933 60.3606 140.775 49.6845 136.878C39.0085 132.981 29.4793 126.471 21.9681 117.942" stroke="url(#paint1_linear_622:13617)" stroke-width="10" stroke-linecap="round"/>
                        <path d="M9.60279 97.5926C6.37325 89.2671 4.81515 80.3871 5.01745 71.4595C5.21975 62.5319 7.1785 53.7316 10.7818 45.561C14.3852 37.3904 19.5626 30.0095 26.0184 23.8398C32.4742 17.6701 40.082 12.8323 48.4075 9.6028" stroke="url(#paint2_linear_622:13617)" stroke-width="10" stroke-linecap="round"/>
                        <path d="M73 5.00001C86.6504 5.00001 99.9849 9.10831 111.269 16.7904" stroke="url(#paint3_linear_622:13617)" stroke-width="10" stroke-linecap="round"/>
                        <circle cx="73.5" cy="72.5" r="29" fill="#e4e4f2" stroke="#e4e4f2"/>
                        <path d="M74 82.8332C68.0167 82.8332 63.1666 77.9831 63.1666 71.9998C63.1666 66.0166 68.0167 61.1665 74 61.1665C79.9832 61.1665 84.8333 66.0166 84.8333 71.9998C84.8333 77.9831 79.9832 82.8332 74 82.8332ZM74 80.6665C76.2985 80.6665 78.5029 79.7534 80.1282 78.1281C81.7535 76.5028 82.6666 74.2984 82.6666 71.9998C82.6666 69.7013 81.7535 67.4969 80.1282 65.8716C78.5029 64.2463 76.2985 63.3332 74 63.3332C71.7014 63.3332 69.497 64.2463 67.8717 65.8716C66.2464 67.4969 65.3333 69.7013 65.3333 71.9998C65.3333 74.2984 66.2464 76.5028 67.8717 78.1281C69.497 79.7534 71.7014 80.6665 74 80.6665ZM70.75 67.6665H77.25L79.9583 71.4582L74 77.4165L68.0416 71.4582L70.75 67.6665ZM71.8658 69.8332L70.8691 71.2307L74 74.3615L77.1308 71.2307L76.1341 69.8332H71.8658Z" fill="#6A6A9F"/>
                        <defs>
                        <linearGradient id="paint0_linear_622:13617" x1="45.9997" y1="19" x2="46.0897" y2="124.308" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E323FF"/>
                        <stop offset="1" stop-color="#7517F8"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_622:13617" x1="1.74103e-06" y1="8.70228e-06" x2="6.34739e-08" y2="140.677" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4DFFDF"/>
                        <stop offset="1" stop-color="#4DA1FF"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_622:13617" x1="36.4997" y1="5.07257e-06" x2="36.6213" y2="142.36" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFD422"/>
                        <stop offset="1" stop-color="#FF7D05"/>
                        </linearGradient>
                        <linearGradient id="paint3_linear_622:13617" x1="1.74103e-06" y1="8.70228e-06" x2="6.34739e-08" y2="140.677" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4DFFDF"/>
                        <stop offset="1" stop-color="#4DA1FF"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <div>
                        <h5 className="text-xl text-gray-600 text-center">Total Invoices</h5>
                        <div className="mt-2 flex justify-center gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">{data.length}</h3>
                            <div className="flex items-end gap-1 text-green-500">
                                <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor"/>
                                </svg>
                                <span>2%</span>
                            </div>
                        </div>
                        <span className="block text-center text-gray-500">Recent Invoices</span>
                    </div>
                    <table className="w-full text-gray-600">
                        <tbody>
                        {data
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 3)
  .map((invoice, index) => (
    <tr key={index}>
      <td>{invoice.billTo.name}</td>
      <td>${invoice.subTotal}</td>
      <td>
        <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2"/>
          <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2"/>
          <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2"/>
          <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2"/>
          <path d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5" stroke="url(#paint0_linear_622:13631)" stroke-width="2" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear_622:13631" x1="68" y1="7.74997" x2="1.69701" y2="8.10029" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E323FF"/>
              <stop offset="1" stop-color="#7517F8"/>
            </linearGradient>
          </defs>
        </svg>
      </td>
    </tr>
  ))}

                        </tbody>
                    </table> 
                </div>
            </div>
            <div>
                <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
                    <h5 className="text-xl text-gray-700">Profit</h5>
                    <div className="my-8">
                        <h1 className="text-5xl font-bold text-gray-800">{Math.floor(profitPercentage)}%</h1>
                        <span className="text-gray-500">Profit Amount ${profit}</span>
                    </div>
                    <svg className="w-full" viewBox="0 0 218 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 67.5C27.8998 67.5 24.6002 15 52.5 15C80.3998 15 77.1002 29 105 29C132.9 29 128.6 52 156.5 52C184.4 52 189.127 63.8158 217.027 63.8158" stroke="url(#paint0_linear_622:13664)" stroke-width="3" stroke-linecap="round"/>
                        <path d="M0 67.5C27.2601 67.5 30.7399 31 58 31C85.2601 31 80.7399 2 108 2C135.26 2 134.74 43 162 43C189.26 43 190.74 63.665 218 63.665" stroke="url(#paint1_linear_622:13664)" stroke-width="3" stroke-linecap="round"/>
                        <defs>
                        <linearGradient id="paint0_linear_622:13664" x1="217.027" y1="15" x2="7.91244" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#4DFFDF"/>
                        <stop offset="1" stop-color="#4DA1FF"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_622:13664" x1="218" y1="18.3748" x2="5.4362" y2="18.9795" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E323FF"/>
                        <stop offset="1" stop-color="#7517F8"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <table className="mt-6 -mb-2 w-full text-gray-600">
                        <tbody>
                            <tr>
                                <td className="py-2">Sales</td>
                                <td className="text-gray-500">${totalInvoice}</td>
                                <td>
                                    <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <path d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5" stroke="url(#paint0_linear_622:13631)" stroke-width="2" stroke-linejoin="round"/>
                                        <defs>
                                        <linearGradient id="paint0_linear_622:13631" x1="68" y1="7.74997" x2="1.69701" y2="8.10029" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#E323FF"/>
                                        <stop offset="1" stop-color="#7517F8"/>
                                        </linearGradient>
                                        </defs>
                                    </svg>
                                </td>   
                            </tr>
                            <tr>
                                <td className="py-2">Purchase</td>
                                <td className="text-gray-500">${totalInventory}</td>
                                <td>
                                    <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <path d="M0 12.929C8.69077 12.929 7.66833 9.47584 17.8928 9.47584C28.1172 9.47584 25.5611 15.9524 34.2519 15.9524C42.9426 15.9524 44.8455 10.929 51.6334 10.929C58.2217 10.929 59.3092 5 68 5" stroke="url(#paint0_linear_622:13640)" stroke-width="2" stroke-linejoin="round"/>
                                        <defs>
                                        <linearGradient id="paint0_linear_622:13640" x1="34" y1="5" x2="34" y2="15.9524" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#8AFF6C"/>
                                        <stop offset="1" stop-color="#02C751"/>
                                        </linearGradient>
                                        </defs>
                                    </svg>
                                </td>   
                            </tr>
                        </tbody>
                    </table>   
                </div>
            </div>
            <div>
                <div className="lg:h-full py-8 px-6 text-gray-600 rounded-xl border border-gray-200 bg-white">                    
                    <svg className="w-40 m-auto" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.9985 2.84071C31.2849 2.84071 34.539 3.488 37.5752 4.74562C40.6113 6.00324 43.3701 7.84657 45.6938 10.1703C48.0176 12.4941 49.861 15.2529 51.1186 18.289C52.3762 21.3252 53.0235 24.5793 53.0235 27.8657C53.0235 31.152 52.3762 34.4061 51.1186 37.4423C49.861 40.4785 48.0176 43.2372 45.6938 45.561C43.3701 47.8848 40.6113 49.7281 37.5752 50.9857C34.539 52.2433 31.2849 52.8906 27.9985 52.8906C24.7122 52.8906 21.4581 52.2433 18.4219 50.9857C15.3857 49.7281 12.627 47.8848 10.3032 45.561C7.97943 43.2372 6.1361 40.4785 4.87848 37.4423C3.62086 34.4061 2.97357 31.152 2.97357 27.8657C2.97357 24.5793 3.62086 21.3252 4.87848 18.289C6.13611 15.2529 7.97943 12.4941 10.3032 10.1703C12.627 7.84656 15.3857 6.00324 18.4219 4.74562C21.4581 3.488 24.7122 2.84071 27.9985 2.84071L27.9985 2.84071Z" stroke="#e4e4f2" stroke-width="3"/>
                        <path d="M27.301 2.50958C33.0386 2.35225 38.6614 4.13522 43.26 7.57004C47.8585 11.0049 51.1637 15.8907 52.641 21.437C54.1182 26.9834 53.6811 32.8659 51.4002 38.133C49.1194 43.4001 45.1283 47.7437 40.0726 50.4611C35.0169 53.1785 29.1923 54.1108 23.541 53.1071C17.8897 52.1034 12.7423 49.2225 8.93145 44.9305C5.12062 40.6384 2.86926 35.1861 2.54159 29.4558C2.21391 23.7254 3.82909 18.0521 7.12582 13.3536" stroke="url(#paint0_linear_622:13696)" stroke-width="5" stroke-linecap="round"/>
                       
                        <path d="M36.1948 28.8842C36.1948 29.4438 36.2557 29.8634 36.3775 30.1432C36.4992 30.423 36.6967 30.5628 36.9699 30.5628C37.5097 30.5628 37.7796 30.0033 37.7796 28.8842C37.7796 27.7717 37.5097 27.2155 36.9699 27.2155C36.6967 27.2155 36.4992 27.3537 36.3775 27.6302C36.2557 27.9067 36.1948 28.3247 36.1948 28.8842ZM38.456 28.8842C38.456 29.6347 38.3293 30.2024 38.0758 30.5875C37.8257 30.9693 37.457 31.1602 36.9699 31.1602C36.5091 31.1602 36.1504 30.9644 35.8936 30.5727C35.6402 30.181 35.5135 29.6182 35.5135 28.8842C35.5135 28.1371 35.6352 27.5742 35.8788 27.1957C36.1257 26.8172 36.4894 26.6279 36.9699 26.6279C37.4472 26.6279 37.8142 26.8238 38.0709 27.2155C38.3276 27.6071 38.456 28.1634 38.456 28.8842ZM40.5395 31.7774C40.5395 32.3402 40.6003 32.7615 40.7221 33.0413C40.8439 33.3178 41.043 33.456 41.3195 33.456C41.596 33.456 41.8001 33.3194 41.9317 33.0462C42.0634 32.7697 42.1292 32.3468 42.1292 31.7774C42.1292 31.2145 42.0634 30.7982 41.9317 30.5283C41.8001 30.2551 41.596 30.1185 41.3195 30.1185C41.043 30.1185 40.8439 30.2551 40.7221 30.5283C40.6003 30.7982 40.5395 31.2145 40.5395 31.7774ZM42.8056 31.7774C42.8056 32.5245 42.6789 33.0906 42.4254 33.4757C42.1753 33.8575 41.8067 34.0484 41.3195 34.0484C40.8521 34.0484 40.4917 33.8526 40.2383 33.4609C39.9881 33.0693 39.8631 32.5081 39.8631 31.7774C39.8631 31.0302 39.9849 30.4674 40.2284 30.0889C40.4753 29.7104 40.839 29.5211 41.3195 29.5211C41.7869 29.5211 42.1506 29.7153 42.4106 30.1037C42.6739 30.4888 42.8056 31.0467 42.8056 31.7774ZM41.5318 26.7316L37.5278 33.9497H36.8021L40.8061 26.7316H41.5318Z" fill="white"/>
                        
                        
                        <defs>
                        <linearGradient id="paint0_linear_622:13696" x1="5.54791e-07" y1="42.0001" x2="54.6039" y2="41.9535" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E323FF"/>
                        <stop offset="1" stop-color="#7517F8"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <div className="mt-6">
                        <h5 className="text-xl text-gray-700 text-center">Total Inventory Items</h5>
                        <div className="mt-2 flex justify-center gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">{inventoryData.length}</h3>
                            <div className="flex items-end gap-1 text-green-500">
                                <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor"/>
                                </svg>
                                <span>2%</span>
                            </div>
                        </div>
                        <span className="block text-center text-gray-500">Inventory Low In Stocks : {inventoryItem.length}</span>

                    </div>
                    <table className="mt-6 -mb-2 w-full text-gray-600">
                        <tbody>
                            {inventoryItem.map((item, index) => (
  <tr key={index}>
    <td className="py-2">{item.name}</td>
    <td className="text-gray-500">{item.quantity}</td>
    <td>
      <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <path d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5" stroke="url(#paint0_linear_622:13631)" stroke-width="2" stroke-linejoin="round"/>
                                        <defs>
                                        <linearGradient id="paint0_linear_622:13631" x1="68" y1="7.74997" x2="1.69701" y2="8.10029" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#E323FF"/>
                                        <stop offset="1" stop-color="#7517F8"/>
                                        </linearGradient>
                                        </defs>
      </svg>
    </td>
  </tr>
))}
                        </tbody>
                    </table>   
                </div>
            </div>
        </div>
    </div>
</div> */}
    </>
  );
}

export default DashboardMain;
