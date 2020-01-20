const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
    newUser: async(req, res) => {

        const { username, email, password, role } = req.body;
        try {

            const hashPass = bcrypt.hashSync(password, 10);
            const newUser = new User({ username, email, password: hashPass, role })
            const userDB = await newUser.save();
            res.status(200).json(userDB);

        } catch (error) {
            res.status(400).json({ message: "Internal server error, no user create" });
        }

    },
    updateUser: async(req, res) => {

        const { id } = req.params;
        const { username, email, password, role } = req.body;
        const hashPass = bcrypt.hashSync(password, 10);
        const userdata = { username, email, password: hashPass, role };

        try {;
            const options = {
                new: true,
                runValidators: true
            }
            const userDB = await User.findByIdAndUpdate(id, userdata, options);
            res.status(200).json(userDB);
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no user update" });
        }
    },
    deleteUser: async(req, res) => {
        const { id } = req.params;
        try {
            const userdelete = await User.findByIdAndDelete(id);
            res.status(200).json(userdelete);
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no user delete" });
        }

    },
    getAllUsers: async(req, res) => {
        try {
            const allusers = await User.find();
            res.status(200).json(allusers);
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no users get" });
        }
    },
    getUserById: async(req, res) => {
        try {

            const { id } = req.params;
            const userDB = await User.findById(id);
            res.status(200).json(userDB);
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no user get" });
        }
    },
    getUserByUsernameAndRole: async(req, res) => {
        try {
            const { username, role } = req.params;
            const userDB = await User.find({ $and: [{ username: username }, { role: role }] });
            res.status(200).json(userDB);
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no user get by username and role" });
        }
    }

    /* router.get("/get/:name/:lastname", async (req, res) => {
    const { name, lastname } = req.params;
    try {
      const userDB = await User.find({ $and: [{ name }, { _id: lastname }], { password: 0 })
        .skip(4)
        .limit(10);
  
      const usersCount = await User.count({})
        .skip(4)
        .limit(10);
  
      res.json({ userDB, usersCount });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }); */



};