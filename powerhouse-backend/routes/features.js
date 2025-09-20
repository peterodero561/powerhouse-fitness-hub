const express = require('express');
const router = express.Router();
const {upload} = require('./uploads');
const featureController = require('../controllers/featureController');

router.post('/', upload.array('images', 5), featureController.createFeature);
router.get('/', featureController.getAllFeatures);
router.put('/:id', featureController.updateFeature);
router.delete('/:id', featureController.deleteFeature);

module.exports = router;