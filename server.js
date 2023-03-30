const express =require("express")
const mongoose=require("mongoose")
const session=require("express-session")
const bcrypt =require("bcrypt")
const flash =require("connect-flash")
const app =express()
const merchantroute =require("./routes/mroute")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost:27017/ECommerceDB",{useNewUrlParser:true})

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
   }))

app.use(flash())
app.use((req,res,next)=>{
    res.locals.message = req.flash("message")
    res.locals.error_msg =req.flash("error_msg")
    next();
})



app.use("/",merchantroute)

app.listen(4040,()=>{
    console.log("server is listening on port 4040")
})