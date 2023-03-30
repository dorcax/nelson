const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
     productName:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
            type:String,
            required:true
    },
    username:{
            type:String,
            required:true
        },
    image:{
            data:Buffer,
            contentType:String
    },
    dateAdded:{
            type:Date,
            default:Date.now()
    }
})
const Product = mongoose.model("Product", productSchema)
module.exports =Product