var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },

});

module.exports = mongoose.model('User', userSchema);