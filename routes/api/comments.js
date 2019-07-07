const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth')

const Comment = require('../models/comment')

router.post("/", auth, (req, res) => {

    const { userName, userId, profilPic, comment, itId, created } = req.body;
    
    if(!comment) {
        return res.status(400).send('Please leave a comment!');
    }

    const newComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        userName, 
        userId, 
        profilPic, 
        comment, 
        itId,
        created
    });

    newComment.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'posted',
                newComment: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
        });
    })
})

router.get("/:id", (req, res) => {
    const itId = req.params.id;
    Comment.find({ itId })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).send('For this itinerary there is no comments yet.');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
})

router.get("/", (req, res) => {
    Comment.find()
        .sort({
            created: -1
        })
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


router.delete("/:id", auth, (req, res) => {
    const id = req.params.id;
    Itinerary.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;