const router = require("express").Router();
const { createQuotation, getAllQuotation, updateQuotation, deleteQuotation } = require("../controllers/quotation");

router.post("/create-quotation", createQuotation);
router.get("/getAllQuotation", getAllQuotation);
router.patch("/quotation/:id", updateQuotation);
router.delete("/quotation/:id", deleteQuotation);

module.exports = router;
