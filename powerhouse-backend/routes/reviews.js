const express = require('express');
const router = express.Router();
const db = require('../models');

// All reviews from databse
router.get('/', async (req, res) => {
    try{
        const reviews = await db.Review.findAll();
        res.json(reviews);
    } catch (err) { res.status(500).json({error: err.message}); }
});

// Top reviews for the navbar
router.get('/top', async (req, res) => {
    try {
        const reviews = await db.Review.findAll({ where: { is_top: true } });
        res.json(reviews);
    } catch (e) { res.status(500).json({error: e.message}); }
});

// New review
router.post('/', async (req, res) => {
    try {
        const review = await db.Review.create(req.body);
        res.status(201).json(review);
    } catch (err) { res.status(500).json({error: err.message}); }
});

module.exports = router;