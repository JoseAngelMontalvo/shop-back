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
    getProductById: async(req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no product get by id" });
        }
    },
    getProductSearch: async(req, res) => {
        const { keyWord, category, minPrice, maxPrice, sort } = req.query;
        let query = req.query;

        let sortQry = {}
        switch (sort) {
            case "lowPrice":
                sortQry = { "price": 1 }
                break;
            case "highPrice":
                sortQry = { "price": -1 }
                break;
            case "rate":
                sortQry = { "rating": -1 }
                break;
        }
        try {
            if (Object.keys(query).length === 0) {
                const products = await Product.find();
                res.status(200).json(products);
            }
            if (keyWord === "") {
                if (category === 'Todas las categorias') {
                    const products = await Product.find({
                        $and: [
                            { price: { $gte: minPrice } },
                            { price: { $lte: maxPrice } },
                        ]
                    }).sort(sortQry)
                    res.status(200).json(products);
                } else {
                    const products = await Product.find({
                        $and: [
                            { categoryName: { $eq: category } },
                            { price: { $gte: minPrice } },
                            { price: { $lte: maxPrice } },
                        ]
                    }).sort(sortQry)
                    res.status(200).json(products);
                }
            } else {
                if (category === 'Todas las categorias') {
                    const products = await Product.find({
                        $and: [
                            { $text: { $search: keyWord } },
                            { price: { $gte: minPrice } },
                            { price: { $lte: maxPrice } },
                        ]
                    }).sort(sortQry)
                    res.status(200).json(products);
                } else {
                    const products = await Product.find({
                        $and: [
                            { $text: { $search: keyWord } },
                            { categoryName: { $eq: category } },
                            { price: { $gte: minPrice } },
                            { price: { $lte: maxPrice } },
                        ]
                    }).sort(sortQry)
                    res.status(200).json(products);
                }
            }
        } catch (error) {
            res.status(400).json({ message: "Algo ha fallado Sorry" });
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