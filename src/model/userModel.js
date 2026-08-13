const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    upiId: {
        type: String,
        // required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    hasmpin: {
        type: Boolean,
        default: false,
    },
    mpin: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
} , {timestamps: true});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;