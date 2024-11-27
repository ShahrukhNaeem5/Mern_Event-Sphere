const mongoose = require("mongoose")

const HallsSchema = mongoose.Schema({
    HallName: {
        type: String,
        required: true
    },

    boothId: {
        type: String,
        ref: 'Booth',
        required: true

    },
    floorId: {
        type: String,
        ref: 'Floor',
        required: true

    },
    status: {
        type: String,
        enum: ['occupied', 'unoccupied'],
        default: 'unoccupied'
    }
})

module.exports = mongoose.model("Halls", HallsSchema)