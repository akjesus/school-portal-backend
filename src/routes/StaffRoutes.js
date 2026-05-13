//geberate the staff routes for the school portal backend
const router = require("express").Router();
const staffController = require("../controllers/StaffController");
const verifyToken = require("../controllers/AuthController")

router.post("/", staffController.createStaff);
router.get("/", staffController.getAllStaff);


module.exports = router;