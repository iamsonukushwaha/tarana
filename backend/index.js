require('./db/mongoose.js')
const express=require('express')
const app=express()
const port=process.env.PORT || 5000
app.use(express.json())
 
const userRoute=require('./routes/user')
app.use(userRoute)

app.listen(port,()=>{
    console.log("Backend server is listening on port 5000")
})