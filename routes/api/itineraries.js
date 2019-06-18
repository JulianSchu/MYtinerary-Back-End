const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Itinerary = require('../models/itinerary')

router.post("/", (req, res, next) => {

    const itinerary = new Itinerary({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        city: req.body.city,
        country: req.body.country,
        name: req.body.name,
        profilePic: req.body.profilePic,
        likes: req.body.likes,
        duration: req.body.duration,
        price: req.body.price,
        hashtag: req.body.hashtag,
        created: req.body.created
    });

    itinerary.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'posted',
                createdItinerary: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.get("/:itineraryCity", (req, res, next) => {
    const city = req.params.itineraryCity;
    Itinerary.find({ city })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'For this city there is no itinerary yet.'
                });
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
    Itinerary.find()
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

router.delete("/:itineraryId", (req, res, next) => {
    const id = req.params.itineraryId;
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