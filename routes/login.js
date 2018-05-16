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

    console.log(id);
    console.log(password);

    var selectpwsql = 'select password from user where id=?';

    connection.query(selectpwsql, id, function (err, rows, fields) {
        console.log('rows :  ', rows[0].password);
        console.log('fields : ', fields);
        if (rows != null) {
            if (rows[0].password == password) {
                //로그인 성공
                //res.redirect('/index');
                res.render('index', { title: 'Express' });
            } else {
                //비밀번호 불일치
                res.redirect('/unmatched-pw');
            }
        } else {
            //정보가 존재하지 않는다
            res.redirect('/no-id');
        }
    })
});

module.exports = router;

