const { unitModel } = require("../db/db");

exports.createUnit = async (req, res) => {
  try {
    const value = req.body;
    let newUnit = await unitModel.create({ ...value });
    if (!newUnit) {
      return res.status(400).json({
        success: false,
        message: "Failed to create Unit",
      });
    }
    return res.status(201).json({
      success: true,
      response: newUnit,
      message: "Unit created successfully",
    });
  } catch (error) {
    console.error(error, "error");
    return res.status(500).json({
      success: false,
      message: "Error while Creating the Unit.",
    });
  }
};

exports.getAllUnits = async (req, res) => {
  try {
    let units = await unitModel.find();
    return res.status(200).json({
      success: true,
      count: units.length,
      response: units,
      message: "Unit fetch successfully",
    });
  } catch (error) {
    console.error(error, "error");
    return res.status(500).json({
      success: false,
      message: "Error while getting all the unit.",
    });
  }
};

exports.updateUnit = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Unit ID is required for updating the unit.",
      });
    }
    const updatedUnit = await unitModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUnit) {
      return res.status(400).json({
        success: false,
        message: "Unit not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Unit update successfully.",
      response: updatedUnit,
    });
  } catch (error) {
    console.error(error, "error");
    return res.status(500).json({
      success: false,
      message: "Error while updating the unit.",
    });
  }
};

exports.deleteUnit = async (req, res) => {
  let id = req.params.id;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Unit ID is required for deleting the unit.",
      });
    }
    const deletedCustomer = await unitModel.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Unit not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Unit deleted successfully.",
    });
  } catch (error) {
    console.error(error, "error");
    return res.status(500).json({
      success: false,
      message: "Error while deleting the unit.",
    });
  }
};
