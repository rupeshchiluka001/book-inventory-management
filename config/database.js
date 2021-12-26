const mongoose = require('mongoose');

require('dotenv').config();

module.exports = mongoose.createConnection(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});