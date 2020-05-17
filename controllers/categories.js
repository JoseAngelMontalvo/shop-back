const Category = require("../models/Category");

module.exports = {

    getAllCategories: async(req, res) => {
        try {
            const allcategories = await Category.find();
            res.status(200).json(allcategories);
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no categories get" });
        }
    }

};