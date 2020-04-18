const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

/* const moment = require('moment-timezone');
const dateSpain = moment.tz(Date.now(), "Europe/Madrid"); */

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name es requerido"],
    },
    lastname: {
        type: String,
        require: [true, "LastName es requerido"],
    },
    email: {
        type: String,
        require: [true, "Email es requerido"],
    },
    password: {
        type: String,
        default: "",
        require: [true, "Password es requerida"]
    },
    googleid: {
        type: String,
        default: ""
    },
    ownauth: {
        type: Boolean,
        default: false
    },
    googleauth: {
        type: Boolean,
        default: false
    },
    state: {
        type: String,
        default: "DEACTIVATED",
        enum: ["ACTIVATED", "DEACTIVATED"]
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: ["USER_ROLE", "ADMIN_ROLE", "SUPERADMIN_ROLE"]
    },
    products: {
        type: Array,
        default: [""]
    },
    shops: {
        type: Array,
        default: [""]
    },
    reviews: {
        type: Array,
        default: [""]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    createdAt: true
});

userSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" })
module.exports = mongoose.model("user", userSchema);