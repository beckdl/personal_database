var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var noteModel = require('../models/note');

/* GET all notes */
router.get('/notes', function(req, res, next) {
  noteModel.find(function(err, notes) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(notes);
    }
    });
});

module.exports = router;

