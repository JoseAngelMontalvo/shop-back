const express = require("express");
const router = express.Router();

const categoryController = require('../../controllers/categories');
//const validate = require('../../middlewares/products');

router.get("/", categoryController.getAllCategories);


module.exports = router;