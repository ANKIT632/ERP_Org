const router = require("express").Router();
const {
  createInvoice,
  getAllInvoice,
  deleteInvoiceById,
  updateInvoiceById,
} = require("../controllers/invoice");

router.post("/create-invoice", createInvoice);
router.get("/all-invoice/:id", getAllInvoice);
router.patch("/:id/update-invoice/:userId", updateInvoiceById);
router.delete("/:userId/delete-invoice/:id", deleteInvoiceById);

module.exports = router;
