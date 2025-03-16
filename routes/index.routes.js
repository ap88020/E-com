const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const upload = require('../utils/multer');

router.get('/', (req,res) => {
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

router.get('/account',isLoggedIn,async(req,res) => {
    let user = await userModel.findOne({email:req.user.email});
    res.render('myaccount' , {user});
})

router.post('/upload/:id', upload.single('profileImage'), async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id);
        if (!user) {
            req.flash("error", "User not found");
            return res.redirect('/account');
        }

        if (!req.file) {
            req.flash("error", "No file uploaded");
            return res.redirect('/account');
        }

        // ✅ Store the file path in the `picture` field (not `image`)
        user.picture = "/images/uploads/" + req.file.filename;
        await user.save();

        console.log(user);

        req.flash("success", "Profile image updated successfully");
        res.redirect('/account');
    } catch (error) {
        console.error("Error updating profile image:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;