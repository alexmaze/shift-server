import express from 'express';

let router = express.Router();

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
