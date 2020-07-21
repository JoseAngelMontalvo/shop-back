const Express = require('express');
const router = Express.Router();

const shoppingCartController = require("../../controllers/shoppingCart");
//const validate = require("../../middlewares/users");

router.post("/", shoppingCartController.storeShoppingCart);

module.exports = router;