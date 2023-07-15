const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdDate: {
        type: String,
    },
    owner: {
        type: [String],
    },
    numOfTokens: {
        type: String
    },
    remainingTokens: {
        type: [String],
    },
    listedTokens: {
        type: [Object]
    },
    soldTokens: {
        type: [Object]
    },
    smartContractAddress: {
        type: String
    },
    BaseURI: {
        type: String
    }
});

module.exports = mongoose.model("Project", projectSchema);
