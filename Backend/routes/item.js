const router = require("express").Router();
const { createItem, getAllItem, updateItem ,deleteItem} = require("../controllers/item");

router.post("/item", createItem);
router.get("/item", getAllItem)
router.patch("/item/:id", updateItem)
router.delete("/item/:id", deleteItem)

module.exports = router;
