const express = require("express");
const router = express.Router();


const productController = require("../../controllers/products");
//const validate = require("../../middlewares/products");

router.post("/", productController.newProduct);

module.exports = router;