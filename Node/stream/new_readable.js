// const { stdout, stdin, stderr } = require('process');
// const { Readable, Writable } = require('stream');

// // new readable
// const readable = new Readable({
//   read() { }
// })

// readable.push("Hey");
// readable.push("Ho");


// // new writeable
// const writeable = new Writable({
//   write(chunk, encoding, next) {
//     console.log(chunk.toString());
//     next();
//   }
// })

// readable.pipe(writeable);

// == 通知结束可写流
const Stream = require('stream')

const readableStream = new Stream.Readable({
  read() { }
})
const writableStream = new Stream.Writable()

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}

readableStream.pipe(writableStream)

readableStream.push('hi!')
readableStream.push('ho!')

writableStream.end()
