const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const City = require('../models/city')

router.post("/", (req, res, next) => {
    const city = new City({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        value: req.body.value,
        country: req.body.country
    });

    City.find({
            name: city.name
        })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                console.log('The city already exists!');
                res.status(208).json({
                    message: 'The city already exists!',
                    city: doc
                })
            } else {
                city.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'posted',
                            createdProduct: result
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

router.get("/:cityId", (req, res, next) => {
    const id = req.params.cityId;
    City.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry for provided ID'
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
    City.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    // res.send("Hello world");
});

router.delete("/:cityId", (req, res, next) => {
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