/* this did not fic the problem
const user = require('../database/models/Acct')
const fileUpload = require('express-fileupload');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/testSess',
{useNewURLParser: true, useUnifiedTopology: true});
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(fileUpload()); // for fileuploading

app.use(express.urlencoded( {extended: true})); 

exports.registerUser =(req, res) => {
  var username = req.body.uname;
 // var pw = req.body.pass;
  
  console.log(username)
  user.findOne({$or: [{uname:username}]}, function(err, result) {
      if (result) {
        console.log('y');
       
        req.flash('error_msg', 'User already exists. Please login.');
  

      } else {
          console.log('no')
       
      }
    });
   // res.redirect('/login');
};
*/
 
