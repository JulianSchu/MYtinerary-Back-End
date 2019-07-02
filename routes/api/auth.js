const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth')

const User = require('../models/user')
const GoogleUser = require('../models/googleUser')

router.post("/", (req, res) => {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).send('Please enter all fileds');
    }

    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(400).send('User does not exists');
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).send('Wrong password');
                    }

                    jwt.sign({
                            id: user._id
                        },
                        process.env.SECRET, {
                            expiresIn: '365d'
                        },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user
                            });
                        });
                })
        })
});

router.get('/user', auth, (req, res) => {

    User.findById(req.user.id)
        .select('-password')
        .then((user) => {
            if (user) {
                res.json(user)
            } else {
                GoogleUser.findById(req.user.id)
                    .select('-password')
                    .then((user) =>
                        res.json(user)
                    )
            }
        })
});

module.exports = router;