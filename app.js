const express =require("express")
const app =express()
const router =require("router")
const Route=router()
console.dir(app)
// app.use(()=>{
//     console.log("welcome to node class")
// })
const bcrypt =require("bcrypt")
const myFunction =async()=>{
  const password ="boluwatife"
  console.log(password)
  const hashedpassword = await bcrypt.hash(password,10)
  console.log (hashedpassword)
  const Match = await bcrypt.compare(password,hashedpassword)
  console.log(Match)


}

myFunction()
app.listen(3000,()=>{
    console.log("listening on port 3000")
})