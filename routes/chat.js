var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('chat');
});

router.post('/', function (req, res, next) {
    res.render('chat');
});

router.post('/:filename', function (req, res, next) {
    upload(req, res).then(function (file) {
        res.json(file);
    }, function (err) {
        res.send(500, err);
    });
});
module.exports = router;
