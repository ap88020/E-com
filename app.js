const express = require('express');
const app = express();
const ownerRouter = require('./routes/owners.Routes');
const userRouter = require('./routes/users.Routes');
const productRouter = require('./routes/products.Routes');
const index = require('./routes/index.routes');
const expresSession = require('express-session');
const flash = require('connect-flash'); 

const db = require('./config/mongoose-connections');

const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expresSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
})
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

// console.log(process.env.JWT_KEY);

app.use('/',index);

app.use("/owners", ownerRouter);
app.use("/products", productRouter);
app.use("/users",userRouter);

app.listen('3000', () => {
    console.log("app is running at port 3000");
})
