const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const purchaseReturnSchema = new Schema(
  {
    vendor: {
      type: String,
    },
    debitNo: {
      type: String,
    },
    debitDate: {
      type: String,
    },
    referenceNo: {
      type: String,
    },
    referenceDate: {
      type: String,
    },
    note: {
      type: String,
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

module.exports = purchaseReturnSchema;
