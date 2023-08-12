// create and send token and save in the cookie
module.exports.sendToken = (user,statusCode,res) => {


    //create Jwt cookie
    const token = user.getJwtToken();

    //Options  fo cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        user
    })
}
