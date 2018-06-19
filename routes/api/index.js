const router = require("express").Router();
const newsRoutes = require("./news");

router.use("/articles", newsRoutes);

module.exports = router;