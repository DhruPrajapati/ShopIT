require("dotenv").config({ path: "./backend/config/config.env" });
const express = require("express");
const app = express();
const cors = require("cors");

//Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const payment = require("./routes/payment");
const order = require("./routes/order");

const corsOptions = {
  origin: "http://localhost:3000",
};


app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1",payment)
app.use(errorMiddleware); // middleware to handle errors

module.exports = app;
