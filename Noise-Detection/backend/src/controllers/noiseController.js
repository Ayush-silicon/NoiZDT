const NoiseData = require('../models/NoiseData');

// Record new noise data
exports.recordNoise = async (req, res) => {
  try {
    const { level, location, source, deviceInfo, metadata } = req.body;
    
    const noiseData = new NoiseData({
      userId: req.user._id,
      level,
      location: {
        type: 'Point',
        coordinates: location
      },
      source,
      deviceInfo,
      metadata
    });

    await noiseData.save();
    
    // Emit real-time update through Socket.IO
    req.app.get('io').emit('noise-update', noiseData);

    res.status(201).json(noiseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get noise data for a specific area
exports.getAreaNoiseData = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    
    const noiseData = await NoiseData.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) || 1000 // Default 1km radius
        }
      }
    }).sort({ timestamp: -1 }).limit(100);

    res.json(noiseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's noise history
exports.getUserNoiseHistory = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { userId: req.user._id };

    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const noiseData = await NoiseData.find(query)
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(noiseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get noise statistics for an area
exports.getNoiseStatistics = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    
    const stats = await NoiseData.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          distanceField: 'distance',
          maxDistance: parseInt(radius) || 1000,
          spherical: true
        }
      },
      {
        $group: {
          _id: null,
          averageLevel: { $avg: '$level' },
          maxLevel: { $max: '$level' },
          minLevel: { $min: '$level' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats[0] || { averageLevel: 0, maxLevel: 0, minLevel: 0, count: 0 });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 