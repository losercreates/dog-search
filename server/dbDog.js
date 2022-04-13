const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema(
  {
    _id: Number,
    breed: String,
    subbreed: String,
    description: String,
    images: Array,
    name: String,
  },
  { collection: "doglist" }
);

const Dog = mongoose.model("dogdata", dogSchema);

module.exports = Dog;
