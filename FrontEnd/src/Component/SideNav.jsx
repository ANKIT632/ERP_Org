import { RiBillLine } from "react-icons/ri"; 
import { AiOutlinePieChart } from "react-icons/ai"; 
import { BiPieChartAlt } from "react-icons/bi"; 
import { RiMastercardLine } from "react-icons/ri"; 
import { MdOutlineAccountTree } from "react-icons/md"; 
import { BiUnite } from "react-icons/bi"; 
import { CgShoppingBag } from "react-icons/cg"; 
import { BiBookOpen } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiTemplate } from "react-icons/hi";
import { MdAccountBox } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { RiFilePaper2Line } from "react-icons/ri";
import { RiFilePaperFill } from "react-icons/ri";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { SiSalesforce } from "react-icons/si";
import { FcSalesPerformance } from "react-icons/fc";
import { TbReportMoney } from "react-icons/tb";
import { CgMenuLeftAlt } from "react-icons/cg";
import { GiExpense } from "react-icons/gi";
import { TbFileInvoice } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgClose } from "react-icons/cg";

const SideNav = () => {
  const [currentLocation, setLocation] = useState("");
  const locationc = useLocation();
  useEffect(() => {
    setLocation(locationc.pathname.slice(5, locationc.pathname.length));
  }, [locationc]);
  const [slide, setSlide] = useState(true);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <button
        className="fixed xl:hidden block left-3 top-4"
        onClick={() => {
          setSlide(!slide);
        }}
      >
        <CgMenuLeftAlt size={30} />
      </button>
      <div
        className={`w-full min-h-[100vh] h-full flex gap-0 transition-all xl:opacity-100  xl:w-14 xl:hover:w-52 xl:pointer-events-auto fixed  ${
          slide ? "opacity-0 pointer-events-none " : "opactiy-100"
        }`}
      >
        <div className=" flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-gray-800 w-52 xl:w-14 xl:hover:w-52">
          <div
            className={`${
              slide ? "-left-52" : "left-0"
            } xl:left-0 transition-all fixed flex flex-col  left-0 w-52 xl:w-14 xl:hover:w-52 bg-white h-full border-r`}
          >
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="dashboard"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "dashboard"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="inventory"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "inventory"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Manage Inventory
                    </span>
                  </Link>
                </li>
                <div className="dropdown">
                  <button
                    onClick={() =>
                      document
                        .getElementById("masterdropdown")
                        .classList.toggle("hidden")
                    }
                    className={`flex  justify-between w-full items-center gap-2 hover:bg-blue-200 text-gray-600 hover:text-gray-800 border-l-4 py-2`}
                  >
                    <span className="flex">
                    <RiMastercardLine size={20} className="ml-4 mr-2" />
                      <p className="text-sm  tracking-wide truncate pl-2">
                        Masters
                      </p>{" "}
                    </span>
                    <IoMdArrowDropdown />
                  </button>
                  <ul id="masterdropdown" className="menu hidden">
                  <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="create-account"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "create-account"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <MdAccountBox size={20} />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Account
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="create-item"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "create-item"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <HiTemplate size={20} />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Item
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="unit"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "unit"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <BiUnite  size={20} />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Unit
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="charts-of-account"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "charts"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                    <MdOutlineAccountTree size={20}/> 
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                   Charts Of Account
                    </span>
                  </Link>
                </li>
                  </ul>
                </div>
               
             

             

                <div className="dropdown">
                  <button
                    onClick={() =>
                      document
                        .getElementById("salesDropdown")
                        .classList.toggle("hidden")
                    }
                    className={`flex  justify-between w-full items-center gap-2 hover:bg-blue-200 text-gray-600 hover:text-gray-800 border-l-4 py-2`}
                  >
                    <span className="flex">
                      <BiBookOpen size={20} className="ml-4 mr-2" />
                      <p className="text-sm  tracking-wide truncate pl-2">
                        Sales
                      </p>{" "}
                    </span>
                    <IoMdArrowDropdown />
                  </button>
                  <ul id="salesDropdown" className="menu hidden">
                    <li>
                      <Link
                        onClick={() => {
                          setSlide(true);
                        }}
                        to="sales-invoice"
                        className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                          currentLocation === "sales-invoice"
                            ? "border-blue-900"
                            : "border-transparent"
                        }  hover:border-blue-900 pr-6`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <FaFileInvoiceDollar />
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                          Sales Invoice
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setSlide(true);
                        }}
                        to="sales-report"
                        className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                          currentLocation === "sales-report"
                            ? "border-blue-900"
                            : "border-transparent"
                        }  hover:border-blue-900 pr-6`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            ></path>
                          </svg>
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                          Sales report
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setSlide(true);
                        }}
                        to="sales-quotation"
                        className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                          currentLocation === "sales-quotation"
                            ? "border-blue-900"
                            : "border-transparent"
                        }  hover:border-blue-900 pr-6`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <SiSalesforce />
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                          Sales Quotation
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setSlide(true);
                        }}
                        to="sales-return"
                        className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                          currentLocation === "sales-return"
                            ? "border-blue-900"
                            : "border-transparent"
                        }  hover:border-blue-900 pr-6`}
                      >
                        <span className="inline-flex justify-center items-center ml-4">
                          <MdOutlineAssignmentReturn />
                        </span>
                        <span className="ml-2 text-sm tracking-wide truncate">
                          Sales Returns
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
        <button onClick={() => document.getElementById('purchaseDropdown').classList.toggle('hidden')} className={`flex justify-between w-full items-center gap-2 hover:bg-blue-200 text-gray-600 hover:text-gray-800 border-l-4 py-2`}>
          <span className="flex"><CgShoppingBag  size={20} className="ml-4 mr-2" /><p className="text-sm pl-2 tracking-wide truncate">Purchase</p> </span>< IoMdArrowDropdown />
        </button>
        <ul id="purchaseDropdown" className="menu hidden">
        <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="purchase-orders"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "purchase-orders"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <BiPurchaseTag size={20}/>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Purchase Orders
                    </span>
                  </Link>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="purchase-bill"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "purchase-bill"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      {/* <MdOutlineAssignmentReturn /> */}
                      <RiBillLine size={20}/>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Purchase Bill
                    </span>
                  </Link>

                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="purchase-returns"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "purchase-returns"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <MdOutlineAssignmentReturn size={20}/>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Purchase Returns
                    </span>
                  </Link>
                </li>
        </ul>
      </div>
 
      <div className="dropdown">
        <button onClick={() => document.getElementById('reportsDropdown').classList.toggle('hidden')} className={`flex  justify-between w-full items-center gap-2 hover:bg-blue-200 text-gray-600 hover:text-gray-800 border-l-4 py-2`}>
          <span className="flex">
