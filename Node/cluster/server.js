const http = require('http');
const server = http.createServer((req, res) => {
  console.log('Handle req with pid: ', process.pid);
  res.end("hello world");
});
server.listen(3000);

process.on('message', msg => {
  console.log(`${process.pid} receive msg: ${msg}`)
})

setTimeout(() => {
  process.exit(1);
}, Math.random() * 10000)
