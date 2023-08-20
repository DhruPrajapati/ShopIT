const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter product name"],
        trim: true,
        maxLength: [100,"Product name connot exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true,"Please enter product price"],
        maxLength: [5,"Product price cannot excced 5 digits"],
        default:0.0
    },
    description: {
        type: String,
        required: [true,"Please enter product descriptions"],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true,"please select category for this product"],
        enum:{
            values: [
                "Electronics",
                "Cameras",
                "Laptop",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                'Clothes/shoes',
                'Beauty/Health',
                'Sports',
                "outdoor",
                "Home"
            ],
            message: "Please select correct category for this product"
        }
    },
    seller:{
        type: String,
        required: [true,"please enter product seller"]
    },
    stock:{
        type: Number,
        required: [true,"Please enter product stock"],
        maxLength: [5,"Product name connot exceed 5 characters"],
        default: 0
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: String,
                required: true
            },
            comment:{
                type: String,
                required: true
            }

        }
    ],
    
    createdAt:{
         type: Date,
         default: Date.now
    }

})

module.exports =  mongoose.model("Product",productSchema);

