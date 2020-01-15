var express = require('express');
var router = express.Router();

router.use("/getallusers", require("./getAllUsers"));
router.use("/new", require("./newUser"));
router.use("/getuser", require("./getUserById"));
router.use("/updateuser", require("./updateUser"));
router.use("/deleteuser", require("./deleteUser"));

module.exports = router;