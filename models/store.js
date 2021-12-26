const mongoose = require("mongoose");
const connection = require('../config/database');

const StoreSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    ownerEmail: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
    },
    salt: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = connection.model("Store", StoreSchema);