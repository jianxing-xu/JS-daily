import readline from 'node:readline';
import fs from 'node:fs';
import { stdin } from 'node:process';
import path, { dirname } from 'node:path';
import { URL } from 'node:url';

const rl = readline.createInterface({
  input: stdin
});
const dirpathname = dirname(new URL(import.meta.url).pathname);
const writer = fs.createWriteStream('./write_text.txt');
rl.on('line', line => {
  console.log(line);
  if (line.startsWith('end')) {
    rl.close();
    writer.end()
    return;
  }
  writer.write(line + '\n');
});


