const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require('../models/product-model');

router.get('/', (req,res) => {
    let error = req.flash("error");
    res.render("index" , {error});
})

router.get('/shop', isLoggedIn ,async (req, res) => {
    console.log("Shop route accessed");
    try {
        let products = await productModel.find();
        res.render("shop", {products});
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;