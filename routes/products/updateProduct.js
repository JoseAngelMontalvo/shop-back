const express = require("express");
const router = express.Router();
const productController = require("../../controllers/products");

router.post("/:id", productController.updateProduct);

module.exports = router;