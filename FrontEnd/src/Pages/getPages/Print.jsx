import React from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";

function ComponentToPrint({reff}) {
  return (
    <div ref={reff}>
      <h1>Print Component</h1>
    </div>
  );
}

export default function Print() {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <ComponentToPrint reff={componentRef} />
      <li className="menu-item hover:bg-blue-300">
        <button
          className="flex justify-center items-center gap-4 px-4 py-1"
          onClick={handlePrint}
        >
          <AiFillPrinter /> Print
        </button>
      </li>
    </>
  );
}