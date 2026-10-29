const http = require('http');

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 755,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:755' }
  };

  const proxy = http.request(options, targetRes => {
    res.writeHead(targetRes.statusCode, targetRes.headers);
    targetRes.pipe(res, { end: true });
  });

  proxy.on('error', err => {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bridge error: ' + err.message);
  });

  req.pipe(proxy, { end: true });
});

server.listen(3000, () => {
  console.log('Bridge listening on port 3000 -> forwarding to port 755');
});
