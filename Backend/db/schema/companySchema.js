const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const companySchema = new Schema(
  {
    gstNumber : {
      type:String
    },
    companyName: {
      type: String,
    },
    legalName: {
      type: String,
    },
    aliasName: {
      type: String,
    },
    addressLineTwo: {
      type: String,
    },
    addressLineOne: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    email: {
      type: String,
    },
    mobileNo: {
      type: Number,
    },
    registrationType: {
      type: String,
    },
    companyEstablishedFrom: {
      type: String,
    },
    selectedOption: {
      type: String,
    },
    gstin: {
      type: String,
    },
    partyType: {
      type: String,
    },
    gstApplicableFrom: {
      type: String,
    },
    panTanNo: {
      type: String,
    },
    typeOfOrganization: {
      type: String,
    },
    industry: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    faxNo: {
      type: String,
    },
    website: {
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

module.exports = companySchema;
