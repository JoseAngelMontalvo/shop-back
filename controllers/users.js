const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
    newUser: async(req, res) => {


        const { name, email, password, role } = req.body;
        try {

            const hashPass = bcrypt.hashSync(password, 10);
            const newUser = new User({ name, email, password: hashPass, role })
            const userDB = await newUser.save();
            res.status(200).json(userDB);

        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }

    },
    updateUser: async(req, res) => {

        const { id } = req.params;
        const { name, email, password } = req.body;
        const userdata = { name, email, password };

        try {

            const options = {
                new: true,
                runValidators: true
            }
            const userDB = await User.findByIdAndUpdate(id, userdata, options);
            res.status(200).json(userDB);
        } catch (error) {
            res.status(400).json({ message: "Internal server error" })
        }
    },
    deleteUser: async(req, res) => {
        const { id } = req.params;
        try {
            const userdelete = await User.findByIdAndDelete(id);
            res.status(200).json(userdelete);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Internal server error" });
        }

    },
    getAllUsers: async(req, res) => {
        const allusers = await User.find();
        try {
            res.status(200).json(allusers);
        } catch (error) {
            res.status(400).json({ message: "Internal server error" });
        }
    },
    getUserById: async(req, res) => {
        try {

            const { id } = req.params;
            const userDB = await User.findById(id);
            res.status(200).json(userDB);
        } catch (error) {
            res.status(400).json({ message: "Internal server error" });

        }
    },
    getUserByRole: async(req, res) => {
        try {
            const { name, role } = req.params;
            const userDB = await User.find({ $and: [{ name: name }, { role: role }] });
            res.status(200).json(userDB);
        } catch (error) {
            res.status(400).json({ message: "Internal server error" });

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