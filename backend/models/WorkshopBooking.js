const mongoose = require("mongoose");


const workshopBookingSchema = mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'Users'
        },
        workshop:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'workshops',
        },
},
{
    timestamps:true
}
);

module.exports = mongoose.model("workshopbooking",workshopBookingSchema);