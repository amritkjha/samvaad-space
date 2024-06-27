const { Schema, default: mongoose } = require("mongoose");

const MessageSchema = new Schema({
    community_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;