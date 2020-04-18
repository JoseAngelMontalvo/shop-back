const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    category: {
        type: String,
        require: [true, "Category is required"]
    },
    description: {
        type: String,
        require: [true, "Descripción is required"]
    },
    price: {
        type: Number,
        require: [true, "Price is required"]
    },
    shopId: {
        type: String,
        require: [true, "ShopId is required"]
    },
    state: {
        type: String,
        default: "DEACTIVATED",
        enum: ["ACTIVATED", "DEACTIVATED"]
    },
    thumb: {
        type: String,
        require: [true, "thumb is required"]
    },
    urlImages: {
        type: Array,
        require: [true, "urlImages is required"]
    },
    userCreate: {
        type: String,
        require: [true, "userCreate is required"]
    },
    highLight: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Array,
        default: [""]
    },
}, {
    timestamps: true,
    createdAt: true
});

productSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" })
module.exports = mongoose.model("product", productSchema);