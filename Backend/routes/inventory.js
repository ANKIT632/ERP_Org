const router = require("express").Router();
const {
  createInventory,
  getAllInventory,
  updateInventoryById,
  deleteInventoryById,
} = require("../controllers/inventory");

router.post("/create-inventory", createInventory);
router.get("/all-inventory/:id", getAllInventory);
router.patch("/:id/update-inventory/:userId", updateInventoryById);
router.delete("/:id/delete-inventory/:userId", deleteInventoryById);

module.exports = router;
