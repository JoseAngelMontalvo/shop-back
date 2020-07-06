const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const shoppinCartSchema = new Schema({
    userid: {
        type: String,
        require: [true, "User id is required"],
    },
    products: {
        type: Array
    }
}, {
    timestamps: true,
    createdAt: true
});

shoppinCartSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" })
module.exports = mongoose.model("shoppinCart", shoppinCartSchema);