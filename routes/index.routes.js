const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', isLoggedIn, (req,res) => {
    let error = req.flash("error");
    res.render("index" , {error,loggedIn : false});
})

router.get('/cart',isLoggedIn, async (req,res) => {
    const user = await userModel.findOne({email : req.user.email}).populate("cart");
    res.render('cart' , {user});
})

router.get('/addToCard/:id', isLoggedIn, async (req,res) => {
    let user = await userModel.findOne({email : req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    console.log(req.user);
    req.flash("success","Added to cart");
    res.redirect("/shop",)
})

router.get('/shop', isLoggedIn ,async (req, res) => {
    console.log("Shop route accessed");
    try {
        let products = await productModel.find();
        let success = req.flash("success");
        res.render("shop", { products, success });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;