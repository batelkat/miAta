const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  questionBody: { type: String, default: '' },
  questionRelevantNation:[Number],
  questionRelevantReligion: [Number],

});

module.exports = mongoose.model('SuggestedQuestion', questionSchema);