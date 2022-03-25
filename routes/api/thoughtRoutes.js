const router = require('express').Router();
const Thought = require('../../models/Thought');

//GET all Thoughts
router.get("/", async (req, res) => {
    try {
        const thoughtData = await Thought.findAll();
        res.status(200).json(thoughtData);

    } catch (err) {
        console.log("err", err);
        res.status(500).json();
    }
});

//GET a single Thought by ID 
router.get("/thought:Id", async (req, res) => {
    try {
        const thoughtData = await User.findById(
            {
                _id: req.params.thoughtId,
            }
        );
        res.status(200).json(thoughtData);
    } catch (err) {
        console.log("err", err);
        res.status(500).json();
    }
});

// POST a new Thought 
router.post("/",
  async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.status(200).json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// UPDATE a Thought by ID 
router.put(":userId", async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
            ...req.body
        }
      );
      if (!updatedThought) {
        res.status(404).json({ message: "NO thought with this ID found." });
        return;
      }
      res.status(200).json(updatedThought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  // DELETE a Thought by ID 
router.delete(":thoughtId", async (req, res) => {
  try {
    const thoughtData = await Thought.deleteOne(
      {
        _id: req.params.thoughtId,
      }
    );
    if (!thoughtData) {
      res.status(404).json({ message: "NO Thought with this ID found." });
      return;
    }
    console.log(`${thoughtData} DELETED.`);
    res.status(200).json(thoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router; 