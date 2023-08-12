const User = require("../models/user")
const ErrorHandler = require("../Utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

exports.registerUser = catchAsyncError( async (req,res,next) => {

    const {name, email,password} = req.body;
    
    const user =  await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "avatars/kccibpsuiusmwfepb3m",
            url: "https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccibpsuiusmwfepb3m.png"
        }
    })

    const token = user.getJwtToken();

    res.status(201).json({
        succes:true,
        token
    })
})


//login User => /a[i/v1/login
exports.loginUser = catchAsyncError( async(req, res, next) => {
    const {email,password } = req.body;

    //checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler("please enter email & password",400))
    }

    //Finding user in database
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const token = user.getJwtToken();

    res.status(200).json({
        succes: true,
        token
    })
})