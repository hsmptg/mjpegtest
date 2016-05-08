# mjpegtest
**Let's test MJPEG streaming...**

This project streams live video from a Raspberry Pi camera to a Webpage using **MJPEG**.

It is composed of 2 node.js programs:
- *`mjpegstreamer`* that creates a mjpeg stream at port 8080
- *`webserver`* that implements the server of the webpage at port 3000

## Instalation
Since the *`mjpegstreamer`* invoques Python3 script *`camera.py`* we need to install the *`picamera`*  module used by it. For that execute:
* `sudo apt-get install python3-pip`
* `sudo pip3 install picamera`

Next we need to clone the project from GitHub and install the dependencies:
* `git clone https://github.com/hsmptg/mjpegtest.git`
* `cd mjpegtest`
* `npm --prefix mjpegstreamer install`
* `npm --prefix webserver install`

## Execution
Start by executing (in backgroud) the Web server
* `node webserver/index.js &`

Then execute the MJPEG streamer:
* `cd mjpegstreamer`
* `node app.js`

## Testing
To see the webpage with the live stream, just open the following link:
* `http://<raspberry_pi_IP>:3000`
