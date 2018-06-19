const router = require("express").Router();
const newsController = require("../../controllers/newsController");

// Matche w/ articles
router.route("/")
  .get(newsController.findAll)
  .post(newsController.create);

// Matches with articles:id
router
  .route("/:id")
  .get(newsController.findById)
  .put(newsController.update)
  .delete(newsController.remove);

module.exports = router;