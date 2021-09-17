const router = require("express").Router();

router.use("/blog", require("./blog.route"));

module.exports = router