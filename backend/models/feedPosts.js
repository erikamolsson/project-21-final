import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    message: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 140
    },
    likes: {
      type: Number,
      default: 0,
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }, 
    comments: [
      {
        text: { 
          type: String, 
          required: true 
        },
        createdAt: { 
          type: Date, 
          default: () => new Date()
        }
      }
    ]
  });

  const Post = mongoose.model("Post", postSchema);

  export {Post}
