const router = require("express").Router();
const authController = require("../controllers/AuthController");

router.post("/staff/login", authController.loginStaff);
router.post("/student/login", authController.loginStudent);


module.exports = router;
