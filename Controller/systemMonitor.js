const si = require('systeminformation')

// class sysMonHandler{
//     constructor(){
//         this.cpu = si.cpu();
//         this.networkStat = si.networkStats();
//         this.diskLayout = si.diskLayout();
//         this.wifi = si.wifiNetworks();
//         this.disk = si.disksIO();
//         this.memory = si.mem();
//         this.memoryLayout = si.memLayout();
//         this.cpuCache = si.cpuCache();
//         this.cpuSpeed = si.cpuCurrentSpeed();
//         this.cpuFlags = si.cpuFlags();
//         this.cpuTemp = si.cpuTemperature();
//         si.wifiConnections();
//         si.wifiInterfaces();
        
//     }
    
// }

class GPU{
    constructor(utilization,memory,total_memory,temperature,name){
        this.utilization = [utilization];
        this.memory = [memory];
        this.total_memory = total_memory;
        this.temperature = temperature;
        this.name = name;
    }
    add(utilization,memory,temperature){
        this.utilization.push(utilization);
        this.memory.push(memory);
        this.temperature = temperature;
    }
    remove_one(){
        this.utilization.shift();
        this.memory.shift();
    }
};

class GPUManager{
    constructor(){
        this.GPUs = []

    }
    init(pure_json){
        let ob = JSON.parse(pure_json);
        ob["gpus"].forEach(element => {
                    let memory =element["memory.used"]/element["memory.total"]; 
                    this.GPUs.push(
                        new GPU(element["utilization.gpu"],memory,element["memory.total"],element["temperature.gpu"],element["name"])
                    )
                    });
    }
    update(pure_json){
        let ob = JSON.parse(pure_json);
        for(let i=0; i<ob["gpus"].length; i++){
            let memory =ob["gpus"][i]["memory.used"]/ob["gpus"][i]["memory.total"]; 
            
            this.GPUs[i].add(ob["gpus"][i]["utilization.gpu"],memory,ob["gpus"][i]["temperature.gpu"]);
            if (this.GPUs[i].memory.length>60) this.GPUs[i].remove_one();
        }
    }
    getGPUdata(){return this.GPUs;}


}
class CPUManager{
    constructor(){
        this.name = "";
        this.cores = 0;
        this.virtualization = false;
        this.coresUsage = [];//get all cores speed divided by max
        this.coresTemperature = [];
        this.physicalCores = 0;
        this.cores = 0;
        this.Usage = 1;
        this.temperature = 0.0;
        this.averageSpeed= 0.0;

    }
    async init(cb){
        await si.cpu((data)=>{
            this.name = data.manufacturer + data.brand;
            this.maxSpeed = data.speedMax;
            this.virtualization = data.virtualization;
            this.cores= data.cores;
            this.physicalCores = data.physicalCores;
            
        });
        
        //TODO: get all needed data.
        await si.currentLoad((data)=>{
                for(let i=0;i<data.cpus.length;i++){
                   this.coresUsage.push([]);
                }
                for(let i=0;i<data.cpus.length;i++){
                    this.coresUsage[i].push(data.cpus[i].load);
                }
           
            this.Usage = data.currentLoad;
        });
        await si.cpuTemperature((data)=>{
                for(let i=0;i<data.cores.length;i++){
                    this.coresTemperature.push([]);
                }
                for(let i=0;i<data.cores.length;i++){
                    this.coresTemperature[i].push(data.cores[i]);
                }
            this.temperature = data.main;
        });

    }
    async update(){
        await si.currentLoad((data)=>{
            for(let i=0;i<data.cpus.length;i++){
                this.coresUsage[i].push(data.cpus[i].load);
                if (this.coresUsage[i].length>60){
                    this.coresUsage[i].shift();
                };
                this.Usage = data.currentLoad;
            }
        });
        await si.cpuTemperature((data)=>{
            for(let i=0;i<data.cores.length;i++){
                this.coresTemperature[i].push(data.cores[i]);
                if (this.coresTemperature[i].length>60){
                    this.coresTemperature[i].shift();
                };
            }
            this.temperature = data.main;
        });
    }
}
class MemoryManager{
    constructor(){
        this.name = "";
        this.cores = 0;
        this.virtualization = false;
        this.coresUsage = [];//get all cores speed divided by max
        this.coresTemperature = [];
        this.physicalCores = 0;
        this.cores = 0;
        this.Usage = 1;
        this.temperature = 0.0;
        this.averageSpeed= 0.0;

    }
    async init(cb){
        await si.cpu((data)=>{
            this.name = data.manufacturer + data.brand;
            this.maxSpeed = data.speedMax;
            this.virtualization = data.virtualization;
            this.cores= data.cores;
            this.physicalCores = data.physicalCores;
            
        });
        
        //TODO: get all needed data.
        await si.currentLoad((data)=>{
                for(let i=0;i<data.cpus.length;i++){
                   this.coresUsage.push([]);
                }
                for(let i=0;i<data.cpus.length;i++){
                    this.coresUsage[i].push(data.cpus[i].load);
                }
           
            this.Usage = data.currentLoad;
        });
        await si.cpuTemperature((data)=>{
                for(let i=0;i<data.cores.length;i++){
                    this.coresTemperature.push([]);
                }
                for(let i=0;i<data.cores.length;i++){
                    this.coresTemperature[i].push(data.cores[i]);
                }
            this.temperature = data.main;
        });

    }
    async update(){
        await si.currentLoad((data)=>{
            for(let i=0;i<data.cpus.length;i++){
                this.coresUsage[i].push(data.cpus[i].load);
                if (this.coresUsage[i].length>60){
                    this.coresUsage[i].shift();
                };
                this.Usage = data.currentLoad;
            }
        });
        await si.cpuTemperature((data)=>{
            for(let i=0;i<data.cores.length;i++){
                this.coresTemperature[i].push(data.cores[i]);
                if (this.coresTemperature[i].length>60){
                    this.coresTemperature[i].shift();
                };
            }
            this.temperature = data.main;
        });
    }
}
module.exports = {GPUManager,GPU,CPUManager}