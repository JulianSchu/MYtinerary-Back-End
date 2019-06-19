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
    country: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    activities: {
        type: Array,
        default: [{url: 'There is no activities to show yet.'}]
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