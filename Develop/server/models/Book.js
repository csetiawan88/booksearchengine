const { Schema } = require("mongoose");

// This code defines a subdocument schema called `bookSchema`. It won't become its own model but will be used as the schema for the User's `savedBooks` array in User.js.
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // The `bookId` field represents the saved book id from Google Books.
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = bookSchema;
