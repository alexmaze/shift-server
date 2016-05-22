var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res) {
    console.log('get project: ' + req.params.id);
    var project = {
        title: '***',
        id: req.params.id,
        content: 'Hahahaha...'
    };
    res.json(project);
});

router.post('/deploy', function(req, res) {
    console.log('deploy:', JSON.stringify(req.body));

    console.log(req.body.nodes);
    res.json(req.body);
});

module.exports = router;
