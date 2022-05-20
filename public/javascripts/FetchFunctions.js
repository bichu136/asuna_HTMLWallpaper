async function getChildrenFolder(dir,cbReturn){
    //create request
    let Init = {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:'{"folder":"'+dir+'" }'
    }
    console.log(Init.body);
    let result = "";
    let ok = await fetch("/folder",Init).then(function(res){return res.json();}).then((final)=>{result= final[0];});
    cbReturn(result);
    return result;
}
async function getGPUStat(){
    let Init = {
        method:"POST",
        headers:{"Content-Type": "application/json"}
    }
    let gpu_info =null;
    //getting 1 gpu
    let ok = await fetch("/gpustat",Init).then(function(res){return res.json();}).then((final)=>{gpu_info= final});
    let info = {
        "memory"    : gpu_info[0]["memory"],
        "memory_total"   : gpu_info[0]["total_memory"],
        "temperature": gpu_info[0]["temperature"],
        "utilization":gpu_info[0]["utilization"],
        "name"           :gpu_info[0]["name"]
    };
    return info;
}
async function getCPUStat(){
    let Init = {
        method:"POST",
        headers:{"Content-Type": "application/json"}
    }
    let cpu_info =null;
    //getting 1 gpu
    let ok = await fetch("/cpustat",Init).then(function(res){return res.json();}).then((final)=>{cpu_info= final});
    return cpu_info;
}
async function getRAMStat(){

}
async function getBandWidth(){

}
async function getTopUsingCPU(){
    
}