const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Book = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    details1: {
      type: String,
    },
    details2: {
      type: String,
    },
    details3: {
      type: String,
    },
  },
  {
    collection: "books",
  }
);

module.exports = mongoose.model("Book", Book);
