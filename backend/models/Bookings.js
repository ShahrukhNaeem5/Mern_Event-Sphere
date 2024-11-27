const mongoose = require("mongoose")

const Exhibitorschema = mongoose.Schema({
    Booking_Event_title:{
        type:String,
        required:true
    },
    exhibitorname:{
        type:String,
        required:true
    },
    exhibitoremail:{
        type:String,
        required:true
    },
    companyname:{
        type:String,
        required:true
    },
    Booking_Event_description:{
        type:String,
        required:true


    },
    productname:{
        type:String,
        required:true
    },
    Event_Title:{
        type:String,
      
    },
    Event_Date:{
        type:String,
      
    },
    Event_Location:{
        type:String,
      
    },
    Event_Description:{
        type:String,
      
    },
    Event_Theme:{
        type:String,
      
    },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }

   

})



module.exports = mongoose.model('Event_Bookings',Exhibitorschema)