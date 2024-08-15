const { inventoryModel } = require("../db/db");

const createInventory = async (req, res) => {
  try {
    let inventoryExist = await inventoryModel.find({ code: req.body.code });
    let val = req.body;

    if (inventoryExist[0] === "undefined") {
      return res.json({
        inventoryAlreadyExist: true,
      });
    }
    const inventory = await inventoryModel.create({ ...val });

    res.status(200).json({
      success: true,
      response: inventory,
      message: "inventory succss",
    });
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(422).json({ errors: "inventory unsuccessfully" });
    }
    res.status(500).json({ error: err.message });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const results = await inventoryModel.find({
      _id: { $ne: req.params.id },
    });
    res.status(200).send(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

const updateInventoryById = async (req, res) => {
  try {
    const { userId } = req.params;
    const dataToUpdate = req.body;
    const updatedInventory = await inventoryModel.findByIdAndUpdate(
      userId,
      { $set: dataToUpdate },
      { new: true }
    );
    if (!updatedInventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json({
      success: true,
      message: "inventory updated successfully",
      user: updatedInventory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteInventoryById = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleteInventory = await inventoryModel.findByIdAndDelete(userId);
    if (!deleteInventory) {
      return res.status(404).json({ message: "inventory not found" });
    }
    res.status(200).json({
      message: "inventory deleted successfully",
      user: deleteInventory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createInventory,
  getAllInventory,
  updateInventoryById,
  deleteInventoryById,
};
