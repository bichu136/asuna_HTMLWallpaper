const {exec }= require('child_process');
const { Worker, isMainThread, workerData, parentPort } = require('worker_threads');
class GPU{
    constructor(utilization,memory,total_memory,temperature,name){
        this.utilization = [utilization];
        this.memory = [memory];
        this.total_memory = total_memory;
        this.temperature = temperature;
        this.name = name;
    }
    add(utilization,memory,temperature){
        this.utilization.append(utilization);
        this.memory.append(memory);
        this.temperature = temperature;
        if (this.utilization.length>60) this.utilization.unshift();
        if (this.memory.length>60) this.memory.unshift();
    }
}
parentPort.postMessage(workerData);
// let GPUs = [];

// async function getGPUInfo(callback){
//     // let obj = JSON.parse(input);
    
//     // return input;
//     let k = null;
//     let command = "gpustat --json";
//     exec(command,(err,stdout,stderr)=>{
//         k = JSON.parse(stdout);
//     },()=>{callback(k)});

    

// }
// getGPUInfo((k)=>{GPUs = k["gpus"]});

//console.log(GPUs);
// function startGPU(GPUs){
//     let GPUInterval     = setInterval(function(){
    
    
//         getGPUInfo((k)=>{
//             if (GPUs == []){
//                 k["gpus"].forEach(element => {
//                     let memory =element["memory.used"]/element["memory.total"]; 
//                     console.log("add")
//                     GPUs.append(
//                         new GPU(element["utilization.gpu"],memory,element["memory.total"],element["temperature.gpu"],element["name"])
//                     )
//                 });
//             }else{
//                 GPUs.forEach(element=>{
//                     let memory =element["memory.used"]/element["memory.total"]; 
//                     element.add(element["utilization.gpu"],memory,element["temperature.gpu"]);
//                 })
//             }
//         });
    
//     },500);
// }

// let CPUInterval     = setInterval();
// let RAMInterval     = setInterval();
// let NetworkInterval = setInterval();
// let DiskInfo        = setInterval();
// let WifiInfo        = setInterval();

// module.exports = {GPUs,startGPU}