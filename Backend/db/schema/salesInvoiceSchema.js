const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");


const salesInvoiceSchema = new Schema(
  {
    customerName: {
      type: String,
    },
    customerDetails: { type: Schema.Types.ObjectId, ref: 'Customer' },

    gstin: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    book: {
      type: String,
    },
    seriesName: {
      type: String,
    },
    invoiceNumber: {
      type: Number,
    },
    invoiceDate: {
      type: Date,
      default: Date.now,
    },
    quotationNumber: {
      type: Number,
    },
    products: [
      {
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
      },
    ],
    note: {
      type: String,
    },
    terms: {
      type: String,
    },
    subTotal: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    discountAmount: {
      type: String,
    },
    addFile: {
      type: String,
    },
    taxPercentage: {
      type: Number,
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
    isPaid:{
      type:Boolean,
    }
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

module.exports = salesInvoiceSchema;
