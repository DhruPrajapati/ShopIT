const express = require("express");
const app = express();

//Import all routes
const products =  require("./routes/product") 
const auth = require("./routes/auth")
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const order = require("./routes/order");

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1",products)
app.use("/api/v1",auth)
app.use("/api/v1",order)
app.use(errorMiddleware);  // middleware to handle errors


module.exports = app