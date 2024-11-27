const mongoose = require("mongoose")

const BoothScheme = mongoose.Schema({
    boothName:{
        type:Number,
        required:true
    },
    floorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floor',
        required: true
      }

})
module.exports = mongoose.model("Booths", BoothScheme)