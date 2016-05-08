var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var os = require('os');
var ip = os.networkInterfaces().eth0.address;

app.get('/', function(req, res) {
    res.render('index', { IP: ip, port: "8080"});
});

app.listen(3000, function () {
    console.log('Access webpage at http://' + ip + ':3000');
});
