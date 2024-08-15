const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URL } = process.env;

const { UserSchema } = require("./schema/userSchema");
const { VoucherSchema } = require("./schema/voucherSchema");
const inventorySchema = require("./schema/inventorySchema");
const quotationSchema = require("./schema/quotationSchema");
const customerSchema = require("./schema/customerSchema");
const itemSchema = require("./schema/itemSchema");
const salesInvoiceSchema = require("./schema/salesInvoiceSchema");
const purchaseSchema = require("./schema/purchaseSchema");
const salesReturnSchema = require("./schema/salesReturnSchema");
const purchaseReturnSchema = require("./schema/purchaseReturnSchema");
const accountSchema = require("./schema/accountSchema");
const unitSchema = require("./schema/unitSchema");
const chartSchema = require("./schema/chartSchema");
const purchaseBillSchema = require("./schema/purchase/purchaseBillSchema");
const companySchema = require("./schema/companySchema");
const statutorySchema = require("./schema/statutorySchema");

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to mongodb successfully");
});

// Model definitions
const userModel = mongoose.model("Users", UserSchema);
const voucherModel = mongoose.model("Voucher", VoucherSchema);
const inventoryModel = mongoose.model("Inventory", inventorySchema);
const quotationModel = mongoose.model("Quotation", quotationSchema);
const customerModel = mongoose.model("Customer", customerSchema);
const itemModel = mongoose.model("Item", itemSchema);
const salesInvoiceModel = mongoose.model("SalesInvoice", salesInvoiceSchema);
const salesReturnModel = mongoose.model("SalesReturn", salesReturnSchema);
const purchaseModel = mongoose.model("Purchases", purchaseSchema);
const purchaseReturnModel = mongoose.model(
  "PurchaseReturn",
  purchaseReturnSchema
);
const accountModel = mongoose.model("Account", accountSchema);
const unitModel = mongoose.model("Unit", unitSchema);
const chartModel = mongoose.model("Chart", chartSchema);
const purchaseBillModel = mongoose.model("PurchaseBill", purchaseBillSchema);
const companyModel = mongoose.model("Company", companySchema);
const statutoryModel = mongoose.model("Statutory", statutorySchema);

module.exports = {
  db,
  userModel,
  voucherModel,
  inventoryModel,
  quotationModel,
  customerModel,
  itemModel,
  salesInvoiceModel,
  purchaseModel,
  salesReturnModel,
  purchaseReturnModel,
  accountModel,
  unitModel,
  chartModel,
  purchaseBillModel,
  companyModel,
  statutoryModel,
};
