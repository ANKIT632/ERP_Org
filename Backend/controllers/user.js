const { userModel } = require("../db/db");
const { successResponse } = require("../helper/responseTemplate");
const { generateJwtResponse } = require("../helper/jwtToken");
const bcrypt = require("bcrypt");

//REGISTER USER
const createUser = async (req, res) => {
  try {
    let val = req.body;
    let salt = await bcrypt.genSalt();
    let passwordHash = await bcrypt.hash(val.password, salt);
    val = {
      ...val,
      password: passwordHash,
    };

    const userExists = await userModel.find({ email: val.email });

    if (userExists[0] === "undefined") {
      return res.json({
        userAlreadyExists: true,
      });
    }
    const user = await userModel.create({ ...val });
    res
      .status(200)
      .json(
        await successResponse(
          "Registration successfully",
          await generateJwtResponse(user)
        )
      );
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json({ errors: "Registration unsuccessfully" });
    }
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }
    const updateData = await userModel.findByIdAndUpdate(userId, newData, {
      new: true,
    });
    console.log(updateData, "updateData");
    if (!updateData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      response: updateData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the user profile",
    });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }
    const userData = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      message: "User profile data fetch successfully",
      response: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the user profile",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The old password is incorrect" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await userModel.findByIdAndUpdate(
      userId,
      { password: encryptedPassword },
      { new: true }
    );

    if (!updatedUserDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Failed to update password" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  updateProfile,
  getUserById,
  changePassword,
};
