const mongoose = require('mongoose');
const commentSchema= require("./comment")


const skinteaSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productType: {
            type: String,
            required: true,
            enum: ["Skincare", "Makeup" , "Hair"]
        },
        recommendation: {
            type: String,
            required: true,
            enum: ["Holy Grail", "Gotta Have It " , "Ehh", "Regift"]

        },
        pricePoint: {
            type: String,
            required: true,
            enum: ["$", "$$" , "$$$",]
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comments: [commentSchema]
    },
        {timestamps: true}
);
const Skintea = mongoose.model('Skintea', skinteaSchema);
module.exports= Skintea