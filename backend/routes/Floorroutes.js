const express = require("express")
const router = express.Router()
const Floor = require("../models/Floor")


router.post("/",async(req,res)=>{
    const {floorname} = req.body;
    const FloorExist = await Floor.findOne({ floorname });
    if (FloorExist) return res.status(400).json({ error: "Floor already exists" });
    const floorAdd = await Floor.create({
        floorname : floorname,
     
    })


    console.log(floorname)


    console.log(floorAdd)
    return res.status(200).json({ success: "Floor added successfully" });

})
router.get("/", async(req,res) =>{
    try{
        const FetchFloorData = await Floor.find()
        res.status(200).json(FetchFloorData);

    }catch{
        res.status(400).json({ message: 'Failed to fetch events' });

    }

})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFloor = await Floor.findByIdAndDelete(id);

        if (!deletedFloor) {
            return res.status(404).json({ error: "Floor not found" });
        }

        return res.status(200).json({ message: "Floor deleted successfully", deletedFloor });
    } catch (error) {
        console.error('Error deleting Floor:', error);

    }
});


router.get('/unoccupiedfloors', async (req, res) => {
    try {
        const unoccupiedFloors = await Floor.find({ status: 'unoccupied' });
        res.json(unoccupiedFloors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch floors' });
    }
});
router.get('/unoccupied-halls/:floorId', async (req, res) => {
    try {
        const { floorId } = req.params;
        const floor = await Floor.findById(floorId);
        
        if (!floor) {
            return res.status(404).json({ error: 'Floor not found' });
        }

        if (floor.status === 'unoccupied') {
            res.json(floor);
        } else {
            res.status(400).json({ error: 'No unoccupied halls on this floor' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch halls' });
    }
});
router.put('/:id',async(req,res)=>{
    const { id } = req.params;
    const { floorname } = req.body;
  
    try {
      const updatedFloor = await Floor.findByIdAndUpdate(id, { floorname }, { new: true });
  
      if (!updatedFloor) {
        return res.status(404).json({ error: 'Floor not found' });
      }
  
      res.status(200).json({ success: 'Floor updated successfully', floor: updatedFloor });
    } catch (error) {
      res.status(500).json({ error: 'Error updating floor' });
    }
})
module.exports = router