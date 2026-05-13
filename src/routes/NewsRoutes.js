const router = require("express").Router();
const newsController = require("../controllers/NewsController");

router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);
router.put("/:id/views", newsController.updateViews);
router.put("/:id", newsController.updateNews);

module.exports = router;