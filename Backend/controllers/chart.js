const { chartModel } = require("../db/db");

const updateChartOne = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Chart ID is required for updating the customer.",
      });
    }
    const updatedChart = await chartModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });
    if (!updatedChart) {
      return res.status(404).json({
        success: false,
        message: "Chart not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Chart updated successfully.",
      data: updatedChart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the chart.",
    });
  }
};

const createChart = async (req, res) => {
  try {
    const value = req.body;
    const data = await chartModel.create({ ...value });
    return res.status(200).json({
      success: true,
      response: data,
      message: "Chart created successfully",
    });
    location.reload();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while Chart the customer.",
    });
  }
};

const getAllChart = async (req, res) => {
  try {
    const data = await chartModel.find();
    res.status(200).json({
      success: true,
      response: data,
      message: "Chart fetch successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting all the chart.",
    });
  }
};

const updateChart = async (req, res) => {
  const chartId = req.params.chartId;
  const subgroupId = req.params.subgroupId;
  const newData = req.body;
  try {
    if (!chartId || !subgroupId) {
      return res.status(400).json({
        success: false,
        message: "Chart ID and Subgroup ID are required.",
      });
    }

    const updatedChart = await chartModel.findOneAndUpdate(
      { _id: chartId, "subgroups._id": subgroupId },
      { $set: { "subgroups.$.title": newData.title } },
      { new: true }
    );

    if (!updatedChart) {
      return res.status(404).json({
        success: false,
        message: "Chart or subgroup not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subgroup updated successfully.",
      data: updatedChart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the subgroup.",
    });
  }
};

const deleteChart = async (req, res) => {
  const chartId = req.params.chartId;
  const subgroupId = req.params.subgroupId;
  try {
    if (!chartId || !subgroupId) {
      return res.status(400).json({
        success: false,
        message: "Chart ID and Subgroup ID are required.",
      });
    }

    const updatedChart = await chartModel.findByIdAndUpdate(chartId, {
      $pull: { subGroup: { _id: subgroupId } },
    });

    if (!updatedChart) {
      return res.status(404).json({
        success: false,
        message: "Chart not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subgroup deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the subgroup.",
    });
  }
};

module.exports = {
  createChart,
  getAllChart,
  updateChart,
  deleteChart,
  updateChartOne,
};
