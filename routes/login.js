var express = require('express');
var connection = require('../public/javascripts/dbconnection');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/', function (req, res, next) {
    console.log(req.body);

    var id = req.body.user_id;
    var password = req.body.user_pw;

    var selectpwsql = 'select password from user where id=?';

    connection.query(selectpwsql, id, function (err, rows, fields) {
        if (rows[0] == null) {
            res.redirect('/no-id');
        } else {
            if (rows[0].password == password) {
                //로그인 성공
                res.render('index', {title: 'Login success!'});
            } else {
                //비밀번호 불일치
                res.redirect('/unmatched-pw');
            }
        }
    })
    connection.end();
});

module.exports = router;

