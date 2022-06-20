const { Console } = require('node:console');
const fs = require('node:fs');
const output = fs.createWriteStream(__dirname + '/output.log');
const errOutput = fs.createWriteStream(__dirname + '/output_err.log');


const logger = new Console({ stdout: output, stderr: errOutput });



logger.log("hello %s", "world");


logger.error("this is %s", "error");

console.log('\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan
