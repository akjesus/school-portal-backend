const router = require("express").Router();
const ClassController = require("../controllers/ClassController");

router.post("/", ClassController.createClass);
router.get("/", ClassController.getAllClasses);

module.exports = router;