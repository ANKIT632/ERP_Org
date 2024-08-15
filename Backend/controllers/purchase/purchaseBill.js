const { purchaseBillModel } = require("../../db/db");

const createPurchaseBill = async (req, res) => {
  try {
    const value = req.body;
    const data = await purchaseBillModel.create({ ...value });

    return res.status(200).json({
      success: true,
      message: "Purchase bill created successfully",
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

const getAllPurchaseBill = async (req, res) => {
  try {
    const data = await purchaseBillModel.find();
    return res.status(200).json({
      success: true,
      message: "Purchase bill created successfully",
      response: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the purchase",
    });
  }
};

const updatePurchaseBill = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Purchase Bill id is required for updating the purchase.",
      });
    }
    const updatePurchaseBill = await purchaseBillModel.findByIdAndUpdate(
      userId,
      newData,
      {
        new: true,
      }
    );

    if (!updatePurchaseBill) {
      return res.status(404).json({
        success: false,
        message: "Purchase Bill not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Purchase bill update successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the purchase bill",
    });
  }
};

const deletePurchaseBill = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Purchase Bill id is required for deleting the purchase.",
      });
    }
    const deletePurchase = await purchaseBillModel.findByIdAndDelete(userId);
    if (!deletePurchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase Bill  Not Found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Purchase Bill deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the purchase bill",
    });
  }
};

module.exports = {
  createPurchaseBill,
  getAllPurchaseBill,
  updatePurchaseBill,
  deletePurchaseBill,
};
