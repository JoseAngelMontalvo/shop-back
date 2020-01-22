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
            createdby
        } = req.body;
        try {
            const newProduct = new Product({
                name,
                description,
                price,
                shop,
                categories,
                details,
                createdby: id
            })
            const productDB = await newProduct.save();
            res.status(200).json(productDB);
        } catch (error) {
            res.status(402).json(error);
        }
    },
    updateProduct: async(req, res) => {
        const { id } = req.params;
        const {
            _id,
            name,
            description,
            price,
            shop,
            categories,
            details,
        } = req.body;
        const options = {
            new: true,
            runValidators: true
        }
        try {
            const updatedProduct = await Product.findByIdAndUpdate(_id, {
                name,
                description,
                price,
                shop,
                categories,
                details,
                updatedby: id
            }, options)

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(402).json(error);
        }
    },
    addRate: async(req, res) => {
        const { id } = req.params;
        const {
            _id,
            rate,
            valoration
        } = req.body;
        const newratings = { iduser: id, rate, valoration };
        try {
            const options = {
                new: true,
                runValidators: true
            }
            const updatedProduct = await Product.findByIdAndUpdate(_id, { $push: { ratings: newratings } }, options)
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(402).json(error);
        }
    },
    // bdxgdxg: async(req, res) => {
    //     const { id } = req.params;
    //     const {
    //         name,
    //         description,
    //         price,
    //         shop,
    //         categories,
    //         details,
    //         faq,
    //         ratings
    //     } = req.body;

    //     const newfaq = { id, resp: faq[0].resp };
    //     const newratings = { id, rate: ratings[0].rate, valoration: ratings[0].valoration };
    //     const newProduct = new Product({
    //         name,
    //         description,
    //         price,
    //         shop,
    //         categories,
    //         details,
    //         faq: newfaq,
    //         ratings: newratings
    //     })
    //     const productDB = await newProduct.save();
    //     res.status(200).json(productDB);
    // },
}