const { Hash } = require('crypto');
const { genPassword } = require('../config/passwordUtils');
const Store = require('../models/store');
const Book = require('../models/book');
const PER_PAGE = 10;

exports.registerStore = async (req, res, next) => {
    if (await Store.findOne({ownerEmail: req.body.email}).exec()) {
        res.status(201);
        res.send({"msg": "A store is already registered with same email"});
        return;
    }

    const saltHash = genPassword(req.body.password);

    const newStore = new Store({
        storeName: req.body.storeName,
        ownerName: req.body.ownerName,
        ownerEmail: req.body.email,
        hash: saltHash.hash,
        salt: saltHash.salt,
        address: req.body.address
    });

    newStore.save()
        .then((store) => {
            res.status(200);
            res.send({"msg": "Store successfully registered!!"});
        })
        .catch(err => {
            res.status(401);
            res.send({"msg": `Not able to register store, try again later.`});
            console.error(err);
        })
};

exports.login = (req, res, next) => {
    res.status(200);
    res.cookie('id', req.user._id, { maxAge: 604800000});
    res.send({"msg": "Login Successful"});
};

exports.getStores = async (req, res, next) => {
    const page = req.query.page || 1;
    const value = req.query.value;
    let searchObj = {};

    if (value) {
        searchObj[filter] = {"$regex": value, "$options": "i"};
    }

    try {
        const stores = await Store
                        .find(searchObj)
                        .skip(PER_PAGE*(page-1))
                        .limit(PER_PAGE);

        const count = await Store.find(searchObj).countDocuments();

        res.send({
            stores: stores,
            current: page,
            pages: Math.ceil(count/PER_PAGE),
            value: value,
        });
    } catch (err) {
        console.log("Err: ", err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
}

exports.getStoreDetails = async (req, res, next) => {
    let store = req.user;
    if (store == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    try {
        store = await Store.findById(store._id);
        res.status(200);
        res.send(store);
    } catch (err) {
        console.log("Err: ", err);
        res.status(401);
        res.send({"msg": "Unable to find book"});
    }
}

exports.addBook = async (req, res, next) => {
    const store = req.user;
    if (store == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }
    
    console.log(req.body);
    
    const newBook = new Book({
        bookName: req.body.bookName,
        bookApi: req.body.bookApi,
        copies: req.body.copies,
        storeId: store._id
    });

    newBook.save()
        .then((book) => {
            res.status(200);
            res.send(book);
        })
        .catch((err) => {
            console.log("Err: "+err);
            res.status(500);
            res.send({"msg": `Error during saving book. Try again later!`});
        })
};

exports.getBooks = async (req, res, next) => {
    if (!req.query.storeId) {
        req.query.storeId = req.user._id;
    }

    try {
        const books = await Book
                        .find({'storeId': req.query.storeId});

        res.send({
            books: books
        });
    } catch (err) {
        console.log("Err: ", err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
};

exports.editBook = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    const store = req.user;
    let book = req.body, bookBefore;
    let bookEdited = false;

    try {
        bookBefore = await Book.findById(book._id);

        await Book.findByIdAndUpdate(book._id, {
            bookName: book.bookName,
            bookApi: book.bookApi,
            copies: book.copies,
            storeId: bookBefore.storeId
        });

        bookEdited = true;

        res.status(200);
        res.send({"msg": "Book edited successfully!"});
    }
    catch (err) {
        console.log("Err: ", err);
        if (bookEdited) {
            await Course.findByIdAndUpdate(book._id, {
                bookName: bookBefore.bookName,
                bookApi: bookBefore.bookApi,
                copies: bookBefore.copies,
                storeId: bookBefore.storeId
            });
        }
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
}

exports.deleteBook = async(req, res) => {
    const store = req.user;
    if (store == undefined) {
        res.status(401);
        res.send({"msg": "Login first!!"});
        return;
    }

    try {
        const book_id = req.body.bookId;
        const book = Book.findOneAndRemove({_id: book_id}, (err, data) => {
            if (!err) {
                res.status(200);
                res.send({"msg": "Book deleted successfully!!"});
            }
            else {
                res.status(500);
                res.send({"msg": "Unable to delete book!!"});
            }
        });
    } catch (err) {
        console.log("Err: ",err);
        res.status(500);
        res.send({"msg": "Internal Error! Try again later!"});
    }
};

exports.logout = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.status(200);
        res.send({"msg": "User logged Out!!"});
    }
    else {
        res.status(401);
        res.send({"msg": "User not logged In!!"});
    }
};