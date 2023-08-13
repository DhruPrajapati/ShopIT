const User = require("../models/user")
const ErrorHandler = require("../Utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
const { sendToken } = require("../Utils/jwtToken")
const { sendEmail } = require("../Utils/sendEmail")
const crypto = require("crypto")

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

   sendToken(user,200,res);
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

    sendToken(user,200,res);

})

//Forgot Password  => /api/v1/password/forget
exports.forgotPassword = catchAsyncError(async (req,res,next) => {
    
    const user = await User.findOne({email : req.body.email});

    if(!user) {
        return next(new ErrorHandler('User not found with this email',404));
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false})

    // creat reset password url
    const resetUrl = `${req.protocal}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is as follow:\n\n${resetUrl}\n\nIf you have requested this email, then ingore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: "ShopIT Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch (error){
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message,500))

    }
})


//Reset Password  => /api/v1/password/reset/
exports.resetPassword = catchAsyncError(async (req,res,next) => {

    //hash Url Token
    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt : Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("Password reset token is invalid or has been expired",400))
    }

    if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    } 

    // Setup new Password
    user.password = req.body.password;

    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined

    await user.save();

    sendToken(user,200,res)


})

// Logout User => /api/v1/logout
exports.logout = catchAsyncError( async (req,res,next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})
