const router = require("express").Router();

//Routes for users and friends
const friendRoutes = require("./friendRoutes");
const userRoutes = require("./userRoutes");

// Routes for thoughts and reactions 
const thoughtRoutes = require("./thoughtRoutes");
const reactionRoutes = require("./reactionRoutes");

// Use Routes
router.use("/users", friendRoutes);
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
// router.use("/thoughts", reactionRoutes);

module.exports = router;