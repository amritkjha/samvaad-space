const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    communities: {
        type: Array,
        default: []
    },
})

const User = mongoose.model('User', UserSchema);

module.exports = User;