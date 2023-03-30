const mongoose=require("mongoose")
const session=require("express-session")
const bcrypt =require("bcrypt")
const flash =require("connect-flash")
const Signup =require("../model/signup.js")
const multer =require("multer")
const fs =require("fs")
const path = require("path")
const Product =require("../model/product.js")
let storage =multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,__dirname+"/uploads/")
},
 filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now())
    }
})
const upload = multer({ storage: storage })

const Msignup =(req,res)=>{
    res.render("merchant/register.ejs")
}
const Mlogin =(req,res)=>{
    res.render("merchant/merchant_login.ejs")
}

const msignup = async (req, res) => {
    const { fn, ln, phone, cac, password, username } = req.body
    const merchant = new Signup({
        fn, ln, phone, cac, password, username, image: {
            data: req.file.filename,
            contentType:"image/png"
        }
    })
    if (!merchant) {
        throw new Error("unable to login")
        res.redirect("/signup")
    }
    merchant.save()
    req.flash("message", "data is successfully captured")
    res.redirect("/login")
}
const mlogin = async (req, res) => {
    try {
        const merchant = await Signup.findByCredentials(req.body.username, req.body.password)
          req.session.merchant_id =merchant._id
          req.session.username=merchant.username
        req.flash("message", "merchant is successfully logged in")
        res.redirect("/index")
    } catch (error) {
        res.status(404).send("UNABLE TO LOGIN")
        
    }
}
const dashboard=((req,res)=>{
    if (!req.session.merchant_id && !req.session.username) {
        req.flash('error_msg', "please login to access App")
        res.redirect('/login')
    } else {
        const result = Signup.findOne({ username: req.session.username })
        if (result) {
            res.render('merchant/index', { merchant_id: req.session.merchant_id, username: req.session.username })
        }
    }
        
    
})
// product controller
const Addproduct = (req, res) => {
    res.render("merchant/add_product.ejs")
}
const Addproduct_post = (req, res) => {
    const { productName, description, category, price } = req.body
    const newproduct = new Product({
        productName, description, category, price, username:req.session.username, image: {
            data: req.file.filename,
            contentType:"image/png"
        }
       
    })
    if (!newproduct) {
        throw new Error("invalid product details")
    }
    newproduct.save()
    req.flash("message", "product successfully captured")
    res.redirect("/viewproduct")
   
}
const Viewpro = (req, res) => {
    if (!req.session.merchant_id && !req.session.username) {
        req.flash("error_msg", "please login to access the app")
        res.redirect("/login")
    } else {
        const product = Product.findOne({ username: req.session.username })
            res.render("merchant/viewproduct",{product,username:req.session.username,merchant_id:req.session.merchant_id})
        }
    }
// const Viewpro =((req,res)=>{
//     if(!req.session.merchant_id && !req.session.username){
//         req.flash("error_msg","please login to access app")
//         res.redirect("/login")
//     }else{
//        const result = Product.find({username:req.session.username})
//             if(result){
//                 req.flash("error_msg","could not select from the data base")
//                 res.redirect("/viewproduct")
//             }else{
//                 res.render("merchant/viewproduct.ejs",{result,username:req.session.username,merchant_id:req.session.merchant_id})
//             }
//         }
    
// })

module.exports = ({
    Mlogin,Msignup,msignup,upload,dashboard,mlogin,Addproduct,Addproduct_post,Viewpro
})