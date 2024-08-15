const { salesReturnModel } = require("../db/db");

const createSalesReturn = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(401).json({
        success: false,
        response: data,
        message: "data not getting",
      });
    }
    const value = await salesReturnModel.create({...data});
    return res.status(200).json({
      success: true,
      response: value,
      message: "Sales return created Succssfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getAllSalesReturn = async (req, res) => {
  try {
    const data = await salesReturnModel.find();
    res.status(200).json({
      success: true,
      response: data,
      message: "Get All Sales Return Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the sales return.",
    });
  }
};
const getSalesReturnById = async (req, res) => {
  try {

    const data = await salesReturnModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      response: data,
      message: "Get All Sales Return Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the sales return.",
    });
  }
};

const updateSalesReturn = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.stauts(400).json({
        success: false,
        message: "Sales Return ID is required for updating the sales return.",
      });
    }
    const updateSalesReturn = await salesReturnModel.findByIdAndUpdate(
      userId,
      newData,
      { new: true }
    );
    if (!updateSalesReturn) {
      return res.status(404).json({
        success: false,
        message: "Sales Return not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Sales Return has been updated Successfully.",
      data: updateSalesReturn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating sales return.",
    });
  }
};

const deleteSalesReturn = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sales Return Id is Required for deleting the customer.",
      });
    }
    const deleteSalesReturn = await salesReturnModel.findByIdAndDelete(userId);
    if (!deleteSalesReturn) {
      return res.status(404).json({
        success: false,
        message: "Sales Return Not Found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Sales Return Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while delete salses return.",
    });
  }
};

module.exports = {
  createSalesReturn,
  getAllSalesReturn,
  updateSalesReturn,
  deleteSalesReturn,
  getSalesReturnById
};
