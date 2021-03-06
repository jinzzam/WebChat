var express = require('express');
var connection = require('../public/javascripts/dbconnection');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('join', {title: 'Join'});
});

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var birthday = req.body.birthday;
    var number = req.body.number;
    var id = req.body.user_id;
    var password = req.body.user_pw;
    var verifypw = req.body.verify_pw;

    if (password == verifypw) {
        //회원가입 성공
        var insertsql = 'insert into user values(\'' + name + '\', \'' + birthday + '\', \'' + number + '\', \'' + id + '\', \'' + password + '\')';

        connection.query(insertsql, function (err, rows, fields) {
            if (!err)
                console.log('The solution is ', rows);
            else
                console.log('Error while performing Query.', err);

        });
        connection.end();
        res.redirect('/join');
    } else {
        res.redirect('/join-fail');
    }

    console.log(req.body);
});

module.exports = router;