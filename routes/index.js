const router = require('express').Router();
const userController = require('../controllers/userController');
const inventoryController = require('../controllers/inventoryController');
const favoritesController = require('../controllers/favoritesController');
const { Router } = require('express');

// -- PROFILE -- //
// for loading current session profile page
router.get('/profile', auth, userController.getProfile);
// for changing profile picture
router.post('/change-pic', auth, userController.changeProfilePic);
// for checking if password is correct
router.post('/check-pass', auth, userController.checkPass);
// for changing password
router.post('/change-pass', auth, userController.changePass);
// for deleting account
router.post('/delete-account', userController.deleteAccount);

// -- INVENTORY -- //
// for loading inventory page
router.get('/', auth, inventoryController.getInventory);
// for adding item to inventory
router.post('/add-item', auth, inventoryController.addItem);
router.get('/delete', auth, inventoryController.deleteItem);
//router.get('/search',auth,inventoryController.findItems);
router.get('/add-favorite', auth, inventoryController.addFavorite);
router.get('/add-shopping-list', auth, inventoryController.addShoppingList);

// -- ITEMS -- //
// router.get('/inventory/:id', auth, inventoryController.getItem);  <---- THIS IS FOR THE ITEM

// -- FAVORITES -- //
// for loading favorites page
router.get('/favorites', auth, favoritesController.getFavorites);
// for deleting an item in favorites
router.get('/delete-favorite', auth, favoritesController.deleteFave);

// -- SHOPPING LIST -- //

//if a session does not exist it will redirect to login 
function auth(req,res,next){
  if(req.session.user)
    return next();
  else
    return res.redirect('/login')
}
  
module.exports = router