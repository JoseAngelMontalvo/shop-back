const Express = require('express');
const router = Express.Router();

const userController = require("../../controllers/users");
const validate = require("../../middlewares/users");

router.get("/", validate.getAllUsers, userController.getAllUsers);

module.exports = router;