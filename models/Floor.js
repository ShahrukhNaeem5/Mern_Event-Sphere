const mongoose = require("mongoose")

const FloorSchema = mongoose.Schema({
    floorname : {
        type:String,
        required:true
    }

  
})

module.exports = mongoose.model("Floor",FloorSchema)