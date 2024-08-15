const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const purchaseBillSchema = new Schema(
  {
    vendor: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    poNumber: {
      type: String,
    },
    poDate: {
      type: String,
    },
    quotationNo: {
      type: Number,
    },
    service: [
      {
        productName: {
          type: String,
        },
        productQuantity: {
          type: String,
        },
        productRate: {
          type: String,
        },
        productDisc: {
          type: String,
        },
        productAmount: {
          type: String,
        },
      },
    ],
    note: {
      type: String,
    },
  }
  // ,
  // {
  //   timestamps: true,
  //   toJSON: {
  //     transform: function (doc, ret) {
  //       ret.createdAt = moment(ret, createdAt).format("DD MMM YYYY");
  //       ret.updatedAt = moment(ret, updatedAt).format("DD MMM YYYY");
  //       return ret;
  //     },
  //   },
  // }
);

module.exports = purchaseBillSchema;
