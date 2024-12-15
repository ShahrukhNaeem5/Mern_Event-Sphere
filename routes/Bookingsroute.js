const express = require('express');
const Bookings = require('../models/Bookings');
const router = express.Router();
const jwt = require('jsonwebtoken');


// post route 

router.post('/', async (req, res) => {
  const { Booking_Event_title, exhibitorname, exhibitoremail, companyname, Booking_Event_description, productname, Event_Title, Event_Date, Event_Location, Event_Description, Event_Theme } = req.body
  try {
   // Extract token from headers and decode it to get the userId
   const authHeader = req.headers.authorization;
    
   if (!authHeader) {
     return res.status(401).json({ message: 'Authorization header is missing' });
   }

   const tokenParts = authHeader.split(' ');
   if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
     return res.status(401).json({ message: 'Invalid Authorization header format' });
   }

   const token = tokenParts[1];
   const decodedToken = jwt.verify(token, 'regsecret'); // Replace 'regsecret' with your secret key
   const userId = decodedToken.userId; // Get the userId from the decoded token

    const bookevent = await Bookings.create({
      Booking_Event_title: Booking_Event_title,
      exhibitorname: exhibitorname,
      exhibitoremail: exhibitoremail,
      companyname: companyname,
      Booking_Event_description: Booking_Event_description,
      productname: productname,
      Event_Title: Event_Title,
      Event_Date: Event_Date,
      Event_Location: Event_Location,
      Event_Description: Event_Description,
      Event_Theme: Event_Theme,
      userId: userId, // Add userId to the booking data


    })
    return res.status(200).json('Event Booked Successfully')
  } catch (error) {
    console.log(error)
  }
})

// get route

router.get('/', async (req, res) => {
  try {
    // Check if the Authorization header is present
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid Authorization header format' });
    }

    const token = tokenParts[1];
    const decodedToken = jwt.verify(token, 'regsecret'); // Replace 'regsecret' with your actual secret key

    console.log('Decoded Token:', decodedToken); // Log decoded token for debugging

    const userId = decodedToken.userId; // Get the userId from the decoded token

    // Fetch bookings specific to the logged-in user
    const userBookings = await Bookings.find({ userId: userId });

    res.status(200).json(userBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});


// get all booking data 

router.get('/allbookings', async (req, res) => {
  try {
    const fetchexhibitordata = await Bookings.find();
    res.status(200).json(fetchexhibitordata);
  } catch (error) {
    res.status(400).json({ message: 'Failed to Fetch Exhibitor' })
  }
})




// Get a specific booking (for admin to manage)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const booking = await Bookings.findById(id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});


// Update booking status
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = await Bookings.findByIdAndUpdate(id, { status }, { new: true });
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});


module.exports = router;