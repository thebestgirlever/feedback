var express = require('express');
var router = express.Router();
var data = require('./data.json')

router.get('/', function(req, res, next) {
  res.json(data.categoryList);
});

module.exports = router;
