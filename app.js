const express = require('express');
const app = express();
const ownerRouter = require('./routes/owners.Routes');
const userRouter = require('./routes/users.Routes');
const productRouter = require('./routes/products.Routes');

const db = require('./config/mongoose-connections');

const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

app.use("/owners", ownerRouter);
app.use("/products", productRouter);
app.use("/users",userRouter);

app.listen('3000', () => {
    console.log("app is running at port 3000");
})
