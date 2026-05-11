//geberate the staff routes for the school portal backend
const router = require("express").Router();
const staffController = require("../controllers/StaffController");

router.post("/", staffController.createStaff);
router.get("/", staffController.getAllStaff);
// router.get("/:id", staffController.getStaffById);


module.exports = router;