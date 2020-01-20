const Product = require("../models/Products");
module.exports = {
    newProduct: async(req, res) => {
        const {
            name,
            description,
            price,
            shop,
            categories,
            details,
            faq,
            ratings
        } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            shop,
            categories,
            details,
            faq,
            ratings
        })
        const productDB = await newProduct.save();
        res.status(200).json(productDB);
    }
}