const { Buffer } = require('node:buffer');


// const buf = buffer.Buffer.from('Hello World');

// console.log(buf.toString('hex'))
// console.log(buf.toString('base64'))
// console.log(buf.toString('ascii'))
// console.log(buf)

// // 超过16进制的字符会被截断
// const buf1 = buffer.Buffer.from('123ag123', 'hex')
// console.log(buf1);


// const bufarr = buffer.Buffer.from([1, 2, 3, 5, 1288])
// const u8arr = new Uint8Array(bufarr);
// console.log(u8arr);



// const oBlob = new buffer.Blob(["Hello world"]);
// // oBlob.arrayBuffer().then(value => {
// //   console.log(value);
// // })
// console.log(oBlob.size)
// console.log(oBlob.slice(0, 6, 'hex'))
// // const oBlobReadable = oBlob.stream()
// // oBlobReadable
// oBlob.text().then(v => console.log(v))
// console.log('blobType:', oBlob.type);


// console.log("初始化buffer： ", Buffer.alloc(4).write("init"))

// write
// const buf = Buffer.alloc(10);
// buf.write("Hey!");
// buf.write(" Jackson!")
// console.log(buf.toString());
// copy
const buf = Buffer.from("Hello");
const buf_bak = Buffer.alloc(5);
buf.copy(buf_bak, 2, 0, 5);
console.log(buf_bak, buf_bak.toString())
