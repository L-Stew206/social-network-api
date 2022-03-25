// Define Mongoose
const { Schema, model } = require("mongoose");

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new Schema(
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
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],


        friends: [
            {
                //type: mongoose.Schema.Types.ObjectId,
                type: Schema.Types.ObjectId,
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
const User = model('User', userSchema);



module.exports = User;
