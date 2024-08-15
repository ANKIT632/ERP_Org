const router = require("express").Router();
const {
  addTask,
  getAllTasks,
  updateTaskById,
  deletedTaskById,
} = require("../controllers/task/task");

router.get("/all-task", getAllTasks);
router.post("/add-task", addTask);
router.patch("/update-task/:id", updateTaskById);
router.delete("/delete-task/:id", deletedTaskById);

module.exports = router;
