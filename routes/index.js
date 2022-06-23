const router = require('express').Router();

//feel free not to put auth yet when testing this page or any page to avoid annoyances
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

//if a session does not exist it will redirect to login 
function auth(req,res,next){
  if(req.session.user)
    return next();
  else
    return res.redirect('/login')
}
  
module.exports= router