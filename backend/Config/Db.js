const mongoose= require("mongoose")

async function ConnectDB(){
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Atlas is connected")
    })
}

module.exports = {ConnectDB}