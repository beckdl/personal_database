var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fileSchema = new schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  item: { type: mongoose.Schema.Types.Mixed, required: true },
  description: { type: String},
});

module.exports = mongoose.model('File', fileSchema);