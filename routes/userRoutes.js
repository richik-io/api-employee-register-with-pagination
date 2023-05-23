const express = require("express");
const router = express.Router();
const controller = require("../controller/indexController");
router.get("/", controller.user.getAll);
router.get("/findOne", controller.user.getUsername);
router.post("/", controller.user.createNew);
router.put("/", controller.user.editAt);
router.delete("/", controller.user.deleteUser);

module.exports = router;