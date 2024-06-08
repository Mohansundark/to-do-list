const mongoose = require("mongoose")
const validator = require("validator")

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: null
    }

})

const ToDo = mongoose.model("ToDo", todoSchema)

module.exports = todoSchema;
