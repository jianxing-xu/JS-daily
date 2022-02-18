import Worker from "worker_threads";
const worker = new Worker("web-worker.js");
worker.onmessage = e => {
  console.log("From Worker Msg: ", e);
}


setTimeout(() => {
  worker.postMessage("Post to Worker Msg !");
}, 2000)