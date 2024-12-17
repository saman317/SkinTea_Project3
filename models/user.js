const mongoose = require('mongoose');


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
        reccommendation: {
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
        
    },
        {timestamps: true}
);


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },

    skinTea: [skinteaSchema]
});
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});




userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;