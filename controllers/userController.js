const user = require('../database/models/Acct')
const fileUpload = require('express-fileupload');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const bodyParser = require('body-parser');

const Acct = require('../database/models/Acct');

mongoose.connect('mongodb://localhost/Users',
{useNewURLParser: true, useUnifiedTopology: true});
const app= express();

app.use(fileUpload()); // for fileuploading
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


exports.registerUser =(req, res)=>{
  const username =req.body.uname
  console.log(username)
  console.log(req.body.pass)
  console.log(req.body.email)
/*
  try {
    const hashedPassword =   bcrypt.hash(req.body.pass, 10);
    const{image}=req.files
    image.mv(path.resolve(__dirname, 'public/images',image.name),function(err){
        if (err){
            res.redirect('/register');
        }

        Acct.create({
            name: req.body.name,
            uname:req.body.uname,
            email: req.body.email,
            pass: hashedPassword,
            image: '/images/'+ image.name
   
        })
    })
 
    res.redirect('/login');
} catch {
    res.redirect('/register');
}   
*/
 
};

exports.loginUser =(req, res) => {
  
    var username = req.body.uname;
    var pw = req.body.pass;
   // console.log(username)
  user.findOne({$or: [{uname: username}]}, function(err, user){
    if (err) {
     req.flash('error_msg', 'Something happened! Please try again.');
      
      res.redirect('/login');
      
    } else {
      // Successful query
      if (user) {
        bcrypt.compare(pw, user.pass, (err, result) => {
            // passwords match (result == true)
            if (result) {
              // Update session object once matched!
              req.session.user = user._id;
              req.session.name = user.name;
          
              console.log(req.session);
          
              res.redirect('/');
            
            } else {
              // passwords don't match
             req.flash('error_msg', 'Incorrect password. Please try again.');
             console.log('wrong pass')
              res.redirect('/login');
            }
         
       // res.redirect('/');
      })
      } else {
        // No user found
        console.log('no user')
        req.flash('error_msg', 'No registered user with that username. Please register.');
        res.redirect('/login');
      }
    }
  })};

  exports.logoutUser = (req, res) => {
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
      });
    }
  };