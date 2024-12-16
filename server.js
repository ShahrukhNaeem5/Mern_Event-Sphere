const express = require("express");
const { ConnectDB } = require("./Config/Db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
const crypto = require("crypto");

const app = express();

// Connect to the database
ConnectDB();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: ['https://your-frontend-url.com', 'http://localhost:3000'], // Replace with your frontend URLs
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);

// Secure headers using Helmet with CSP
app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString("base64");
    next();
});

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https://mdbcdn.b-cdn.net"],
            fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
            styleSrc: ["'self'", "'unsafe-inline'"], // Adjust as per your CSS needs
        },
    })
);

// Create and serve static 'uploads' folder (for local file storage)
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

// Mount API routes
app.use('/api/addevent', Eventroutes);
app.use('/api/adduser', Userroutes);
app.use('/api/bookings', BookingsRoute);
app.use('/api/addbooth', Boothroutes);
app.use('/api/addfloor', Floorroutes);
app.use('/api/addspeaker', Speakerroutes);
app.use('/api/addhall', Hallroutes);
app.use('/api/addworkshop', Workshoproutes);
app.use('/api/workshopbooking', WorkShopBookingroutes);

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, 'frontend', 'build');
    if (!fs.existsSync(buildPath)) {
        console.error('Build folder not found! Did you run `npm run build` in the frontend folder?');
        process.exit(1);
    }

    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
