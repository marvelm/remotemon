const PORT = 40001;
const THRESHOLD = 5000;

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

var last_message = -1;
server.on('message', (msg, rinfo) => {
  last_message = Date.now();
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

setInterval(() => {
  if (Date.now() - last_message > THRESHOLD) {
    console.log("Client is dead ", new Date());
  }
}, THRESHOLD);

server.bind(PORT);
