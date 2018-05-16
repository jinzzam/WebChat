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

    var selectpwsql = 'select password from user where id=\'' + id + '\'';

    connection.query(selectpwsql, function (err, rows, fields) {
        if (!err) {
            //console.log('The solution is ', rows);
            if (rows != null) {
                if (rows == password) {
                    //로그인 성공
                    res.redirect('/index');
                } else {
                    //비밀번호 불일치
                    res.redirect('/unmatched-pw');
                }
            } else {
                //정보가 존재하지 않는다
                res.redirect('/no-id');
            }
        }
        else
            console.log('존재하지 않는 ID 입니다.', err);
    })
});

module.exports = router;

