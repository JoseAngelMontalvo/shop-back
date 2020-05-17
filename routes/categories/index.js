var express = require('express');
var router = express.Router();



router.use("/getallcategories", require("./getAllCategories"));


module.exports = router;