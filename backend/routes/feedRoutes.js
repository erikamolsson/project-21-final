import { Router } from "express";
import postController from "../controllers/postController";
/* import multer from "multer"; */

/* const upload = multer({ dest: "uploads/" }); */
const { getAllPosts, createPost, likePost, addComment } = postController;
const router = Router();



// Get all posts
router.get("/", getAllPosts);

// Create a new post
router.post("/", createPost);

// Like a post
router.post("/:id/like", likePost);

// Comment on post
router.post("/:id/comment", addComment);

// Create a new post with an image
/* router.post("/", upload.single("image"), createPost); */


export default router;
