const mongoose = require('mongoose');

const AcctSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    uname: {type: String, required: true},
    pass: {type: String, required: true},
    image:{type: String, required: true},
}); 

const Acct = mongoose.model('Acct', AcctSchema);

module.exports = Acct;