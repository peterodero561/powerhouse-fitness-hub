const getFeatureModel = () => {
  const db = require('../models');
  if (!db.feature) {
    throw new Error("Feature model not found in database instance");
  }
  return db.feature
}

// Create new feature
exports.createFeature = async (req, res) => {
  try {
    const Feature = getFeatureModel();
    const { title, description, images } = req.body;

    const feature = await Feature.create({ title, description, images });
    res.status(201).json(feature);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all features
exports.getAllFeatures = async (req, res) => {
  try {
    const Feature = getFeatureModel();
    const features = await Feature.findAll();
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update feature
exports.updateFeature = async (req, res) => {
  try {
    const Feature = getFeatureModel();
    const [updated] = await Feature.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedFeature = await Feature.findByPk(req.params.id);
      res.json(updatedFeature);
    } else {
      res.status(404).json({ error: 'Feature not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete feature
exports.deleteFeature = async (req, res) => {
  try {
    const Feature = getFeatureModel();
    const deleted = await Feature.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Feature not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};