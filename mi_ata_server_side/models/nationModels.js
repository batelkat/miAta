const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  questionBody: { type: String, default: '' }
});

const knowledgeSchema = mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
});

const religionSchema = mongoose.Schema({
  name: { type: String, default: '' },
  suggestedQuestions: [questionSchema],
  knowledgeItems: [knowledgeSchema]
});

const nationSchema = mongoose.Schema({
  name: { type: String, default: '' },
  religion: [religionSchema]
});

module.exports = mongoose.model('Nation', nationSchema);
