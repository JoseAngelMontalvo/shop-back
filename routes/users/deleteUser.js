const Express = require('express');
const router = Express.Router();

const userController = require("../../controllers/users");
const validate = require("../../middlewares/users");


router.post("/:id", validate.deleteUser, userController.deleteUser);


module.exports = router;