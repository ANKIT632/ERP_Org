const { quotationModel } = require("../db/db");

const createQuotation = async (req, res) => {
  try {
    let val = req.body;
    const quotation = await quotationModel.create({ ...val });

    res.status(200).json({
      success: true,
      quotation,
      message: "quotation created succssfully",
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(422).json({ errors: "quotation unsuccessfully" });
    }
    res.status(500).json({ error: err.message });
  }
};

const getAllQuotation = async (req, res) => {
  try {
    const data = await quotationModel.find();
    res.status(200).json({
      success: true,
      data,
      message: "Get all quotation successfully",
    });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({ errors: "Internal server error" });
    }
    res.status(500).json({ error: err.message });
  }
};

const updateQuotation = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Quotation Id is required for updating the quotation.",
      });
    }
    const updateQuotation = await quotationModel.findByIdAndUpdate(
      userId,
      newData,
      { new: true }
    );

    if (!updateQuotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Quotation updated successfully.",
      data: updateQuotation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update Quotation.",
    });
  }
};

const deleteQuotation = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Quotation Id is required for deleting the quotation.",
      });
    }
    const deleteQuotation = await quotationModel.findByIdAndDelete(id);
    if (!deleteQuotation) {
      return res.status(400).json({
        success: false,
        message: "Quotation not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Quotation deleted  successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Delete Quotation.",
    });
  }
};

module.exports = {
  createQuotation,
  getAllQuotation,
  updateQuotation,
  deleteQuotation,
};
