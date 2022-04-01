const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Tarana',{})
const connectToDatabase=()=>{console.log("Connected")}
module.exports=connectToDatabase

// currently connected to the local database where the entries can be seen in ROBO-3T(Gui-MongoDb)