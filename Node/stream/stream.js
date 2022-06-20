const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  console.log(__dirname + '/stream.js');
  // fs.readFile(__dirname + '/stream.js', (err, data) => {
  //   res.end(data); // 一次写入
  // })
  const stream = fs.createReadStream(__dirname + '/test_file.zip');
  stream.pipe(res);
});
server.listen(3000);