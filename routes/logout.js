var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/', function (req, res, next) {
    const session = req.session;
    session.remove();

    res.redirect('/');
})

module.exports = router;