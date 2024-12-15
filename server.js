const express = require("express");
const { ConnectDB } = require("./Config/Db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// Connect to the database
ConnectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Create and serve uploads folder (note: for production, use cloud storage like AWS S3)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

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
    const frontendPath = path.join(__dirname, "frontend", "build");

    // Ensure the frontend build exists
    if (fs.existsSync(frontendPath)) {
        app.use(express.static(frontendPath));
        app.get("*", (req, res) => {
            res.sendFile(path.join(frontendPath, "index.html"));
        });
    } else {
        console.error("Frontend build folder not found. Did you run `npm run build` in the frontend?");
    }
} else {
    console.log("Running in development mode. Frontend not served.");
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
