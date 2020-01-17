var express = require('express');
var router = express.Router();

router.use("/getallusers", require("./getAllUsers"));
router.use("/new", require("./newUser"));
router.use("/getuserbyid", require("./getUserById"));
router.use("/updateuser", require("./updateUser"));
router.use("/deleteuser", require("./deleteUser"));
router.use("/getuserbyusernameandrole", require("./getUserByUsernameAndRole"));

module.exports = router;