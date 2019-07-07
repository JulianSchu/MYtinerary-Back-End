const mongoose = require('mongoose');

const itinerarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cityId: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    profilPic: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    activities: {
        type: Array
    },
    hashtag: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('itinerary', itinerarySchema)