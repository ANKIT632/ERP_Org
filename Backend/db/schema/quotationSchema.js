const mongoose = require("mongoose");
const moment = require("moment");

const quotationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerMobile: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    quotationNo: {
      type: Number,
      required: true,
    },
    quotationDate: {
      type: Date,
      default: Date.now,
    },
    validQuotationDate: {
      type: Date,
    },
    products: [
      {
        productName: {
          type: String,
          required: true,
        },
        productQuantity: {
          type: Number,
          required: true,
        },
        productAmount: {
          type: Number,
          required: true,
        },
      },
    ],
    notes: {  
      type: String,
    },
    tax: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      default: function () {
        return this.products.reduce(
          (total, product) =>
            total + product.productQuantity * product.productAmount,
          0
        );
      },
    },
    totalAmount: {
      type: Number,
      default: function () {
        return this.subtotal + this.subtotal * (this.tax / 100 || 0);
      },
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

module.exports = quotationSchema;
