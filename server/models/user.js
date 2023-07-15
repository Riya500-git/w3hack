const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    publicKey: {
        type: String,
    },
    projectOwned: {
        type: [String],
    },
    tokenOwner: {
        type: [String],
    }
});

module.exports = mongoose.model("User", userSchema);
