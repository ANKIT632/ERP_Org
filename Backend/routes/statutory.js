const router = require("express").Router();
const { createTds, updateTds, getTds } = require("../controllers/statutory");

router.post("/statutory", createTds);
router.patch("/statutory/:id", updateTds);
router.get("/statutory/:id", getTds);

module.exports = router;
