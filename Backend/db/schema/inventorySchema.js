const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    unit: {
      type: Object,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
    stdCost: {
      type: String,
      required: true,
    },
    purchCost: {
      type: String,
      required: true,
    },
    stdSaleCost: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    internalNotes: {
      type: String,
      default: "",
    },
    hsnSac: {
      type: String,
      required: true,
    },
    gst: {
      type: String,
      required: true,
    },
    minStock: {
      type: Number,
      default: 0,
    },
    leadTime: {
      type: Number,
    },
    itemType: {
      type: Object,
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

module.exports = inventorySchema;
