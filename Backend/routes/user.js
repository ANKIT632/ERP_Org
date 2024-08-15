const router = require("express").Router();
const { createUser, updateProfile,getUserById, changePassword } = require("../controllers/user");
const {
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/admin/admin");

const { verifyRole } = require("../middleware/auth");

router.post("/create-users", createUser);
router.patch("/userProfile/:id", updateProfile);
router.get("/userProfile/:id", getUserById);
router.get("/all-users/:id", getAllUsers);
router.patch("/:id/update-users/:userId", verifyRole, updateUserById);
router.delete("/:id/delete-users/:userId", verifyRole, deleteUserById);
router.patch("/changePassword/:id", changePassword);

module.exports = router;
