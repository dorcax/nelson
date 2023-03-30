const express =require("express")
const router =express.Router()
const{Mlogin,Msignup,msignup,upload,dashboard,mlogin,Addproduct,Addproduct_post,Viewpro} =require("../controller/mcontroller")
router.get("/signup",Msignup)
router.get("/login", Mlogin)
router.post("/login",mlogin)
router.post("/signup", upload.single('image'), msignup)
router.get("/index", dashboard)
router.get("/addproduct", Addproduct)
router.post("/addproduct", upload.single("image"), Addproduct_post)
router.get("/viewproduct",Viewpro)



module.exports =router