const mongoose = require("mongoose")

const UserScheme = mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Useremail:{
        type:String,
        required:true
    },
    Userpassword:{
        type:String,
        required:true
    },
    Userage:{
        type:Number,
        min:[18],
        max:[70],
        required:true
    },
    Userrole:{
        type:String,
        required:true


    },
    Userimage:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model('Users',UserScheme)