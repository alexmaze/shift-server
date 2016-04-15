var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/workbench', function(req, res, next) {
  res.render('workbench', { title: 'SHIFT Workbench' });
});

module.exports = router;
