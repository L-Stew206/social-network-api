const router = require('express').Router();
const User = require('../../models/User');

//GET all users
router.get("/", async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);

    } catch (err) {
        console.log("err", err);
        res.status(500).json();
    }
});

//GET a single user by ID 
router.get("/user:Id", async (req, res) => {
    try {
        const userData = await User.findById(
            {
                _id: req.params.userId,
            }
        );
        res.status(200).json(userData);
    } catch (err) {
        console.log("err", err);
        res.status(500).json();
    }
});

// CREATE a new User 
router.post("/",
  async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Update a User by ID 
router.put(":userId", async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
            ...req.body
        }
      );
      if (!updatedUser) {
        res.status(404).json({ message: "NO User with this ID found." });
        return;
      }
      console.log(`${updatedUser} DELETED.`);
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  // DELETE a User by ID 
router.delete(":userId", async (req, res) => {
  try {
    const userData = await User.deleteOne(
      {
        _id: req.params.userId,
      }
    );
    if (!userData) {
      res.status(404).json({ message: "NO User with this ID found." });
      return;
    }
    console.log(`${userData} DELETED.`);
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});




module.exports = router; 