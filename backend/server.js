const app = require("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")

//handle the uncaugth exceptions
process.on("uncaughtException",err =>{
    console.log(`ERROR: ${err.message}`);
    console.log("shutting down due to uncaught expection");
    process.exit(1)
})

//setting up config file
dotenv.config({path: '.backend/config/config.env'})

//connecting to database 
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.. `)
} )  

//setting up cloundinary configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECREAT
 })
 

// handle Unhandled promise rejection  
process.on("unhandledRejection",err  => {
    console.log(` ERROR: ${err.message}`);
    console.log("shutting down the server due to Unhandled promise Rejection");
    server.close(() => {
        process.exit(1)
    })
}) 