const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products");


router.post("/:id", productController.addRate);


module.exports = router;