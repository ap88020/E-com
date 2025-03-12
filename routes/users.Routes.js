const express = require('express');
const router = express.Router();
const {userRegister,userLogin, userLogout} = require('../controllers/authController');

router.get('/', (req,res) => {
    res.send("users is working");
})

router.post('/register', userRegister);

router.post('/login',userLogin);

router.get('/logout',userLogout);

module.exports = router;