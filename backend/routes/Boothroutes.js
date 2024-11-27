const express = require("express")
const Booths = require("../models/Booths")
const Floor = require("../models/Floor")
const router = express.Router()



router.post("/", async(req,res)=>{
    const { boothName ,floorId} = req.body;
  
    if (!boothName) return res.status(401).json({ error: "Enter Booth Number" });
    if (!floorId) return res.status(401).json({ error: "Choose your Floor" });
    const BoothExist = await Booths.findOne({ boothName });
    if (BoothExist) return res.status(400).json({ error: "Booth already exists" });
    const AddBooth = await Booths.create({
        boothName :boothName,
        floorId:floorId
       
    })
    return res.status(200).json({ success: "Booth Added successfully" });

})


router.get("/",async(req,res)=>{
    
  
    const floorslist = await Floor.find();

    const booths = await Booths.find()
    
    const floor_booth = {
        floor : floorslist,
        boths:booths
    }
  
    console.log(booths)
    res.status(200).json(floor_booth);
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedbooth = await Booths.findByIdAndDelete(id);

        if (!deletedbooth) {
            return res.status(404).json({ error: "Booth not found" });
        }

        return res.status(200).json({ message: "Booth deleted successfully", deletedbooth });
    } catch (error) {
        console.error('Error deleting Booth:', error);

    }
});
router.put('/:id',async(req,res)=>{
    const { id } = req.params;
    const { boothName ,floorId} = req.body;

    const updatedData = {
        boothName: boothName,
        floorId: floorId,
      };
  
    try {
      const updatedBooth = await Booths.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedBooth) {
        return res.status(404).json({ error: 'Booths not found' });
      }
  
      res.status(200).json({ success: 'Booths updated successfully',  updatedBooth });
    } catch (error) {
      res.status(500).json({ error: 'Error updating Booths' });
    }
})

module.exports = router;