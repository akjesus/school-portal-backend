const router = require("express").Router();
const studentController = require("../controllers/StudentsController");
const verifyToken = require("../controllers/AuthController").verifyToken;
const restrictTo = require("../controllers/AuthController").restrictTo;

// router.use(verifyToken);
router.get("/", studentController.getAllStudents);
router.use(restrictTo(["admin", "staff"]));
router.post("/", studentController.createStudent);

module.exports = router;
