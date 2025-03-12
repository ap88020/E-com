const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken');


module.exports.userRegister =  async (req,res) => {
    try {        
        let {fullName , email , password} = req.body;

        let user = await userModel.findOne({email : email});
        if(user) return res.status(400).send("you have already account please login!!");

        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(password,salt, async (err, hash) => {
                if(err) return res.send(err.message)
                else{
                    const user = await userModel.create({
                        fullName,
                        email,
                        password : hash,
                    })
                    res.send(user);
                    let token = generateToken(user); 
                    res.cookie("token",token);
                    // res.send(token);
                }
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });

        if (!user) {
            req.flash("error", "User not found, please register");
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", "Password is incorrect");
            return res.redirect('/');
        }

        let token = generateToken(user);
        res.cookie("token", token, { httpOnly: true }); // Secure cookie
        return res.redirect("/shop");

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports.userLogout = async (req,res) => {
    res.cookie("token","");
    res.redirect('/');   
}