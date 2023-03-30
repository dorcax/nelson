const mongoose = require("mongoose")
const bcrypt =require("bcrypt")
const signupSchema = new  mongoose.Schema({
    fn:{
        type:String,
        required:true
    },
    ln:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    cac:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    date_registered:{
        type:Date,
        default:Date.now()
    }
})
signupSchema.statics.findByCredentials = async (username,password) => {
    const merchant = await Signup.findOne({ username })
    if (!merchant) {
        throw new Error("unable to login")
    }
    const isMatch = await bcrypt.compare(password, merchant.password)
    //  req.session.merchant_id =merchant._id
    // req.session.username=merchant.username
    if (!isMatch) {
        throw new Error("unable to login")
    }
    return merchant
}

signupSchema.pre("save", async function (next) {
    const merchant = this
    if (merchant.isModified("password")) {
        merchant.password =await bcrypt.hash(merchant.password,10)
    }
    next()
})
const Signup =mongoose.model("Signup",signupSchema)
module.exports=Signup