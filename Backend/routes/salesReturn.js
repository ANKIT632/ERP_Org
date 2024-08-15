const router = require("express").Router();

const {
  createSalesReturn,
  getAllSalesReturn,
  updateSalesReturn,
  deleteSalesReturn,
  getSalesReturnById
} = require("../controllers/salesReturn");

router.post("/sales-return", createSalesReturn);
router.get("/sales-return", getAllSalesReturn);
router.get("/sales-return/:id", getSalesReturnById);
router.patch("/sales-return/:id", updateSalesReturn);
router.delete("/sales-return/:id", deleteSalesReturn);

module.exports = router;
