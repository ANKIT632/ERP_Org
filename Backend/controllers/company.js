const { companyModel } = require("../db/db");

const createCompany = async (req, res) => {
  try {
    const value = req.body;
    const data = await companyModel.create({ ...value });
    return res.status(200).json({
      success: true,
      response: data,
      message: "Company created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the company.",
    });
  }
};

const updateCompany = async (req, res) => {
  const companyId = req.params.id;
  const newData = req.body;
  try {
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required for updating the company.",
      });
    }

    const updatedCompany = await companyModel.findByIdAndUpdate(
      companyId,
      newData,
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: updatedCompany,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while updating the company",
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await companyModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      response: company,
      message: "Company fetch successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while fetching the company",
    });
  }
};
const getCompany = async (req, res) => {
  try {
    const company = await companyModel.find();
    return res.status(200).json({
      success: true,
      response: company,
      message: "Company fetch successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while fetching the company",
    });
  }
};

const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required for deleting the company.",
      });
    }
    const deletedCompany = await companyModel.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occur while deleting the company",
    });
  }
};

module.exports = {
  createCompany,
  updateCompany,
  getCompany,
  getCompanyById,
  deleteCompany,
};
