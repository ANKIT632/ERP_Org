import React from 'react'

function Graphpara(props) {
  return (
    <div className="p-7 bg-gray-200 mt-10 rounded">
    <div className="flex justify-between mb-2">
      {/* invoice */}
      <div className="text-lg font-medium">Sale</div>
      <div className="text-lg font-medium">{props.totalInvoice}/-</div>
    </div>
    <div className="flex justify-between mb-2">
      {/* inventory */}
      <div className="text-lg font-medium">Purchase</div>
      <div className="text-lg font-medium">{props.totalInventory}/-</div>
    </div>
    <hr className="my-4 border-2 border-t-gray-500 " />
    <div className="flex justify-between">
      <div className={`text-xl font-medium ${props.profitColor}`}>
        {props.profitText}
      </div>
      <div className={`text-xl font-medium ${props.profitColor}`}>
        {Math.abs(props.profit)}/-
      </div>
    </div>
  </div>
  )
}

export default Graphpara