const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth')

const City = require('../models/city')

router.post("/", auth, (req, res) => {
    const city = new City({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        country: req.body.country
    });

    City.find({
            _id: city._id
        })
        .exec()
        .then(doc => {
            if (doc.length !== 0) {
                res.status(208).send('The city already exists!')
            } else {
                city.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'posted',
                            createdCity: result
                        })
                    })
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

router.get("/ChosenCity/:cityName", (req, res) => {
    const name = req.params.cityName;
    City.find({ name })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).send('No valid entry for provided city');
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
    City.find()
        .sort({name: 1})
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.delete("/:cityId", auth, (req, res) => {
    const id = req.params.cityId;
    City.remove({
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