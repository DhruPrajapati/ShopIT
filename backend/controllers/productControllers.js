const Product = require("../models/product") 
const ErrorHandler = require("../Utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../Utils/apiFeatures");
const { query } = require("express");

//create new Product => ./api/v1/product/new
exports.newProduct = catchAsyncError( async (req, res, next) => {

    const product  = await Product.create(req.body)
     res.status(201).json({
        success: true,
        product
    })
})

//get all Product => ./api/v1/products
exports.getProducts = catchAsyncError(async (req,res,next) => {

    console.log(req.query)
    const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter();
    const Products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: Products.length,
        Products
    })
 
})

//Get signal product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req,res,next) =>{

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Produc not Found",404))      
    }

    res.status(200).json({
        success: true ,
        product
    })
})

//Update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncError(async (req,res,next) => {

    let  product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Produc not Found",404))        
    } 

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success: true,
        product
    })
})


//Update Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError(async (req,res,next) => {

    const  product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Produc not Found",404))        
    }  

    await Product.deleteOne({_id:req.params.id});

    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
})