<AiOutlinePieChart size={20} className="ml-4 mr-2"  />
            <p className="text-sm pl-2 tracking-wide truncate">Reports</p> </span>< IoMdArrowDropdown />
        </button>
        <ul id="reportsDropdown" className="menu hidden">
        <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="tax"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "tax"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <TbReportMoney size={20} />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Tax report
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="ledger"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "ledger"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Ledger
                    </span>
                  </Link>
                </li>
        </ul>
      </div>

               
      <div className="dropdown">
    
        <ul id="featuresDropdown" className="menu ">
        <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="invoice"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "invoice"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4 ">
                      <TbFileInvoice size={20} />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Instant Invoicing
                    </span>
                  </Link>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="reciepts"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "reciepts"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4 ">
                      <RiFilePaper2Line />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Reciepts
                    </span>
                  </Link>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="bank-reconciliation"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "bank-reconciliation"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4 ">
                      <CiBank size={20} />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Bank Reconciliation
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      setSlide(true);
                    }}
                    to="exp-tracker"
                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 ${
                      currentLocation === "exp-tracker"
                        ? "border-blue-900"
                        : "border-transparent"
                    }  hover:border-blue-900 pr-6`}
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                      <GiExpense size={20} />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Expense Tracker
                    </span>
                  </Link>
                </li>

        </ul>
      </div>
               
              
              </ul>
            </div>
          </div>
        </div>
        <div
          className="w-[calc(100%-208px)] h-full xl:opacity-0 realtive bg-[#0003] cursor-pointer xl:pointer-events-none"
          onClick={() => {
            setSlide(true);
          }}
        >
          <button
            className="absolute right-2 top-2 bg-gray-200 border border-gray-100 rounded-full flex justify-center items-center w-7 h-7 hover:rotate-90 duration-200"
            onClick={() => {
              setSlide(true);
            }}
          >
            <CgClose />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNav;
