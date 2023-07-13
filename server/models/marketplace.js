const mongoose = require("mongoose");

const marketPlaceSchema = new mongoose.Schema({
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
    numOfTokens: {
        type: String
    },
    smartContractAddress: {
        type: String
    },
    projectId: {
        type: String
    },
    tokenId: {
        type: String
    }
});

module.exports = mongoose.model("MarketPlace", marketPlaceSchema);
