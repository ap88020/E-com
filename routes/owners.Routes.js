const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

router.get('/', (req,res) => {
    res.send("hey there");
})

if(process.env.NODE_ENV === "development"){
    router.post('/create', async (req,res) => {
        // res.send("this is working to")
        let owner = await ownerModel.find();
        if(owner.length > 0){
            return res.status(503).send("you don't have a permission to create owner");
        }
        let {fullName,email,password} = req.body;
        let createdUser = await ownerModel.create({
            fullName,
            email,
            password,
        })
        res.status(201).send(createdUser);
    })
}

router.get("/admin", (req,res) => {
    let success = req.flash("success");
    res.render("createproducts" , {success});   
})
module.exports = router;
