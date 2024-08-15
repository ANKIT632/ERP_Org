const { userModel } = require("../db/db");

const verifyRole = async (req, res, next) => {
  const id = req.params.id;
  const searchedUser = await userModel.find({ _id: id });
  const role = searchedUser[0].role;
  req.userRole = role;
  next();
};

module.exports = {
  verifyRole,
};
