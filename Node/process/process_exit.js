console.log('listening...');
setTimeout(() => {
  console.log(process.memoryUsage())
  process.exit(1);
}, 3000)
// while (true) {

// }