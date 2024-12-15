const mongoose = require("mongoose")

const SpeakerSchema = mongoose.Schema({
    Speakername :{
        type:String,
        required:true
    },
    Speakeremail:{
        type:String,
        required:true

    },
    position:{
        type:String,
        required:true
    },
    Speakerimage:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("speakers", SpeakerSchema)