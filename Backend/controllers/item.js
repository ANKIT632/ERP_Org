const { itemModel } = require("../db/db");

const createItem = async (req, res) => {
  try {
    const value = req.body;
    const data = await itemModel.create({ ...value });
    res.status(200).json({
      success: true,
      response: data,
      message: "Item created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating Item.",
    });
  }
};

const getAllItem = async (req, res) => {
  try {
    const data = await itemModel.find();
    res.status(200).json({
      success: true,
      response: data,
      message: "Successfully fetech all the Items",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the Item.",
    });
  }
};

const updateItem = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Item ID is required for updating the Item.",
      });
    }
    const updateItem = await itemModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });
    if (!updateItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item has been  updated successfully.",
      data: updateItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the Item.",
    });
  }
};

const deleteItem = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.staus(400).json({
        success: false,
        message: "Item ID is required for deleting the Item.",
      });
    }
    const deleteItem = await itemModel.findByIdAndDelete(userId);
    if (!deleteItem) {
      return res.status(404).json({
        success: false,
        message: "Item Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "The Item Has Been Deleted Successfully",
      data: deleteItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the Item.",
    });
  }
};

module.exports = {
  createItem,
  getAllItem,
  updateItem,
  deleteItem,
};
