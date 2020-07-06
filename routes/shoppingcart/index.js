var express = require('express');
var router = express.Router();

router.use("/getshoppingcart", require("./getShoppingCart"));
router.use("/updateshoppingcart", require("./updateShoppingCart"));


module.exports = router;