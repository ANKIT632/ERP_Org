/* eslint-disable react/prop-types */

import ReactPrint from "react-to-print";

const PrintBtn = ({ contentref }) => {
  return (
    <div className="w-full  ">
      <ReactPrint
        trigger={() => (
          <button className="px-6 py-2 self-end bg-gray-800 text-white rounded">
            Print
          </button>
        )}
        content={() => contentref.current}
        documentTitle={`INVOICE`}
      />
    </div>
  );
};

export default PrintBtn;
