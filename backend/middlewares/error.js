const ErrorHandler = require("../Utils/errorHandler")

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({ 
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack    
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}

        error.message = err.message;

        //Wrong Moogoose Object ID Error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message,400)
        }

        // Handling mongoose Validation Error 
        if(err.name === "ValidationError"){
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message,400)
        }

        res.status(err.statusCode).json({
            success: false,
            error: error.message || "internal Server Error"  
        })
    }
}   