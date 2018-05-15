var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'mydb'
});

connection.connect();

connection.query('select * from user', function (err, rows, fields) {
    if (!err)
        console.log('The solution is ', rows);
    else
        console.log('Error while performing Query.', err);
});

connection.end();