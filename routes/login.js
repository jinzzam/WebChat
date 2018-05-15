var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/', function (req, res, next) {
    console.log(req.body);

    var id = req.body.user_id;
    var password = req.body.user_pw;

    console.log(id);
    console.log(password);

    res.redirect('/');
});

module.exports = router;

