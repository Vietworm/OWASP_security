"use strict";

var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded());

// eval function allow inject command
app.post('/run', function (req, res) {
    eval(req.body.cmd);
    res.json('Command executed!');
});

app.listen(1337);