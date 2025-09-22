const express = require('express');
const router = express.Router();

// All events in databse
router.get('/', async (req, res) => {
    try{
        const db = require('../models');
        const events = await db.Event.findAll();
        res.json(events);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// one event by id
router.get('/:id', async (req, res) => {
    try{
        const db = require('../models');
        const event = await db.Event.findByPk(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({error: 'Event not found'});
        }
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// create new event

router.post('/', async (req, res) => {
    try{
        const db = require('../models');
        const event = await db.Event.create(req.body);
        res.status(201).json(event);
    } catch (error) { res.status(500).json({error: error.message}); }
});

module.exports = router;