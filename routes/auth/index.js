const express = require("express");
const router = express.Router();

router.use("/signup", require("./signup"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));
router.use("/profile", require("./profile"));
router.use("/authgoogle", require("./authgoogle"));


module.exports = router;