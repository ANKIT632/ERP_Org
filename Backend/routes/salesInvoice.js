const router = require("express").Router();
const {
  createSalesInvoice,
  getAllSalesInvoice,
  updateSalesInvoice,
  deleteSalesInvoice,
  getInoviceById
} = require("../controllers/salesInvoice");

router.post("/sales-invoice", createSalesInvoice);
router.get("/sales-invoice", getAllSalesInvoice);
router.get("/sales-invoice/:id", getInoviceById);
router.patch("/sales-invoice/:id", updateSalesInvoice);
router.delete("/sales-invoice/:id", deleteSalesInvoice);

module.exports = router;
