const Express = require('express');
const router = Express.Router();
const userController = require("../../controllers/users");


router.post("/:id", userController.updateUser);

module.exports = router;