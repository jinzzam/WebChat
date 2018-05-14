var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/login', function (req, res, next) {
    console.log(req.body);

    var id = req.body.id;
    var password = req.body.pw;

    console.log(id);
    console.log(password);

    res.redirect('/');
});

module.exports = router;

