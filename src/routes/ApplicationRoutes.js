const router = require("express").Router();
const applicationController = require("../controllers/ApplicationsController");
const verifyToken = require("../controllers/AuthController").verifyToken;
const restrictTo = require("../controllers/AuthController").restrictTo;

router.get("/", applicationController.getAllApplications);
router.post("/", applicationController.createApplication);
router.put(
  "/:id",
//   verifyToken,
//   restrictTo("admin"),
  applicationController.updateApplicationStatus,
);

module.exports = router;
