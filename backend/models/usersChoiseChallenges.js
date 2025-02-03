import mongoose from "mongoose";

const usersChallengeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  category: { 
    type: String, 
    required: true 
},
  time: { 
    type: String, 
    required: true 
},
  daysPerWeek: { 
    type: Number, 
    required: true 
},
  startDate: { 
    type: Date, 
    required: true 
},
  challenges: [
    {
      challenge: {
        id: Number,
        title: String,
        text: String,
        category: String
      },
      date: { 
        type: Date, 
        required: true 
    },
      completed: { 
        type: Boolean, 
        default: false 
    }
    }
  ]
});

const usersChoiseChallenge = mongoose.model("usersChoiseChallenge", usersChallengeSchema);

export {usersChoiseChallenge};
