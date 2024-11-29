const express = require("express");
const { ConnectDB } = require("./Config/Db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Routes
const Eventroutes = require('./routes/Eventroutes');
const Userroutes = require('./routes/Userroutes');
const BookingsRoute = require('./routes/Bookingsroute');
const Floorroutes = require('./routes/Floorroutes');
const Boothroutes = require('./routes/Boothroutes');
const Speakerroutes = require('./routes/Speakerroutes');
const Hallroutes = require('./routes/Hallroutes');
const Workshoproutes = require('./routes/Workshoproutes');
const WorkShopBookingroutes = require('./routes/WorkShopBookingRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create uploads folder if missing
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/addevent', Eventroutes);
app.use('/api/adduser', Userroutes);
app.use('/api/bookings', BookingsRoute);
app.use('/api/addbooth', Boothroutes);
app.use('/api/addfloor', Floorroutes);
app.use('/api/addspeaker', Speakerroutes);
app.use('/api/addhall', Hallroutes);
app.use('/api/addworkshop', Workshoproutes);
app.use('/api/workshopbooking', WorkShopBookingroutes);

// Serve React Frontend in Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
    });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server is running on port ${PORT}`);
});
