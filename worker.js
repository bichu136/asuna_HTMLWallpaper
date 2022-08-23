const {
    Worker, isMainThread, parentPort, workerData,MessageChannel,MessagePort
} = require('worker_threads');
const assert = require('assert');
const {exec }= require('child_process');
const { GPUManager, GPU,CPUManager,MemoryManager } = require('./Controller/systemMonitor');
let timeoutList = []

if (isMainThread) {
    console.log("hi")
    var gpuManager = new GPUManager();
    var cpuManager = new CPUManager();
    var memoryManager = new MemoryManager();
    let w = new Worker(__filename,{workerData});
    // send port to worker.
    // let worker using these port
    let gpuChannels = new MessageChannel();
    let cpuChannels = new MessageChannel();

    w.postMessage({
                    gpuTrans: gpuChannels.port1,
                    cpuTrans: cpuChannels.port1
                  },[gpuChannels.port1,cpuChannels.port1]);
    gpuChannels.port2.on("message", result => {
        //TODO: 
        if (gpuManager.GPUs.length==0){
            gpuManager.init(result)
        }else{
            gpuManager.update(result)
        }
        if (cpuManager.name==""){
            cpuManager.init()
        }else{
            cpuManager.update()
            
        }
        if (memoryManager.total == 0){
            memoryManager.init();
        }
        else{
            memoryManager.update();
        }

    });

    w.on("error", error => {
        console.log(error);
    });

    w.on("exit", exitCode => {
        console.log(`It exited with code ${exitCode}`);
    })

    console.log("Execution in main thread");
    console.log("end")
    module.exports = {gpuManager,cpuManager,memoryManager}
} else {
    parentPort.once('message', (value) => {
        assert( value.gpuTrans instanceof MessagePort);
        assert( value.cpuTrans instanceof MessagePort);
        let gpuTrans = value.gpuTrans;
        setInterval(()=>{
            //do all background work.

            //gpu 
            let command = "gpustat --json";
            exec(command,(err,stdout,stderr)=>{
                    gpuTrans.postMessage(stdout);
                });
            //cpu
            
        },1000);        
      });
    

    // parentPort.postMessage("great");
    // parentPort.postMessage("great");
}
  