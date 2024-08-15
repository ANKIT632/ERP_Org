const { accountModel } = require("../db/db");

const createAccount = async (req, res) => {
  try {
    const value = req.body;
    const data = await accountModel.create({ ...value });
    res.status(200).json({
      success: true,
      response: data,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the account.",
    });
  }
};

const getAllAccount = async (req, res) => {
  try {
    const data = await accountModel.find();
    res.status(200).json({
      success: true,
      response: data,
      message: "Account fetch successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the account.",
    });
  }
};

const updateAccount = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Account ID is required for updating the account.",
      });
    }
    const updatedAccount = await accountModel.findByIdAndUpdate(
      userId,
      newData,
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Account updated successfully.",
      data: updatedAccount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the account.",
    });
  }
};

const deleteAccount = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Account ID is required for deleting the account.",
      });
    }
    const deletedAccount = await accountModel.findByIdAndDelete(userId);
    if (!deletedAccount) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the account.",
    });
  }
};

module.exports = {
  createAccount,
  getAllAccount,
  updateAccount,
  deleteAccount,
};
