const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const unitSchema = new Schema(
  {
    shortName: {
      type: String,
    },
    unitName: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.createdAt = moment(ret.createdAt).format("DD/MM/YYYY");
        ret.updatedAt = moment(ret.updatedAt).format("DD/MM/YYYY");
        return ret;
      },
    },
  }
);

module.exports = unitSchema;
