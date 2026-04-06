var mongoose = require('mongoose');
var schema = mongoose.Schema;

var noteSchema = new schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  note: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteSchema);