const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const Workshop = require("../models/Workshop")
const Booths = require("../models/Booths")
const Floor = require("../models/Floor")
const Halls= require("../models/Halls")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../uploads/workshopImages'))
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))

    }
})
const uploads = multer({ storage });

router.post('/',uploads.single('Workshopimage'), async(req,res)=>{
    const {Topic, Date, Location, Speaker} = req.body
    const Workshopimage = req.file ? req.file.filename : '';

   try {
    if (!Topic) return res.status(401).json({ error: "Enter Topic Name" });
    if (!Date) return res.status(401).json({ error: "Enter Date of workshop" });
    if (!Location) return res.status(401).json({ error: "Enter the Location of workshop" });
    if (!Speaker) return res.status(401).json({ error: "Select the speaker name" });
    if (!Workshopimage) return res.status(401).json({ error: "Workshop Image is required" });

    const workshopAdd = await Workshop.create({
        Topic:Topic,
        Date:Date,
        Location: Location,
        Speaker:Speaker,
        Workshopimage:Workshopimage,
        
    });

    return res.status(200).json({ success: "Workshop added successfully" });
    
   } catch (error) {
    return res.status(500).json({ error: "Server error" });
    
   }





})
router.get('/', async (req, res) => {
    try {
        const FetchWorkshopData = await Workshop.find()
        const FetchFloors = await Floor.find()
        const FetchBooths = await Booths.find()
        const FetchHalls = await Halls.find({ status: 'unoccupied' })
        const Workshoplocation = {
            workshops: FetchWorkshopData,
            booth: FetchBooths,
            floor : FetchFloors,
            Halls : FetchHalls

        }
        res.status(200).json(Workshoplocation);

    } catch {
        res.status(400).json({ message: 'Failed to fetch workshop' });

    }
})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWork = await Workshop.findByIdAndDelete(id);

        if (!deletedWork) {
            return res.status(404).json({ error: "Workshop not found" });
        }

        return res.status(200).json({ success: "Workshop deleted successfully", deletedWork });
    } catch (error) {
        console.error('Error deleting Workshop:', error);

    }
});


router.put('/:id' ,uploads.single('Workshopimage'), async(req,res)=>{
    try {
        const { id } = req.params;
        const {Topic, Date, Location, Speaker} = req.body
    const Workshopimage = req.file ? req.file.filename : '';

    const updatedData = {
        Topic: Topic,
        Date: Date,
        Location: Location,
        Speaker: Speaker,
        ...(Workshopimage && { Workshopimage }), // Only update image if provided
      };
  
      // Update the user in the database
      const updatedWorkshop = await Workshop.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedWorkshop) {
        return res.status(404).json({ error: "Workshop not found" });
      }
  
      return res.status(200).json({ success: "Workshop updated successfully", updatedWorkshop });
    } catch (error) {
      console.error('Error updating Workshop:', error);
      return res.status(500).json({ error: "Server error" });
    }
})
module.exports = router;