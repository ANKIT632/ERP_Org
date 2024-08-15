const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const salesReturnSchema = new Schema(
  {
    customer: {
      type: String,
    },
    creditNote: {
      type: String,
    },
    creditDate: {
      type: String,
    },
    note: {
      type: String,
    },
    reason: {
      type: String,
    },

    productName: {
      type: String,
    },
    productQuantity: {
      type: Number,
    },
    productAmount: {
      type: Number,
    },
    productRate: {
      type: Number,
    },

    invoiceNumber: {
      type: Number,
    },
    invoiceDate: {
      type: Date,
    },
    InvoiceQty: {
      type: Number,
    },
    taxAmount: {
      type: Number,
    },
    taxPercentage: {
      type: Number,
    },
    cess: {
      type: String,
    },
    taxAmount: {
      type: Number,
    },
    subTotal: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    batchNumber: {
      type: String,
    },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    invoiceId: { type: Schema.Types.ObjectId, ref: "SalesInvoice" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.createdAt = moment(ret.createdAt).format("DD MMM YYYY");
        ret.updatedAt = moment(ret.updatedAt).format("DD MMM YYYY");
        return ret;
      },
    },
  }
);

module.exports = salesReturnSchema;
