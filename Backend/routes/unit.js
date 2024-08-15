const router = require("express").Router();
const {
  createUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
} = require("../controllers/unit");

router.get("/unit", getAllUnits);
router.post("/unit", createUnit);
router.patch("/unit/:id", updateUnit);
router.delete("/unit/:id", deleteUnit);

module.exports = router;
