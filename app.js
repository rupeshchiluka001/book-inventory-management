const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
const connection = require('./config/database');
const cookieParser = require('cookie-parser');
const storeRoutes = require('./routes/store');
require('dotenv').config;
const PORT = 3000;
const STATIC_DIR = 'public';

const app = express();

/*** DEVELOPMENT ONLY***/
// const cors = require('cors');

// app.use(cors({
//     origin: 'http://localhost:4200'
// }));
/*** ***/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, STATIC_DIR)));
app.use(cookieParser());

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    collectionName: 'sessions'
}, dbOptions);

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 7*24*60*60*1000 // 7 days
    }
}));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

//routes after other middleware, and before error handler
app.use('/api', storeRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, STATIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}...`);
});
