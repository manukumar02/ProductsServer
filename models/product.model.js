const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Product  
let Product = new Schema({
    productName: {
        type: String
    },
    productDescription: {
        type: String
    },
    productPrice: {
        type: Number
    }
}, {
    collection: 'Product'
});
module.exports = mongoose.model('Product', Product); 