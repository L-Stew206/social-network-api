const mongoose = require("mongoose");
const User = require("../models/User");
const Thought = require("../models/Thought");

mongoose
  .connect("mongodb://localhost:27017/social-network", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected here");
  })
  .catch((err) => {
    console.log(err);
  });

const seedUsers = [
  {
    username: "batman8888",
    email: "b_wayne@gmail.com",
  },
  {
    username: "superman7",
    email: "c_kent@gmail.com",
  },
];

const seedThoughts = [
  {
    thoughtText: "How do the Hulks shorts not rip apart.",
    username: "batman8888",
    reactions: {
      reactionBody: "I have no idea!",
      username: "superman7",
    },
  },
  {
    thoughtText: "Is the Flash faster than Superman?",
    username: "superman7",
    reactions: {
      reactionBody: "He might be, that's a close call",
      username: "batman2022",
    },
  },
];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
  await Thought.deleteMany({});
  await Thought.insertMany(seedThoughts);
};

seedDB().then(() => {
  mongoose.connection.close();
});