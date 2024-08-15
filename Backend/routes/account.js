const router = require("express").Router();
const {
  createAccount,
  getAllAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/account");

router.post("/create-account", createAccount);
router.get("/account", getAllAccount);
router.patch("/account/:id", updateAccount);
router.delete("/account/:id", deleteAccount);

module.exports = router;
