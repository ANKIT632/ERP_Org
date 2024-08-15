const { purchaseReturnModel } = require("../../db/db");

const createPurchaseReturn = async (req, res) => {
  try {
    const value = req.body;
    const data = await purchaseReturnModel.create({ ...value });
    res.status(200).json({
      success: true,
      response: data,
      message: "Purchase Return Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePurchaseReturn = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message:
          "Purchase return id is required for updating the purchase return.",
      });
    }
    const updatePurchaseReturn = await purchaseReturnModel.findByIdAndUpdate(
      userId,
      { ...newData },
      { new: true }
    );
    if (!updatePurchaseReturn) {
      return res.stauts(404).json({
        success: false,
        message: "Purchase return not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Purchase return update successfully.",
      data: updatePurchaseReturn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while update the purchase return",
    });
  }
};

const deletePurchaseReturn = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Purchase return id is required.",
      });
    }
    const deletePurchaseReturn = await purchaseReturnModel.findByIdAndDelete(
      userId
    );
    if (!deletePurchaseReturn) {
      return res.status(404).json({
        success: false,
        message: "Purchase return not found.",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Purchase return deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while delete the purchase return",
    });
  }
};

const getAllPurchaseReturn = async (req, res) => {
  try {
    const data = await purchaseReturnModel.find();
    return res.status(200).json({
      success: true,
      message: "Purchase return fetch successfully",
      response: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while get all purchase return",
    });
  }
};

module.exports = {
  createPurchaseReturn,
  updatePurchaseReturn,
  deletePurchaseReturn,
  getAllPurchaseReturn,
};
