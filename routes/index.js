const router = require('express').Router();
const userController = require('../controllers/userController');
const inventoryController = require('../controllers/inventoryController');
const favoritesController = require('../controllers/favoritesController');
const { Router } = require('express');

// -- DASHBOARD -- //
router.get('/', auth, userController.getDashboard);

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
router.get('/inventory', auth, inventoryController.getInventory);
// for adding item to inventory
router.post('/inventory/add-item', auth, inventoryController.addItem);
router.get('/inventory/add-favorite', auth, inventoryController.addFavorite);
router.get('/inventory/add-shopping-list', auth, inventoryController.addShoppingList);
// For deleting item in inventory
router.get('/inventory/delete', auth, inventoryController.deleteItem);
//For searching item in inventory
router.post('/inventory/search',auth,inventoryController.findItems);


// -- ITEMS -- //
router.get('/inventory/:id', auth, inventoryController.getItem); // <---- THIS IS FOR THE ITEM
router.post('/inventory/update',auth,inventoryController.updateItem);

// -- FAVORITES -- //
// for loading favorites page
router.get('/favorites', auth, favoritesController.getFavorites);
// for deleting an item in favorites
router.get('/delete-favorite', auth, favoritesController.deleteFave);
// for searching items in favorites
router.post('/favorites/search', auth, favoritesController.searchFave);

// -- SHOPPING LIST -- //

//if a session does not exist it will redirect to login 
function auth(req,res,next){
  if(req.session.user)
    return next();
  else
    return res.redirect('/login')
}
  
module.exports = router