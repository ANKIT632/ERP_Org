const router = require("express").Router();

const {
  createPurchaseBill,
  getAllPurchaseBill,
  updatePurchaseBill,
  deletePurchaseBill,
} = require("../../controllers/purchase/purchaseBill");

router.post("/purchaseBill", createPurchaseBill);
router.get("/purchaseBill", getAllPurchaseBill);
router.patch("/purchaseBill/:id", updatePurchaseBill);
router.delete("/purchaseBill/:id", deletePurchaseBill);

module.exports = router;
