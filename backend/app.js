const express = require("express");
const app = express();

//Import all routes
const products =  require("./routes/product") 
const errorMiddleware = require("./middlewares/error")

app.use(express.json())
app.use("/api/v1",products)
app.use(errorMiddleware);  // middleware to handle errors

module.exports = app