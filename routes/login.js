var express = require('express');
var connection = require('../public/javascripts/dbconnection');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const session = req.session;

    if (session.islogin == true) {
        res.render('index', {title: 'title'});
    }

    res.render('login', {title: 'Login'});
});

router.post('/', function (req, res, next) {
    const session = req.session;


    console.log(req.body);

    var user_id = req.body.user_id;
    var user_pw = req.body.user_pw;

    session.user_id = user_id;
    session.user_pw = user_pw;
    console.log(session);

    var selectpwsql = 'select password from user where id=?';

    connection.query(selectpwsql, user_id, function (err, rows, fields) {

        if (session.islogin == true) {
            res.render('index', {title: 'title'});
        }
        console.log('rows[0] : ', rows[0]);
        if (rows[0] == null) {
            res.redirect('/no-id');
        } else {
            if (rows[0].password == user_pw) {
                //로그인 성공
                session.islogin = true;
                res.render('index', {title: 'Login success!'});
            } else {
                //비밀번호 불일치
                res.redirect('/unmatched-pw');
            }
        }
    });
    connection.end();
});

module.exports = router;

