const Express = require('express');
const router = Express.Router();

const userController = require("../../controllers/users");
const validate = require("../../middlewares/users");

router.get("/:username/:role", validate.getUserByUsernameAndRole, userController.getUserByUsernameAndRole);


module.exports = router;