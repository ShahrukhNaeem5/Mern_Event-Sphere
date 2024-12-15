const express = require("express");
const router = express.Router();
const workshopBookingModel = require("../models/WorkshopBooking");
const mongoose = require("mongoose");

// GET all workshop bookings
// http://localhost:5000/api/workshopbooking
router.get("/", async (req, res) => {
    try {
        const workshopBookings = await workshopBookingModel.find().populate("user").populate("workshop");

        if (!workshopBookings || workshopBookings.length === 0) {
            return res.status(404).json({ err: "No bookings found." });
        }

        return res.status(200).json(workshopBookings);
    } catch (error) {
        console.error("Error reading workshop bookings:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});


// GET  workshop bookings of logedIn user
// http://localhost:5000/api/workshopbooking/:Userid
router.get("/:id", async (req, res) => {
    try {
            // user id of logedIn user
            const userId  = req.params.id;

        const workshopBookings = await workshopBookingModel.find({user: userId}).populate("user").populate("workshop");

        if (!workshopBookings || workshopBookings.length === 0) {
            return res.status(404).json({ err: "No bookings found." });
        }

        return res.status(200).json(workshopBookings);
    } catch (error) {
        console.error("Error reading workshop bookings:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

// POST a new workshop booking
// http://localhost:5000/api/workshopbooking
router.post("/", async (req, res) => {
    try {
        const { user, workshop } = req.body;

        // Validate user and workshop IDs
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ err: "Invalid user ID. Please provide a valid MongoDB ObjectId." });
        }
        if (!mongoose.Types.ObjectId.isValid(workshop)) {
            return res.status(400).json({ err: "Invalid workshop ID. Please provide a valid MongoDB ObjectId." });
        }

        // Create the new workshop booking
        const newWorkshopBooking = await workshopBookingModel.create({ user, workshop });

        // Send back a success response with the created booking details
        return res.status(201).json({ msg: "Workshop booked successfully", newWorkshopBooking });
    } catch (error) {
        console.error("Error booking workshop:", error);
        return res.status(500).json({ err: "Internal Server Error" });
    }
});

module.exports = router;
