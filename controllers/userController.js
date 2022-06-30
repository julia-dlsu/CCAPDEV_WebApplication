const db = require('../models/db.js');
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
        var profPath = 'public/images/profile';
        
          image.mv(path.resolve(profPath,filename),function(err){
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
  console.log("inside change profile pic");
  const{image} = req.files;
  var filename = req.session.uname + '_profile.png';
  var profPath = 'public/images/profile';

  await image.mv(path.resolve(profPath,image.name),function(err){
    if (err) throw err;

    /**renames the file in the profile folder */
    fs.renameSync(path.resolve(profPath,image.name), path.resolve(profPath,filename));

    //update the image of current user
    db.updateOne(Acct, {_id: req.session.user}, {image: filename}, function() {
      res.redirect('/profile');
    });
  });
};

// PROFILE: check if password is correct
exports.checkPass = function (req, res) {
  const curr = req.body.currpass;
  
  Acct.findById(req.session.user, (error, user) => {
    if (error){
      console.log(error);
    }
    else {
      bcrypt.compare(curr, user.pass, function (err, result) {
        res.send(result);
      });
    }
  });
};

// PROFILE: update password
exports.changePass = function (req, res) {
  bcrypt.hash(req.body.newpass, 10).then(function(hash) {
    // update the password of the current user in the DB
    db.updateOne(Acct, {_id: req.session.user}, {pass: hash}, function() {
      res.redirect('/profile');
    });
  });
};