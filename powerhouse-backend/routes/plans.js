const express = require('express');
const router = express.Router();
const db = require('../models');

// get all plans from datase
router.get('/', async (req, res) => {
    try{
        const plans = await db.Plan.findAll();
        res.json(plans);
    } catch (e) { res.status(500).json({error: e.message}); }
});

module.exports = router;