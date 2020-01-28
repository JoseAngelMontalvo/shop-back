const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        default: "",
    },
    lastname: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        require: [true, "Email es requerido"]
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
    googleauth: {
        type: Boolean,
        default: false
    },
    active: {
        type: String,
        default: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: ["USER_ROLE", "ADMIN_ROLE"]
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