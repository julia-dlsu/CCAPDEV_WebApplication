const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    category: {type: String, required: true},
    owner: {type: String, required: true}
}); 

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;