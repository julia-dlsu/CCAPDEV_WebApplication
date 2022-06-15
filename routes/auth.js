const express = require('express')
const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/login',(req, res) => {
  res.render('login')
});
router.get('/register',(req, res) => {
  res.render('register')
});


router.post('/register',userController.registerUser);

router.post('/login',userController.loginUser);

// logout
router.get('/logout', userController.logoutUser);

module.exports = router;
