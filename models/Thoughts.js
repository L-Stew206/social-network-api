// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        
        username: {
            type: String, 
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString(), 

        } 
});

// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            requires: true,
            minlength: 1,
            maxlength: 280,
        },


        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString(),
        },


        usernmae: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema],
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
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return `${this.reaction.length}`;
    })

// Using mongoose.model() to compile a model based on the schema
const Thought = mongoose.model('Thought', thoughtSchema);


module.exports = Thought;
