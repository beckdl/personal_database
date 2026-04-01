var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // navigate up from server/routes to project root where dist/personal_database/browser holds index
  res.sendFile(path.join(__dirname, '../../dist/personal_database/browser/index.html'));
});

module.exports = router;
