const verifyToken = require("../middleware/verify-token");
const User = require("../models/user");
const Skintea= require("../models/skintea");
const express = require("express");
const router = express.Router();

//I.N.D.U.C.E.S

//Get index /skintea

router.get("/", async(req,res)=>{
    try{
        const skintea= await Skintea.find().populate("author").sort({
            createdAt: "desc",
        });

        res.status(200).json({skintea});

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
   
      const deletedTea = await Skintea.findByIdAndDelete(req.params.id);
      res.status(200).json({ deletedTea: deletedTea });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PUT /skintea/:id
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const foundTea = await Skintea.findById(req.params.id);
  
        if (!foundTea.author.equals(req.user._id)) {
          return res
            .status(403)
            .json({ error: "Your are not allowed to edit other people's tea" });
      }
  
      const updatedTea = await Skintea.findByIdAndUpdate(
        req.params.id, // id of the hoot we are updates
        req.body, // body from the request
        {
          new: true, // return the updated hoot
        }
      );
  
      res.status(200).json({ updatedTea: updatedTea});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
//POST /skintea
  router.post("/", verifyToken, async (req, res) => {
    try {
      // add author onto the hoot (adds whoevers logged in)
      req.body.author = req.user._id;
      const skintea = await Skintea.create(req.body);
      skintea._doc.author = req.user;
      res.status(201).json({ skintea: skintea });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//SHOW GET/skintea/:id
  router.get("/:id", async (req, res) => {
    try {
      const foundTea = await Skintea.findById(req.params.id)
      .populate("author")
      .populate("comments.author")
      res.status(200).json({ foundTea: foundTea });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//  POST for Comments

  router.post("/:id/comments", verifyToken, async (req, res) => {
    try {
      // find the comment to update
      const foundSkintea = await Skintea.findById(req.params.id);
      // add logged in user to the req.body.auther
      if (!foundSkintea) {
        throw new Error("Comment not found");
      }
      req.body.author = req.user._id; // sets the owner of the comment
      // add the comment 
      foundSkintea.comments.push(req.body);
      // save the comment
      await foundSkintea.save();
      // return the new comment
      const newComment = foundSkintea.comments[foundSkintea.comments.length - 1];
      res.status(201).json({ newComment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // // PUT for Comments

  // router.put("/:id/comments/:commentId", verifyToken, async (req, res) => {
  //   try {
  //     // find the comment to update
  //     const foundSkintea = await Skintea.findById(req.params.id);
  //     // find the comment to update
  //     const foundComment = foundSkintea.comments.id(req.params.commentId);
  //     // check if the user is the owner of the comment
  //     if (!foundSkintea.author.equals(req.user._id)) {
  //       return res
  //         .status(403)
  //         .json({
  //           error: "Your are not allowed to update other people comments",
  //         });
  //     }
  //     // update the comment
  //     foundSkintea.text = req.body.text;
  //     // save the comment
  //     await foundSkintea.save();
  //     // return the updated comment
  //     res.status(200).json({ message: "Ok" });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // });

  
  
  
  
  


  
  







  module.exports= router;