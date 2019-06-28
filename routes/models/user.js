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
        type: String
    },
    password: {
        type: String,
        required: true
    },
    passwordConfirm: {
        type: String
    },
    country: {
        type: String,
        default: 'Wonderland'
    }
});

module.exports = mongoose.model('user', userSchema)