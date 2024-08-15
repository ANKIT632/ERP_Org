const { salesInvoiceModel } = require("../db/db");

const createSalesInvoice = async (req, res) => {
  try {
    const value = req.body;
    const data = await salesInvoiceModel.create({ ...value });
    res.status(200).json({
      success: true,
      response: data,
      message: "Sales Invoice Created Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating salses Invoice.",
    });
  }
};

const getAllSalesInvoice = async (req, res) => {
  try {
    const data = await salesInvoiceModel.find();
    res.status(200).json({
      success: true,
      response: data,
      message: "Get all sales invoice successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the sales invoice.",
    });
  }
};
const getInoviceById = async (req, res) => {
  try {
    
    const data = await salesInvoiceModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      response: data,
      message: "Get all sales invoice successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the sales invoice.",
    });
  }
};

const updateSalesInvoice = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.stauts(400).json({
        success: false,
        message: "Sales Invoice ID is required for updating the sales invoice.",
      });
    }
    const updateSales = await salesInvoiceModel.findByIdAndUpdate(
      userId,
      newData,
      { new: true }
    );
    if (!updateSales) {
      return res.status(404).json({
        success: false,
        message: "Sales Invoice not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Sales Invoice has been updated Successfully.",
      data: updateSales,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating sales invoice.",
    });
  }
};

const deleteSalesInvoice = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sales Invoice Id is Required for deleting the customer.",
      });
    }
    const deleteSales = await salesInvoiceModel.findByIdAndDelete(userId);
    if (!deleteSales) {
      return res.status(404).json({
        success: false,
        message: "Sales Invoice Not Found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Sales Invoice Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while delete salses invoice.",
    });
  }
};

module.exports = {
  createSalesInvoice,
  getAllSalesInvoice,
  updateSalesInvoice,
  deleteSalesInvoice,
  getInoviceById
};
