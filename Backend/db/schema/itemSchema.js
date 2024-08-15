const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const itemSchema = new Schema(
  {
    productName: {
      type: String,
    },
    productDescription: {
      type: String,
    },
    itemGroup: {
      type: String,
    },
    itemCategory: {
      type: String,
    },
    unit: {
      type: String,
    },
    hsnCode: {
      type: Number,
    },
    stockQty: {
      type: Number,
    },
    stockValue: {
      type: Number,
    },
    mrp: {
      type: String,
    },
    purchase: {
      type: String,
    },
    sales: {
      type: String,
    },
    gst: {
      type: String,
    },
    status: {
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

module.exports = itemSchema;
