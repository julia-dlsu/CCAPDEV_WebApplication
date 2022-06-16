const router = require('express').Router();

//feel free not to put auth yet when testing this page or any page to avoid annoyances
router.get('/',auth,(req, res) => {
    res.render('index'); 
  });

/**  you may add more routers here*/

//if a session does not exits it will redirect to login 
function auth(req,res,next){
  if(req.session.user)
    return next();
  else
    return res.redirect('/login')
}
  
  module.exports= router