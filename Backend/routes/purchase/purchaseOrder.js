const router = require("express").Router();
const {
  createPurchase,
  getAllPurchase,
  updatePurchase,
  deletePurchase,
  getPurchaseById,
} = require("../../controllers/purchase/purchaseOrder");

router.post("/purchaseOrder", createPurchase);
router.get("/purchaseOrder", getAllPurchase);
router.get("/purchaseOrder/:id", getPurchaseById);
router.patch("/purchaseOrder/:id", updatePurchase);
router.delete("/purchaseOrder/:id", deletePurchase);

module.exports = router;
