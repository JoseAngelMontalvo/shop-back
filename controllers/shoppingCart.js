const ShoppingCart = require("../models/ShoopingCart");
const bcrypt = require("bcryptjs");

module.exports = {
    storeShoppingCart: async(req, res) => {
        const { userid, products } = req.body;
        try {
            const updatedShoppingCart = await ShoppingCart.findOneAndUpdate({ userid: userid }, { products: products }, {
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
            const { id } = req.params;
            const result = await ShoppingCart.find({ userid: id });
            const shoppingCartDB = result[0]
            res.status(200).json(shoppingCartDB);

        } catch (error) {
            res.status(400).json({ message: "Internal server error, no ShoppingCart get" });
        }
    }

};