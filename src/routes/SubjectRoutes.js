const router = require("express").Router();
const subjectController = require("../controllers/SubjectController");
const verifyToken = require("../controllers/AuthController").verifyToken;
const restrictTo = require("../controllers/AuthController").restrictTo;

// router.use(verifyToken);
router.get("/", subjectController.getAllSubjects);
router.use(restrictTo(["admin", "staff"]));

module.exports = router;
