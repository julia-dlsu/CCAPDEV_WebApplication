const router = require('express').Router();

//if a session does not exits it will redirect to login via auth
router.get('/',auth,(req, res) => {
    res.render('index'); 
  });

/**  you may add more routers here*/

function auth(req,res,next){
  if(req.session.user)
     return next();
  else
     return res.redirect('/login')
}
  
  module.exports= router