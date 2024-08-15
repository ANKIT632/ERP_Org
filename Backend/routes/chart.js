const router = require("express").Router();
const {
  createChart,
  updateChart,
  getAllChart,
  deleteChart,
  updateChartOne,
} = require("../controllers/chart");

router.get("/chart", getAllChart);
router.post("/chart", createChart);
router.patch("/chart/:id", updateChartOne);
router.patch("/chart/:chartId/subgroup/:subgroupId", updateChart);
router.delete("/chart/:chartId/subgroup/:subgroupId", deleteChart);

module.exports = router;
