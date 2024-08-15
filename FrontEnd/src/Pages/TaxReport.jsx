import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

function TaxReport() {
    const [selectedOption, setSelectedOption] = useState("Last 7 days");
    const [data, setData] = useState([])

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
      };
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const date = new Date()
    const userToken = localStorage.getItem("erp_admin_token");
    const invoice = jwtDecode(userToken);


    useEffect(() => {
        const currentDate = new Date();
    axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/all-invoice/${invoice.id}`
    ).then((res) => {
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
        setData(filteredInvoiceData);
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });

}, [selectedOption]);

        const [totalTax, setTotalTax] = useState(0)
        
    useEffect(() => {
        function calculateTotalTax(data) {
            let calclTax = totalTax
            data.forEach(item => {
                // Remove the dollar sign and convert the tax amount to a number
                const tax = parseFloat(item.taxAmount);
                // Add the tax amount to the total
                calclTax += tax;
            });
            return calclTax;
        }
        if (data.length !== 0) {
            setTotalTax(calculateTotalTax(data));
        }
    }, [data])
    
console.log(data , "dafsfjlaj")
    return (
        <>
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
            <div className="rounded-lg shadow-sm h-full w-full py-5" data-v0-t="card" ref={componentRef}>
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Tax Report</h3>
                    <p className="text-sm text-muted-foreground">View tax information for all invoices</p>
                </div>
                <div className="p-6 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="font-medium">Report Period</div>
                            <div>{`From: ${date.getFullYear()}-01-01`}</div>
                            <div>{`From: ${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-medium">Total Tax Amount</div>
                            <div>Rs.{totalTax}</div>
                        </div>
                    </div>

                </div>
                <div className="p-0 overflow-auto">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&amp;_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Invoice</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Customer</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">Total</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">Tax</th>
                                </tr>
                            </thead>
                            <tbody className="[&amp;_tr:last-child]:border-0">
                                {data.map((elem, index) => {
                                    return <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">{elem.invoiceNumber}</td>
                                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{elem.billTo.name}</td>
                                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{elem.createdAt}</td>
                                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">Rs.{elem.subTotal.toFixed(2)}</td>
                                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">Rs.{elem.taxAmount.toFixed(2)}</td>
                                    </tr>
                                })}

                                {/* More rows here */}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <div className="w-full flex justify-center items-center my-3">
                <button className='mx-auto w-[120px] px-2 py-1 rounded text-white font-semibold text-lg uppercase bg-blue-700' onClick={handlePrint}>Print</button>
            </div>
        </>
    );
}

export default TaxReport;
