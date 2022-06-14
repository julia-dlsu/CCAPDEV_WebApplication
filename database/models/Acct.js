const mongoose = require('mongoose');

const AcctSchema = new mongoose.Schema({
    name: String,
    email: String,
    uname: String,
    pass: String,
    image: String,
}); 

const Acct = mongoose.model('Acct', AcctSchema);

module.exports = Acct;