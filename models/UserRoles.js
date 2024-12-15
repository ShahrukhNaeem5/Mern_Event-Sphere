const mongoose = require("mongoose")

const RolesScheme = mongoose.Schema({
    Roles:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }


})

    module.exports = mongoose.model('Roles',RolesScheme)