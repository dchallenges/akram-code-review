const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  nom: {type: String, required: true}, // REVIEW: It is better to use English for the variable names, and use the same language for all the variables. (name instead of nom).
  price: {type: Number, required: true}, // REVIEW: It is better to add precision to the price (price: {type: Number, required: true, precision: 2}) as it appears on the specification. // REVIEW: It is better to add a validation for the price (price: {type: Number, required: true, precision: 2, min: 0}), as the price can't be negative.
  barcode: {type: String, required: true}, // REVIEW: (Depends on the project specifications) => It is better to add a validation for the barcode (barcode: {type: String, required: true, unique: true}), as the barcode must be unique.
  state: {type: String, default: null}, // REVIEW: If the state is known and limited, it is better to use an enum instead of a string (state: {type: String, enum: ['new', 'used', 'broken'], default: 'new'}). // REVIEW: If we want to avoid allocating more space than needed, it is better to use null as the default value. However, if we have not the case where we need to return the state of the product in the API response, it is better to remove the default value.
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;