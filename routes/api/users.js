const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user')

router.post("/", (req, res, next) => {

    var cryptPassword = bcrypt.hashSync(req.body.password, saltRounds);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        email: req.body.email,
        password: cryptPassword,
        profilPic: req.body.profilPic,
        country: req.body.country
    });

    User.find( { userName: user.userName })
        .exec()
        .then(doc => {
            if (doc.length !== 0) {
                console.log('This username already exists!');
                console.log(doc.length)
                res.status(208).json({
                    message: 'The username already exists!',
                    user: doc
                })
            } else {
                User.find( { email: user.email })
                .exec()
                .then(doc => {
                    if (doc.length !== 0) {
                        console.log('This email already exists!');
                        console.log(doc.length)
                        res.status(208).json({
                            message: 'The email already exists!',
                            user: doc
                        })
                    } else {
                        user.save()
                        .then(result => {
                            console.log(result);
                            var token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '365d'});
                            res.status(201).json({
                                message: 'created',
                                createdUser: result,
                                auth: true,
                                token: token
                            });
                        })
                    }
                }
            )
            .catch(err => {
                    console.log(err);
                    res.status(500).json({
                    error: err
                    });
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
})

router.get("/", (req, res, next) => {
    User.find()
        .sort({name: 1})
        .then(docs => {
            res.status(200).json(docs)
            console.log(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

module.exports = router;