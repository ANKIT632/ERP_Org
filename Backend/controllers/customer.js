const { customerModel } = require("../db/db");

const createCustomer = async (req, res) => {
  try {
    const value = req.body;
    const data = await customerModel.create({ ...value });
    return res.status(200).json({
      success: true,
      response: data,
      message: "Customer created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while Creating the customer.",
    });
  }
};
const getCustomerById = async (req, res) => {
  try {
    const customer = await customerModel.findById(req.params.customerId);
    res.status(200).json({
      success: true,
      response: customer,
      message: "Customer fetch successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllCustomer = async (req, res) => {
  try {
    const data = await customerModel.find();
    res.status(200).json({
      success: true,
      response: data,
      message: "Customer fetch successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the customer.",
    });
  }
};

const updateCustomer = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required for updating the customer.",
      });
    }
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      userId,
      newData,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the customer.",
    });
  }
};

const deleteCustomer = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required for deleting the customer.",
      });
    }
    const deletedCustomer = await customerModel.findByIdAndDelete(userId);
    if (!deletedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the customer.",
    });
  }
};

module.exports = {
  createCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
};
