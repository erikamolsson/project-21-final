import express from "express";
import cors from "cors";
import dbConnect from "./config/db.js";
import challengeRoutes from "./routes/challengeRoutes";
import userRoutes from "./routes/userRoutes.js";
/* import path from "path"; */
import expressListEndpoints from "express-list-endpoints";




// Connect to MongoDB
dbConnect();


const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
// start Homepage All
app.get("/", (req, res) => {

  const endpoints = expressListEndpoints(app);
  res.json({
    message: "Here are the available endpoints:",
    endpoints: endpoints
  });
});

// Reg users
app.use("/users", userRoutes);

// getChallenges
app.use("/challenges", challengeRoutes);

// Serve static files from the `uploads` directory
/* app.use("/uploads", express.static(path.join(__dirname, "uploads"))); */





// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
