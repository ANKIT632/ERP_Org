const mongooose = require("mongoose");
const Schema = mongooose.Schema;
const moment = require("moment");

const purchaseSchema = new Schema(
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
    // quotationRef: [{ type: Schema.Types.ObjectId, ref: "Quotation" }],
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

module.exports = purchaseSchema;
