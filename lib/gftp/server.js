const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
});
server.on('error', (err) => {
  throw err;
});

server.listen(2100, 'localhost', 1, () => {
    console.log('server bound');
  });
