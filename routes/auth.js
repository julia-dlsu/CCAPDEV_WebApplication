const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/login',NotAuth,(req, res) => {
    res.render('login', {
        title: "Login",
        style: "logreg.css",
        script: ["pictureValidation.js"]
    });
});

router.get('/register',NotAuth,(req, res) => {
    res.render('register', {
        title: "Register",
        style: "logreg.css",
        script: ["pictureValidation.js"]
    });  
});

//if a session exist it will redirect to index
function NotAuth(req,res,next){
  if(req.session.user)
     res.redirect('/')
  else
     next()
}
  
router.post('/register',userController.registerUser);

router.post('/login',userController.loginUser);

router.get('/logout', userController.logoutUser);


module.exports = router;