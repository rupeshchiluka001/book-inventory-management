const mongoose = require("mongoose");
const connection = require('../config/database');

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    bookApi: {
        type: String,
        required: true,
    },
    copies: {
        type: Number,
        default: 1,
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }
});

module.exports = connection.model("Book", BookSchema);