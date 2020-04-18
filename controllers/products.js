const Product = require("../models/Products");
const mongo = require('mongodb');
module.exports = {
    newProduct: async(req, res) => {
        const { id } = req.params;
        const {
            name,
            category,
            description,
            price,
            shopId,
            state,
            thumb,
            urlImages,
            createDate,
            modifyDate,
            userCreate,
            userMod,
            highlight,
            rating,
            reviews,
        } = req.body;
        try {
            const newProduct = new Product({
                name,
                category,
                description,
                price,
                shopId,
                state,
                thumb,
                urlImages,
                createDate,
                modifyDate,
                userCreate: id,
                userMod,
                highlight,
                rating,
                reviews
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
    getAllProducts: async(req, res) => {
        try {
            const allproducts = await Product.find();
            res.status(200).json(allproducts);
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no products get" });
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
    }

}