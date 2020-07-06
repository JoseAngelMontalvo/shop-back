var express = require('express');
var router = express.Router();

router.use("/newproduct", require("./newProduct"));
router.use("/updateproduct", require("./updateProduct"));
router.use("/addrate", require("./addRate"));

router.use("/getallproducts", require("./getAllProducts"));
router.use("/getproductbyid", require("./getProductById"));
router.use("/deleteproduct", require("./deleteProduct"));
router.use("/getproductsearch", require("./getProductSearch"));

module.exports = router;