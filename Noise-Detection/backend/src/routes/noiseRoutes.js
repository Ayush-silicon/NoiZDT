const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const noiseController = require('../controllers/noiseController');

// Record new noise data
router.post('/record', auth, noiseController.recordNoise);

// Get noise data for a specific area
router.get('/area', noiseController.getAreaNoiseData);

// Get user's noise history
router.get('/history', auth, noiseController.getUserNoiseHistory);

// Get noise statistics for an area
router.get('/statistics', noiseController.getNoiseStatistics);

module.exports = router; 