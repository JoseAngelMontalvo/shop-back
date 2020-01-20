var express = require('express');
var router = express.Router();

router.use("/getallproducts", require("./getAllProducts"));
router.use("/newproduct", require("./newProduct"));
router.use("/getproductbyid", require("./getUserByProduct"));
router.use("/updateproduct", require("./updateProduct"));
router.use("/deleteproduct", require("./deleteProduct"));
router.use("/getproductsbycategory", require("./getProductByCategory"));

module.exports = router;