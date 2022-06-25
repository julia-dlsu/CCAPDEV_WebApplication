const Acct = require('../models/Acct');

const fileUpload = require('express-fileupload');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
//const bodyParser = require('body-parser');

const fs = require('fs');

const path = require('path');
const app= express();
app.use(express.static('public'));

app.use(fileUpload()); // for fileuploading
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// REGISTER
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
        const{image}=req.files;
        
        var filename= username+'_profile.png';

          image.mv(path.resolve('public/images/profile',filename),function(err){
          if (err) throw err;
          
          Acct.create({
            name: req.body.name,
            uname:username,
            email: Email,
            pass: hashedPassword,
            image:  filename,
          })
            
        })
        req.flash('success_msg', 'Account Created! Please Login');  
        res.redirect('/login');
      }catch {
        req.flash('error_msg','Something happened! Please try again.');
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

// LOGIN
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
            req.session.uname = user.uname;
            req.session.email = user.email;
            req.session.image = user.image;
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

// LOGOUT
exports.logoutUser = (req, res) => {
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
      });
    }
};

// PROFILE: renders profile page for current session
exports.getProfile = async (req, res) => {
  res.render('profile', {
    title: req.session.name + " | Profile",
    style: "profile.css",
    script: ["profile.js", "pictureValidation.js"],
    userName: req.session.name,
    userUName: req.session.uname,
    userEmail: req.session.email,
    userImage: req.session.image
  });
};

// PROFILE: change profile picture for current session
exports.changeProfilePic = async (req, res) => {
  // insert update picture mechanisms here
};