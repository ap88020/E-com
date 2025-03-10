const mongoose = rerquire('mongoose');

const productSchema = mongoose.Schema({
    image : String,
    name : String,
    price : String,
    discount : {
        type : Number,
        default : 0,
    },
    bgColor : String,
    paneColor : String,
    textColor : String,

})

module.exports = mongoose.module("product", productSchema);