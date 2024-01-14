var express = require('express');
var router = express.Router();
var data = require('./data.json')


const filter = (list = [], category = 'all', isLimited = false, isNew = false, search = '') => {
  const next = list
    .filter(item => category === 'all' || item.categoryType === category)
    .filter(item => isNew ? item.isNew : true)
    .filter(item => isLimited ? item.isLimited : true)
    .filter(item => search ?
      item.name.toLowerCase().includes(search.toLowerCase())
      || item.description.toLowerCase().includes(search.toLowerCase())
      || item.categoryType.toLowerCase().includes(search.toLowerCase())
      : true
    )

  return next
}

router.get('/', function (req, res, next) {
  const category = req.query.category
  const isLimited = req.query.isLimited === 'true'
  const isNew = req.query.isNew === 'true'
  const search = req.query.search

  res.json(filter(data.productList, category, isLimited, isNew, search));
});

module.exports = router;
