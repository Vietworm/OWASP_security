"use strict";

var express    = require('express');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: '',
    database: 'owasp_security'
});

connection.connect(function(err) {
    if (err) {
        console.log('error connecting: ' + err.stack);
    } else {
        console.log('connected as id ' + connection.threadId);
    }
});

var app = express();

app.use(bodyParser.urlencoded());

// vuln SQL Injection
app.post('/login', function (req, res) {

    var user = req.body.user;
    var pass = req.body.pass;
    var sql  = "SELECT * FROM users WHERE user = '" + user + "' AND pass = '" + pass + "'";

    console.log(sql);
    connection.query(sql, function(err, results) {
        res.json(results);
    });
});

app.listen(1337);
