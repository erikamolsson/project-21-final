import { response } from "express";
import { Post } from "../models/feedPosts";


// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 }); // Sort by newest first
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {

  try {
    const { message } = req.body;
    const newPost = (await Post.create({message})).save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ 
        message: "Failed to create post", 
        error: error.message 
    });
  }
};

// Like a post
const likePost = async (req, res) => {
  const { id } = req.params;

  try {  
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, 
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ 
        success: false, 
        message: "Thought not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      response: updatedPost 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};


// Post a comment on a message
const addComment = async (req, res) => {

  const { id } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === "") {
    console.log("❌ Error: Comment text is missing!");
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      console.log("❌ Post not found:", id);
      return res.status(404).json({ message: "Post not found" });
    }

    //Add new comment
    post.comments.push({ text });
    await post.save();

    res.status(201).json({
      success: true,
      response: post
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};


export default {
  getAllPosts,
  createPost,
  likePost,
  addComment,
};
