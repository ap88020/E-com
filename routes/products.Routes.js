const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        // console.log("Request Body:", req.body);  // Debugging line

        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file ? req.file.buffer : null,       
            name,
            price,
            discount,
            bgColor: bgcolor,
            paneColor: panelcolor, 
            textColor: textcolor,
        });

        // console.log("Saved Product:", product);  // Log the saved product

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");
    } catch (error) {
        console.error("Error saving product:", error.message);
        res.send(error.message);
    }
});


module.exports = router; 