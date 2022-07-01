const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true}, //quantity user currently has
    category: {type: String, required: true},
    neededQty: {type: Number, required: true, default: 1}, //qty user needs to buy
    owner: {type: String, required: true}
}); 

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);


module.exports = ShoppingList;