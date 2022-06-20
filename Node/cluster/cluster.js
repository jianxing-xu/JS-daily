// cluter.js
const cluster = require('node:cluster');
const os = require('os');
if (cluster.isPrimary) {
  const cpus = os.cpus().length;
  console.log('forking for ', cpus, ' CPUS');
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  Object.values(cluster.workers).forEach(worker => {
    worker.send("hello work")
  })
  // 监听工作进程崩溃自动开启新的工作线程
  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`工作进程 ${worker.id} 崩溃了，正在开始一个新的工作进程`);
      cluster.fork();
    }
  })
} else {
  require('./server.js');
}

