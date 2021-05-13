const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const Books = require('../models/books');
const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route('/')
.get((req,res,next) => {
    Books.find({})
    .then((books) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(books);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Books.create(req.body)
    .then((book) => {
        console.log('Book Created ', book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /books');
})
.delete((req, res, next) => {
    Books.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

bookRouter.route('/:isbn')
.get((req,res,next) => {
    Books.findById(req.params.isbn)
    .then((book) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /books/'+ req.params.isbn);
})
.put((req, res, next) => {
    Books.findByIdAndUpdate(req.params.isbn, {
        $set: req.body
    }, { new: true })
    .then((book) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Books.findByIdAndRemove(req.params.isbn)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = bookRouter;