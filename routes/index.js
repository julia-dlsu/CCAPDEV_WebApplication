const router = require('express').Router();
const userController = require('../controllers/userController');
const inventoryController = require('../controllers/inventoryController');

//feel free not to put auth yet when testing this page or any page to avoid annoyances
/**  you may add more routers here*/


// -- PROFILE -- //
// for loading current session profile page
router.get('/profile', auth, userController.getProfile);
// for changing profile picture
router.post('/change-pic', auth, userController.changeProfilePic);
// for checking if password is correct
router.post('/check-pass', auth, userController.checkPass);
// for changing password
router.post('/change-pass', auth, userController.changePass);

// -- INVENTORY -- //
// for loading inventory page
router.get('/', auth, inventoryController.getInventory);
// for adding item to inventory
router.post('/add-item', auth, inventoryController.addItem);

//if a session does not exist it will redirect to login 
function auth(req,res,next){
  if(req.session.user)
    return next();
  else
    return res.redirect('/login')
}
  
module.exports = router