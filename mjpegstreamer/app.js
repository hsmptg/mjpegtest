var http = require('http');
var mjpegServer = require('mjpeg-server');

var spawn = require("child_process").spawn;
var python;

http.createServer(function(req, res) {
  // Parse our incoming URL.
  var url = require('url').parse(req.url, true);
  console.log(url);

  // Start the stream.
  if (url.query.stream == "start") {
    if (python == undefined) {
      // Init the mjpeg-server.
      reqHandler = mjpegServer.createReqHandler(req, res);

      // http://udgwebdev.com/node-js-para-leigos-child-process
      python = spawn('python',["camera.py"]);
      console.log('camera started.');

      var bufArray = [];
      python.stdout.on('data', function (data) {
        bufArray.push(data);
        var buf = Buffer.concat(bufArray);
        if (buf[0]==255 && buf[1]==216 && buf[buf.length-2]==255 && buf[buf.length-1]==217) {
          console.log(bufArray.length);
          reqHandler.update(buf);
          bufArray = [];
        }
      });

      python.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });
    } 
  }

  // Stop the stream.
  if (url.query.stream == "stop") {
    if (python != undefined) {
      // Stop the process.
      python.kill();
      console.log('camera stopped.');
      python = undefined;
    }
  }
}).listen(8080);
