const mongoose = require('mongoose');

const noiseDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 150
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  source: {
    type: String,
    enum: ['traffic', 'construction', 'ambient', 'restaurant', 'other'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  deviceInfo: {
    type: String,
    required: false
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

// Create geospatial index for location
noiseDataSchema.index({ location: '2dsphere' });

// Create compound index for efficient queries
noiseDataSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('NoiseData', noiseDataSchema); 