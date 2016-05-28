'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express2.default.Router();

router.get('/get/:id', (req, res) => {
    console.log('get project: ' + req.params.id);
    var project = {
        title: '***',
        id: req.params.id,
        content: 'Hahahaha...'
    };
    res.json(project);
});

router.post('/deploy', (req, res) => {
    console.log('deploy:', JSON.stringify(req.body));
    res.json(req.body);
});

module.exports = router;