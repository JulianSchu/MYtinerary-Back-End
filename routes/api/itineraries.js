const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth')

const Itinerary = require('../models/itinerary')

router.post("/", auth, (req, res) => {

    const { title, city, country, userName, profilPic, duration, price, activities, hashtag } = req.body;

    if(!title) {
        return res.status(400).send('Please enter title!');
    }

    if(!city) {
        return res.status(400).send('Please enter city!');
    }

    if(!country) {
        return res.status(400).send('Please enter country!');
    }

    if(!userName) {
        return res.status(400).send('Please enter userName!');
    }

    if(!profilPic) {
        return res.status(400).send('Please enter profilPic!');
    }
    
    if(!duration) {
        return res.status(400).send('Please enter duration!');
    }

    const newItinerary = new Itinerary({
        _id: new mongoose.Types.ObjectId(),
        userName,
        title, 
        city, 
        country,
        profilPic, 
        duration, 
        price, 
        activities, 
        hashtag
    });

    newItinerary.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'posted',
                newItinerary: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
        });
    })
})


router.get("/:itineraryCity", (req, res) => {
    const city = req.params.itineraryCity;
    Itinerary.find({ city })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).send('For this city there is no itinerary yet.');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
})


router.get("/", (res) => {
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

router.delete("/:itineraryId", auth, (req, res) => {
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