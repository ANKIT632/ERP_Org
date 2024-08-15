const mongoose = require("mongoose");
const moment = require("moment");

const VoucherSchema = new mongoose.Schema(
  {
    voucherType: {
      type: Object,
      // required: true,
    },
    voucherNumber: {
      type: Number,
      // required: true,
    },
    voucherNote: {
      type: String,
    },
    selectLedger: {
      type: Object,
      min: 8,
    },
    credit: {
      type: Number,
      default: 0,
    },
    debit: {
      type: Number,
      default: 0,
    },
    currBalance: {
      type: Number,
      default: true,
    },
    file: {
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

module.exports = {
  VoucherSchema,
};
