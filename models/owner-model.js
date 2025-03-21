const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName : {
        type : String,
        trim : true,
        minLength : 3,
    },
    email : String,
    password : String,
    product : {
        type : Array,
        default : [],
    },
    picture : String,
    gstIn : String,
})

module.exports = mongoose.model("owner", ownerSchema);