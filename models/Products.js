const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name es requerido"]
    },
    description: {
        type: String,
        require: [true, "Descripción es requerida"]
    },
    price: {
        type: String,
        require: [true, "Precio es requerido"]
    },
    shop: {
        type: String,
        require: [true, "Tienda es requerido"]
    },
    categories: {
        type: Array,
        require: [true, "Categoria es requerida"],
        default: "Otras",
        //enum: ["Otras", "Moda", "Electrodomesticos", "Telefonía móvil", "Deporte y Ocio"]
    },
    details: {
        type: String
    },
    createdby: {
        type: String
    },
    updatedby: {
        type: String
    },
    faq: [{
        id: { type: String },
        resp: { type: String }
    }],
    ratings: [{
        iduser: { type: String },
        rate: { type: String },
        valoration: { type: String }
    }],
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    createdAt: true
});

productSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" })
module.exports = mongoose.model("product", productSchema);