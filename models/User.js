// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },


        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],


        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }

);

// Create a virtual property `` 
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return `${this.friends.length}`;
    })

// Using mongoose.model() to compile a model based on the schema
const User = mongoose.model('User', userSchema);



module.exports = User;
