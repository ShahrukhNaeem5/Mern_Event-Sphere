const mongoose = require("mongoose")

const workshopSchema = mongoose.Schema({
    Topic:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Location:{
        type:String,
        required:true
    },
    Speaker: {
        type: String,
        ref: "Speaker",
        required: true
    },
    Workshopimage:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model("workshops", workshopSchema)