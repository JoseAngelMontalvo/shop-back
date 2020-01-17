const Express = require('express');
const router = Express.Router();

const userController = require("../../controllers/users");
const validate = require("../../middlewares/users");

router.get("/:id", validate.getUserById, userController.getUserById);

module.exports = router;