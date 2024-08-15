const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const customerSchema = new Schema(
  {
    accountName: {
      type: String,
    },
    sortName: {
      type: String,
    },
    email: {
      type: String,
    },
    contactName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    pan: {
      type: String,
    },
    defaultPeriod: {
      type: Number,
    },
    mode: {
      type: String,
      enum: ["Cheque", "Net banking", "Cash", "UPI", "IMPS", "NEFT"],
      default: "Cheque",
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    accountHolder: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    ifscCode: {
      type: String,
    },
    bankName: {
      type: String,
    },
    openingBalance: {
      type: Number,
    },
    provideBankDetails: {
      type: String,
    },
    crdr: {
      type: String,
    },
    pincode: {
      type: Number,
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
module.exports = customerSchema;
