const { purchaseModel } = require("../../db/db");

const createPurchase = async (req, res) => {
  try {
    const value = req.body;
    const data = await purchaseModel.create({ ...value });
    return res.status(200).json({
      success: true,
      message: "Purchase Created Successfully",
      response: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the purchase",
    });
  }
};

const getAllPurchase = async (req, res) => {
  try {
    const data = await purchaseModel.find();
    return res.status(200).json({
      success: true,
      response: data,
      message: "Purchase fetch successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the purchase",
    });
  }
};

const updatePurchase = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Purchase Id is required for updating the purchase.",
      });
    }
    const updatePurchase = await purchaseModel.findByIdAndUpdate(
      userId,
      newData,
      { new: true }
    );
    if (!updatePurchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found.",
      });
    } 
    return res.status(200).json({
      success: true,
      message: "Purchase update successfully.",
      data: updatePurchase,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the Purchase",
    });
  }
};

const deletePurchase = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Purchase Id is required for deleting the purchase.",
      });
    }
    const deletePurchase = await purchaseModel.findByIdAndDelete(userId);
    if (!deletePurchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase  Not Found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Purchase deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the Purchase.",
    });
  }
};

const getPurchaseById = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "purchase order id not found",
      });
    }
    const purchaseOrder = await purchaseModel.findById({ userId });
    return res.status(200).json({
      success: true,
      message: "Purchase Bill deleted successfully",
      response: purchaseOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting purchase order by id",
    });
  }
};

module.exports = {
  createPurchase,
  getAllPurchase,
  updatePurchase,
  deletePurchase,
  getPurchaseById,
};
