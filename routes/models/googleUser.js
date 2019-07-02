const mongoose = require('mongoose');

const googleUserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    profilPic: {
        type: String
    },
    country: {
        type: String,
        default: 'Google'
    },
    unique: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('googleUser', googleUserSchema)