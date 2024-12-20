
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true});


module.exports= commentSchema //already referenced and embedded