const router = require("express").Router();
const {
  createPurchaseReturn,
  getAllPurchaseReturn,
  updatePurchaseReturn,
  deletePurchaseReturn,
} = require("../../controllers/purchase/purchaseReturn");

router.post("/purchaseReturn", createPurchaseReturn);
router.get("/purchaseReturn", getAllPurchaseReturn);
router.patch("/purchaseReturn/:id", updatePurchaseReturn);
router.delete("/purchaseReturn/:id", deletePurchaseReturn);

module.exports = router;
