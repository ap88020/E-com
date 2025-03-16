const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        trim : true,
        minLength : 3,
    },
    email : String,
    password : String,
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
    }],
    orders : {
        type : Array,
        default : [],
    },
    contact : String,
    picture : String, 
    picture: String
})

module.exports = mongoose.model("user", userSchema);