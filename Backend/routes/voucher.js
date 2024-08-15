const router = require("express").Router();
const {
  createVoucher,
  getAllVoucher,
  updateVoucherById,
  deleteVoucherById,
} = require("../controllers/voucher");

router.post("/create-voucher", createVoucher);
router.get("/all-voucher/:id", getAllVoucher);
router.patch("/:id/update-voucher/:userId", updateVoucherById);
router.delete("/:id/delete-voucher/:userId", deleteVoucherById);

module.exports = router;
