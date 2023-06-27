const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema(
  {
    ISBN: {
      type: String,
      required: [true, 'A book must have an ISBN.'],
      trim: true,
      unique: true,
      validate: [validator.isISBN, 'ISBN is not valid.'],
    },
    title: {
      type: String,
      required: [true, 'A book must have a title'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Book must belong to an author.'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Book must belong to a category.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
