const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const invoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: Number,
      default: 0,
    },
    billFrom: {
      name: {
        type: String,
        required: true,
      },
      email: {},
      address: {
        type: String,
        required: true,
      },
      gstNumber: {
        type: String,
        required: true,
      },
    },
    billTo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      gstNumber: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: Number,
        required: true,
      },
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    discountPercentage: {
      type: Number,
    },
    discountAmount: {
      type: Number,
    },
    taxPercentage: {
      type: Number,
    },
    taxAmount: {
      type: Number,
    },
    total: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
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

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
