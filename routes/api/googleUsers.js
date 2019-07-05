const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const GoogleUser = require('../models/googleUser')

router.post("/", (req, res) => {

    const { userName, email, profilPic } = req.body;

    const unique = userName + email
    console.log(unique)
    
    GoogleUser.findOne({ unique })
    .then(user => {
        if(!user) {
            const newGoogleUser = new GoogleUser({
                _id: new mongoose.Types.ObjectId(),
                unique,
                userName,
                email,
                profilPic
            });

            newGoogleUser.save()
            .then(user => {
                jwt.sign({
                    id: user._id}, 
                    process.env.SECRET, 
                    {expiresIn: '365d'},
                    (err, token) => {
                        if(err) throw err;
                        res.status(201).json({
                            token,
                            msg: 'created',
                            user
                        });
                    });
                })           
        } else {
            jwt.sign(
                {id: user._id}, 
                process.env.SECRET, 
                {expiresIn: '365d'},
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user
                });
            });
        }
    })
})

router.get("/", (req, res, next) => {
    GoogleUser.find()
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
