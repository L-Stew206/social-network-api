// Define Mongoose
//const mongoose = require('mongoose');
const { Schema, Types, model } = require("mongoose");


// Create a new instance of the Mongoose schema to define shape of each document
// // Schema for Reaction model (subdocument of Thought model)
const reactionSchema = new Schema(
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
//const thoughtSchema = new mongoose.Schema( which way ??
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },


        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString(),
        },


        username: {
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
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length
    });

// Initialize our User model
//const Thought = mongoose.model('Thought', thoughtSchema);
const Thought = model('Thought', thoughtSchema);



module.exports = Thought;
