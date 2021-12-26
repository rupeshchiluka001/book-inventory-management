const path = require('path');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connection = require('./database');
const { validatePassword } = require('./passwordUtils');
const Store = require('../models/store');

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = ((username, password, done) => {
    Store.findOne({ownerEmail: username})
        .then((store) => {
            if (!store) return done(null, false);

            const isValid = validatePassword(password, store.hash, store.salt);

            return isValid ? done(null, store) : done(null, false);
        })
        .catch(err => done(err));
});

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((store, done) => {
    done(null, store.id);
})

passport.deserializeUser((storeId, done) => {
    Store.findById(storeId)
        .then(store => {
            done(null, store);
        })
        .catch(err => done(err));
})