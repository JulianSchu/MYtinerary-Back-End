const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    profilPic: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    itId: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('comment', commentSchema)