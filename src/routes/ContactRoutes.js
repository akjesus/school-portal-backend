const router = require("express").Router();
const contactController = require("../controllers/ContactController");

router.get("/", contactController.getAllContacts);
router.post("/", contactController.createContact);

module.exports = router;