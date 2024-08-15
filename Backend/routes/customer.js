const router = require("express").Router();
const {
  createCustomer,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById
} = require("../controllers/customer");

router.post("/customer", createCustomer);
router.get("/customer", getAllCustomer);
router.patch("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);
router.get('/customer/:customerId' , getCustomerById);
module.exports = router;
