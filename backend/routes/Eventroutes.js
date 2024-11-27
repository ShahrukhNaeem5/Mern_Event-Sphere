const express = require("express")
const Event = require("../models/Event")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const Booths = require("../models/Booths")
const Floor = require("../models/Floor")
const Halls= require("../models/Halls")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/eventImages'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))

    }
})

const uploads = multer({ storage });



router.post("/", uploads.single('Eventimage'), async (req, res) => {
    const { title, date, location, description, theme } = req.body
    const Eventimage = req.file ? req.file.filename : '';



    if (!title) return res.status(401).json({ error: "Enter Valid Title" });
    if (!date) return res.status(401).json({ error: "Enter Valid Date" });
    if (!location) return res.status(401).json({ error: "Enter Valid Location" });
    if (!description) return res.status(401).json({ error: "Enter your Event description." });
    if (!theme) return res.status(401).json({ error: "Enter your Event Theme" });
    if (!Eventimage) return res.status(401).json({ error: "Event Image should be selected" });





    const eventAdd = await Event.create({
        title: title,
        date: date,
        location: location,
        description: description,
        theme: theme,
        Eventimage: Eventimage
    });




    console.log(eventAdd)
    return res.status(201).json({ success: "Event created successfully" });





})


router.get('/', async (req, res) => {
    try {
        const FetchEventData = await Event.find()
        const FetchFloors = await Floor.find()
        const FetchBooths = await Booths.find()
        const FetchHalls = await Halls.find({ status: 'unoccupied' })
        const Eventlocation = {
            events: FetchEventData,
            booth: FetchBooths,
            floor : FetchFloors,
            Halls : FetchHalls

        }
        res.status(200).json(Eventlocation);

    } catch {
        res.status(400).json({ message: 'Failed to fetch events' });

    }
})

// Route to get an event by ID
router.get('/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
    } catch (error) {
      console.error('Error fetching event data:', error);
      res.status(500).json({ message: 'Error fetching event data' });
    }
  });

router.put('/:id', uploads.single('Eventimage'), async (req, res) => {
    try {
      const { id } = req.params;
      const { title, date, location, description, theme } = req.body
    const Eventimage = req.file ? req.file.filename : '';

  
      // Construct updated data
      const updatedData = {
        title: title,
        date: date,
        location: location,
        description: description,
        theme: theme,
        ...(Eventimage && { Eventimage }), // Only update image if provided
      };
  
      // Update the user in the database
      const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      return res.status(200).json({ success: "Event updated successfully", updatedEvent });
    } catch (error) {
      console.error('Error updating Event:', error);
      return res.status(500).json({ error: "Server error" });
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        return res.status(200).json({ success: "Event deleted successfully", deletedEvent });
    } catch (error) {
        console.error('Error deleting event:', error);

    }
});


module.exports = router;