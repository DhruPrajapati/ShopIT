const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../Utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncError( async ( req,res,next) => {
    const {
        orderItem,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;


    const order = await Order.create({
        orderItem,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncError( async (req,res,next) =>{
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('No order found with this ID ',404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

// Get logged in user order => /api/v1/order/me
exports.myOrder = catchAsyncError( async (req,res,next) =>{

    const user = req.user._id
    console.log(user)
    const orders = await Order.find({user})


    res.status(200).json({
        success:true,
        orders
    })
})

// Get all order => /api/v1/admin/orders
exports.allOrders = catchAsyncError( async (req,res,next) =>{

    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order =>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

//Update / Process order - Admin  => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncError( async (req,res,next) =>{

    const order = await Order.findById(req.params.id)

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler('You have already delivered this Order',400))
    }

    console.log(order)

    
    order.orderItem.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save({validateBeforeSave: false })

    res.status(200).json({
        success:true,
        order
    })
}) 

async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({validateBeforeSave: false })
}

// Delete order => /api/v1/order/:id
exports.deleteOrder = catchAsyncError( async (req,res,next) =>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No order found with this ID ',404))
    }

    await order.deleteOne({_id:req.params.id})

    res.status(200).json({
        success:true,
        order
    })
})