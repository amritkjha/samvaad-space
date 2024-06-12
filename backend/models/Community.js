const { Schema, default: mongoose } = require("mongoose");
const User = require("./User");

const CommunitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: {
        type: Array,
        default: [],
    },
    author: {
        type: String,
        required: true,
    },
    community_id: {
        type: String,
        required: true,
    }
})

const Community = mongoose.model('Community', CommunitySchema);

module.exports = Community;