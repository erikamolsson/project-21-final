import mongoose from "mongoose";


const challengeSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
}, {timestamps: true});

export const Challenge = mongoose.model("Challenge", challengeSchema);