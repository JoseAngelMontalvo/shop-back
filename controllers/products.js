const Product = require("../models/Products");
const mongo = require('mongodb');
module.exports = {
    newProduct: async(req, res) => {
        const { id } = req.params;
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

        const newfaq = { id, resp: faq[0].resp };
        const newratings = { id, rate: ratings[0].rate, valoration: ratings[0].valoration };
        const newProduct = new Product({
            name,
            description,
            price,
            shop,
            categories,
            details,
            faq: newfaq,
            ratings: newratings
        })
        const productDB = await newProduct.save();
        res.status(200).json(productDB);
    },
    updateProduct: async(req, res) => {
        const { id } = req.params;
        /* const {
            name,
            description,
            price,
            shop,
            categories,
            details,
            faq,
            ratings
        } = req.body; */

        try {
            const productDB = await Product.findById(id);
            const {
                name,
                description,
                price,
                shop,
                categories,
                details,
                faq,
                ratings
            } = productDB;

            console.log(name);
        } catch (error) {}

    },
}