const express = require("express")
const router = express.Router()
const Halls = require('../models/Halls');
const Floor = require("../models/Floor");

router.post("/",async(req,res)=>{
   const  {HallName,boothId,floorId} = req.body;

    console.log(HallName)
    console.log(boothId)
    console.log(floorId)

  
    if (!HallName) return res.status(401).json({ error: "Enter Hall Name" });
    if (!boothId) return res.status(401).json({ error: "Enter Booth Number" });
    if (!floorId) return res.status(401).json({ error: "Choose your Floor" });
    
    const HallExist = await Halls.findOne({ HallName });
    const FloorExist = await Floor.find({ floorname : floorId });
    if (HallExist && FloorExist) return res.status(400).json({ error: "Hall already exists" });

    const HallDetail = await Halls.create({
        HallName : HallName,
        floorId:floorId,
        boothId:boothId,
    

     
    })


    // console.log(HallDetail)
   


    return res.status(200).json({ success: "Hall added successfully" });

})

router.get("/", async(req,res)=>{
    try{
        const FetchHallData = await Halls.find()
        res.status(200).json(FetchHallData);

    }catch{
        res.status(400).json({ message: 'Failed to fetch halls' });

    }
})

router.delete("/:id" , async(req,res)=>{
    try {
        const { id } = req.params;
        const deletedHall = await Halls.findByIdAndDelete(id);

        if (!deletedHall) {
            return res.status(404).json({ error: "Hall not found" });
        }

        return res.status(200).json({ message: "Hall deleted successfully", deletedHall });
    } catch (error) {
        console.error('Error deleting Hall:', error);

    }
})
router.put('/:id', async(req,res)=>{
    const { id } = req.params;
    const { HallName, boothId, floorId, status } = req.body;
    try {
        
        const updatedHall = await Halls.findByIdAndUpdate(
            id,
            { HallName, boothId, floorId , status},
            { new: true } 
        );

        if (!updatedHall) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        res.json({ success: 'Hall updated successfully', hall: updatedHall });
    } catch (error) {
        res.status(500).json({ error: 'Error updating hall' });
    }
})
router.put('/:id/status', async(req,res)=>{
    const { id } = req.params;
    const { status } = req.body; // "occupied" or "unoccupied"
    
    try {
        const hall = await Halls.findByIdAndUpdate(id, { status: status }, { new: true });
        if (hall) {
            res.status(200).json({ success: true, message: 'Hall status updated.', hall });
        } else {
            res.status(404).json({ success: false, message: 'Hall not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating hall status.', error });
    }
})

module.exports = router;