const Express = require('express');
const router = Express.Router();

const shoppingCartController = require("../../controllers/shoppingCart");
//const validate = require("../../middlewares/users");

router.get("/:id", shoppingCartController.getShoppingCart);

module.exports = router;