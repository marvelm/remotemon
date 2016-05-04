const dgram = require("dgram");
const message = new Buffer("health_check");
const client = dgram.createSocket("udp4");

const PORT = 40001;
const THRESHOLD = 5000;
const REMOTE_ADDRESS = "localhost";
const interval = THRESHOLD / 10 | 0;

setInterval(() => {
  client.send(message, PORT, REMOTE_ADDRESS, err => {
    console.log("remote error: ", err);
  });
}, 200);
