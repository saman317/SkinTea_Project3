const verifyToken = require("../middleware/verify-token");
const User = require("../models/user");
const Skintea= require("../models/skintea");
const express = require("express");
const router = express.Router();

//I.N.D.U.C.E.S

//Get index /skintea

router.get("/", async(req,res)=>{
    try{
        const skinT= await Skintea.find().populate("author").sort({
            createdAt: "desc",
        });

        res.status(200).json({skinT});

    }catch(error){
        res.status(500).json({error: error.message})
    }
})

// DELETE /skintea/:id
router.delete("/:id", verifyToken, async (req, res) => {
    try {
      
      const foundTea = await Skintea.findById(req.params.id);
  
      if (!foundTea.author.equals(req.user._id)) {
        return res
          .status(403)
          .json({ error: "Your are not allowed to delete other people's tea" });
      }
  
      const deletedTea = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ skinTea: deletedTea });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT /skintea/:id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const foundTea = await User.findById(req.params.id);
  
        if (!foundTea.author.equals(req.user._id)) {
          return res
            .status(403)
            .json({ error: "Your are not allowed to edit other people's tea" });
      }
  
      const updatedTea = await User.findByIdAndUpdate(
        req.params.id, // id of the hoot we are updates
        req.body, // body from the request
        {
          new: true, // return the updated hoot
        }
      );
  
      res.status(200).json({ skintea: updatedTea});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
//POST /skintea
  router.post("/", verifyToken, async (req, res) => {
    try {
      // add author onto the hoot (adds whoevers logged in)
      req.body.author = req.user._id;
      const skinT = await Skintea.create(req.body);
      skinT._doc.author = req.user;
      res.status(201).json({ skinT: skinT });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  router.get("/:id", async (req, res) => {
    try {
      const foundTea = await Skintea.findById(req.params.id).populate("author");
      res.status(200).json({ skintea: foundTea });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports= router;