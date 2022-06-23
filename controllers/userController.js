const Acct = require('../database/models/Acct');

const fileUpload = require('express-fileupload');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const bodyParser = require('body-parser');

const path = require('path');
mongoose.connect('mongodb://localhost/Accounts',
{useNewURLParser: true, useUnifiedTopology: true});
const app= express();
app.use(express.static('public'));

app.use(fileUpload()); // for fileuploading
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

exports.registerUser =(req, res)=>{
  var username =req.body.uname
  var Email =req.body.email
  Acct.findOne({$or: [{uname: username},{email:Email}]}, async function(err,result){

    if (err){
      req.flash('error_msg', 'Something happened! Please try again.');     
      res.redirect('/register');
    }
      //no username or email found
    if(!result){
      try {
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);
        const{image}=req.files
        image.mv(path.resolve('public/images/profile',image.name),function(err){
          if (err) throw err;
          
          Acct.create({
            name: req.body.name,
            uname:username,
            email: Email,
            pass: hashedPassword,
            image: '/images/'+ image.name 
          })
            
        })
        res.redirect('/login');
      }catch {
        res.redirect('/register');
      }        
    }
    //username or email exists
    else{
      console.log(result)
      req.flash('error_msg','User with that username or email exists! Please login');
      res.redirect('/register'); 
    }
  })
}

exports.loginUser = (req, res) => {
    var username = req.body.uname;
    var Email =req.body.uname;
    var pw = req.body.pass;
    console.log(username)
    
    Acct.findOne({$or: [{uname: username},{email:Email}]}, function(err, user){
    if (err) {
      req.flash('error_msg', 'Something happened! Please try again.');
      res.redirect('/login');   
    } else {
      // user exist
      if (user) {
        bcrypt.compare(pw, user.pass, (err, result) => {
          // passwords match 
          if (result) {
            //Update session object once matched!
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
         
        })
      } else {
        // No user found
        console.log('no user')
        req.flash('error_msg', 'No registered user with that username. Please make an account');
        res.redirect('/login');
      }
    }})
};

exports.logoutUser = (req, res) => {
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
      });
    }
};