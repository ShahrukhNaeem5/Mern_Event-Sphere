const express = require('express');
const router = express.Router();
const Speaker = require('../models/Speakers')
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../uploads/speakerImages'))
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))

    }
})

const uploads = multer({storage});


router.get('/',async(req,res)=>{
const fetchSpeakerData = await Speaker.find()
res.status(200).json(fetchSpeakerData);
})


router.post('/',uploads.single('Speakerimage'), async(req,res)=>{
    const {Speakername,Speakeremail,position} = req.body
    const Speakerimage = req.file ? req.file.filename : '';
    try {
        if (!Speakername) return res.status(401).json({ error: "Enter Speaker Name" });
        if (!Speakeremail) return res.status(401).json({ error: "Enter Speaker email" });
        if (!position) return res.status(401).json({ error: "Enter the Speaker position" });
        if (!Speakerimage) return res.status(401).json({ error: "Select the speaker Image" });

        const SpeakerExist = await Speaker.findOne({ Speakeremail });
    if (SpeakerExist) return res.status(400).json({ error: "Speaker already exists" });
    
        const SpeakerAdd = await Speaker.create({
            Speakername:Speakername,
            Speakeremail:Speakeremail,
            position: position,
            Speakerimage:Speakerimage,
            
        });
    
        return res.status(200).json({ success: "Speaker added successfully" });
        
       } catch (error) {
        return res.status(400).json({ error: "Error Occured adding Speaker" });
        
       }
})


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSpeaker = await Speaker.findByIdAndDelete(id);

        if (!deletedSpeaker) {
            return res.status(404).json({ error: "Speaker not found" });
        }

        return res.status(201).json({ success: "Speaker deleted successfully", deletedSpeaker });
    } catch (error) {
        console.error('Error deleting Speaker:', error);
       
    }
});

router.put('/:id' ,uploads.single('Speakerimage'), async(req,res)=>{
    try {
        const { id } = req.params;
        const {Speakername,Speakeremail,position} = req.body
        const Speakerimage = req.file ? req.file.filename : '';

    const updatedData = {
        Speakername: Speakername,
        Speakeremail: Speakeremail,
        position: position,
        ...(Speakerimage && { Speakerimage }), // Only update image if provided
      };
  

      const updatedSpeaker = await Speaker.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedSpeaker) {
        return res.status(404).json({ error: "Speaker not found" });
      }
  
      return res.status(200).json({ success: "Speaker updated successfully", updatedSpeaker });
    } catch (error) {
      console.error('Error updating Speaker:', error);
      return res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;