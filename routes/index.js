const router = require('express').Router();
const userController = require('../controllers/userController');

//feel free not to put auth yet when testing this page or any page to avoid annoyances
// this '/' is temporary and should be called using controller
router.get('/', auth, (req, res) => {
  res.render("inventory", {
    title: "Inventory",
    style: "inventory.css",
    script: 
      {
        name: "pictureValidation.js"
      },
    activeI: "active",
    item: [
      {
        image: "item-1.png",
        itemName: "Gardenia White Bread - Regular Size",
        itemCategory: "Breads & Pastries",
        itemQty: 3
      },
      {
        image: "item-2.png",
        itemName: "Coca Cola in Can",
        itemCategory: "Beverages",
        itemQty: 12
      }
    ]
  });
});

/**  you may add more routers here*/

// for loading currenst session profile page
router.get('/profile', auth, userController.getProfile);
// for changing profile picture
router.post('/change-pic', auth, userController.changeProfilePic);
// for checking if password is correct
router.post('/check-pass', auth, userController.checkPass);
// for changing password
router.post('/change-pass', auth, userController.changePass);

//if a session does not exist it will redirect to login 
function auth(req,res,next){
  if(req.session.user)
    return next();
  else
    return res.redirect('/login')
}
  
module.exports= router