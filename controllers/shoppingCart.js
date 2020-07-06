const ShoppinCart = require("../models/ShoopingCart");
const bcrypt = require("bcryptjs");

module.exports = {
    storeShoppingCart: async(req, res) => {
        const { userid, products } = req.body;
        try {
            console.log("toto")
            const updatedShoppingCart = await ShoppinCart.findOneAndUpdate({ userid: userid }, { products: products }, {
                upsert: true,
                new: true
            })
            res.status(200).json(updatedShoppingCart);
        } catch (error) {
            res.status(402).json(error);
        }
    },
    getShoppingCart: async(req, res) => {
        try {
            console.log("Hola")
            const { id } = req.params;
            const result = await ShoppinCart.find({ userid: id });
            const shoppingCartDB = result[0]
            res.status(200).json(shoppingCartDB);

        } catch (error) {
            res.status(400).json({ message: "Internal server error, no ShoppinCart get" });
        }
    }

};