var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/work');
});

router.get('/work', function(req, res, next) {
  res.render('work', { title: 'SHIFT Workbench' });
});

module.exports = router;
