const { statutoryModel } = require("../db/db");

const createTds = async (req, res) => {
  try {
    const value = req.body;
    const data = await statutoryModel.create({ ...value });
    return res.status(200).json({
      success: true,
      response: data,
      message: "Statutory created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the statutory.",
    });
  }
};

const updateTds = async (req, res) => {
  const statutoryId = req.params.id;
  const newData = req.body;
  try {
    if (!statutoryId) {
      return res.status(400).json({
        success: false,
        message: "Statutory ID is required for updating the statutory.",
      });
    }

    const updatedStatutory = await statutoryModel.findByIdAndUpdate(
      statutoryId,
      newData,
      { new: true }
    );
    if (!updatedStatutory) {
      return res.status(404).json({
        success: false,
        message: "Statutory not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Statutory updated successfully.",
      data: updatedStatutory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while updating the statutory",
    });
  }
};

const getTds = async (req, res) => {
  try {
    const statutoryData = await statutoryModel.findById(req.params.statutoryId);
    return res.status(200).json({
      success: true,
      response: statutoryData,
      message: "Statutory fetch successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while fetching the statutory",
    });
  }
};

module.exports = {
  createTds,
  updateTds,
  getTds,
};
