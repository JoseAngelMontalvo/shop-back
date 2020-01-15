const Express = require('express');
const router = Express.Router();

const userController = require("../../controllers/users");

router.get("/:id", userController.getUserById);


module.exports = router;