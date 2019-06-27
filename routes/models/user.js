const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilPic: {
        type: String,
        default: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/banana-pink-background-thumb.jpg?w=756'
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: 'Wonderland'
    }
});

module.exports = mongoose.model('user', userSchema)