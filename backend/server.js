const express = require("express")
const { ConnectDB } = require("./Config/Db")
const dotenv = require("dotenv").config()
const cors = require("cors")
const Eventroutes = require('./routes/Eventroutes')
const Userroutes = require('./routes/Userroutes')
const BookingsRoute = require('./routes/Bookingsroute')
const path = require("path")
const Floorroutes = require('./routes/Floorroutes')
const Boothroutes = require('./routes/Boothroutes')
const Speakerroutes = require('./routes/Speakerroutes')
const Hallroutes = require('./routes/Hallroutes')
const Workshoproutes = require('./routes/Workshoproutes')
const WorkShopBookingroutes = require('./routes/WorkShopBookingRoute')


const app = express()


// middlewears

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API'S Routes

app.use('/api/addevent', Eventroutes);
app.use('/api/adduser', Userroutes);
app.use('/api/bookings', BookingsRoute);
app.use('/api/addbooth', Boothroutes)
app.use('/api/addfloor', Floorroutes)
app.use('/api/addspeaker', Speakerroutes)
app.use('/api/addhall', Hallroutes)
app.use('/api/addworkshop', Workshoproutes)
app.use('/api/workshopbooking', WorkShopBookingroutes)


app.listen(process.env.Port, () => {
    ConnectDB()
    console.log(`Server is running on port no ${process.env.Port}`)
})