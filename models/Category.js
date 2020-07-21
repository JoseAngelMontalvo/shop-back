const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    text: {
        type: String,
        require: [true, "Text es requerido"],
    },
    link: {
        type: String,
        require: [true, "Link es requerido"],
    },
    type: {
        type: String,
        default: "comercio-chino-icons",
        enum: ["material-icons", "comercio-chino-icons"],
    },
    content: {
        type: String,
        require: [true, "Password es requerida"]
    }
}, {
    timestamps: true,
    createdAt: true
});

categorySchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" })
module.exports = mongoose.model("category", categorySchema);