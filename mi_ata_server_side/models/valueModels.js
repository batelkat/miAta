const mongoose = require('mongoose');

const valueSchema = mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  nation:[Number],
  religion: [Number]
});

module.exports = mongoose.model('SuggestedValues', valueSchema);