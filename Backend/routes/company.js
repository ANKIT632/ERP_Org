const router = require("express").Router();
const {createCompany, updateCompany, getCompany, getCompanyById, deleteCompany} = require("../controllers/company");

router.post("/company", createCompany);
router.patch("/company/:id", updateCompany);
router.get("/company/:id", getCompanyById);
router.get('/company', getCompany)
router.delete("/company/:id", deleteCompany);

module.exports = router;