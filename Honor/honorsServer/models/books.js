const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var bookSchema = new Schema({
    title:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishingCompany: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: true
    },
    isbn: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

var Books = mongoose.model('Book', bookSchema);

module.exports = Books;