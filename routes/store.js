const router = require('express').Router();
const passport = require('passport');
const storeMethods = require('../controllers/store');

router.post('/register', storeMethods.registerStore);

router.post('/login', passport.authenticate('local'), storeMethods.login);

router.get('/logout', storeMethods.logout);

router.get('/stores', storeMethods.getStores);

router.post('/store-details', storeMethods.getStoreDetails);

router.post('/add-book', storeMethods.addBook);

router.post('/edit-book', storeMethods.editBook);

router.get('/get-books', storeMethods.getBooks);

router.post('/delete-book', storeMethods.deleteBook);

module.exports = router;