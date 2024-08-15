const { userModel } = require("../../db/db");

//GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const results = await userModel.find({
      role: { $ne: "Admin" },
      _id: { $ne: req.params.id },
    });
    res.status(200).send(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//UPDATE USER BY ID
const updateUserById = async (req, res) => {
  try {
    const role = req.userRole;
    if (role === "Admin" || role === "Manger") {
      const { userId } = req.params;
      const dataToUpdate = req.body;
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { $set: dataToUpdate },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: "user updated successfully", user: updatedUser });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//DELETE USER BY ID
const deleteUserById = async (req, res) => {
  try {
    const role = req.userRole;
    if (role === "Admin" || role === "Manger") {
      const { userId } = req.params;
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  updateUserById,
  deleteUserById,
};
