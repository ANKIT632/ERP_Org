import react from "react";
import { Link } from "react-router-dom";
export default function StatutoryInfo() {


    return (
        <>
         <div className="p-8 max-w-6xl mx-auto">
            <div className="flex items-center mb-6">
                <Link to='/erp/settings' className="pt-2">
                <button className="text-zinc-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                    </svg>
                </button>
                </Link>
                <h1 className="text-xl font-semibold">Statutory Information</h1>
              
            </div>
        <div className="space-y-4  ">
            <div className="border p-4 rounded-lg grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-3 bg-white border-gray-400">
                <div className="col-span-2"> 
                <h2 className="font text-lg">GST Details</h2>
                <p className="text-gray-500">If this option is marked Yes then only you can see your GST related report, otherwise report are not display as per expectation.</p>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-4">
                    <p className="bg-blue-100 rounded-full px-2 text-blue-700 text-md">{"No"}</p>
                    <Link to="edit-gst"> <button className="text-blue-500">Edit</button></Link>
                   
                    <Link to="view-gst"><button className="text-blue-500">View</button></Link>
                </div>
            </div>
            <div className="border p-4 rounded-lg grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-3 bg-white border-gray-400">
            <div className="col-span-2"> 
                <h2 className="font text-lg">TDS Details</h2>
                <p className="text-gray-500">If this option is marked Yes then only you can see your Tds related report, otherwise report are not display as per expectation.</p>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-4">
                    <p className="bg-blue-100 rounded-full px-2 text-blue-700 text-md">{"No"}</p>
                    <Link to="edit-tds"><button className="text-blue-500">Edit</button></Link>
                    <Link to="view-tds"><button className="text-blue-500">View</button></Link>
                </div>
            </div>
            <div className="border p-4 rounded-lg grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-3 bg-white border-gray-400">
            <div className="col-span-2"> 
                <h2 className="font text-lg">TCS Details</h2>
                <p className="text-gray-500">If this option is marked Yes then only you can see your Tds related report, otherwise report are not display as per expectation.</p>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-4">
                    <p className="bg-blue-100 rounded-full px-2 text-blue-700 text-md">{"No"}</p>
                    <Link to="edit-tcs"><button className="text-blue-500">Edit</button></Link>
                   <Link  to="view-tcs"><button className="text-blue-500">View</button></Link> 
                </div>
            </div>
        </div>
        </div>
        </>
       
    )
}