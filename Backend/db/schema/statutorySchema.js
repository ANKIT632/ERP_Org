const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const statutorySchema = new Schema(
  {
    tanRegistration: {
      type: String,
    },
    taxDeduction: {
      type: String,
    },
    deducteeType: {
      type: String,
    },
    deductorBranch: {
      type: String,
    },
    selectedTscSection: [
      {
        type: String,
      },
    ],
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

module.exports = statutorySchema;
