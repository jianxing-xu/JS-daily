import fs from 'fs';
const writer = fs.createWriteStream('./log');
function log(msg) {
  writer.write(msg);
}

log('hello world');
