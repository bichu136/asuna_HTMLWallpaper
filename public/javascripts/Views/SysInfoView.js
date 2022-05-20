// TODO: USING SVG TO GRAPH.
// TODO: only send request to update graph while order: 1;


class CPUInfo extends HTMLElement{
    // TODO:
    // + graphs for temp, storage, ultilization of CPU.
    // + make a pop up to check for what process using CPU.
    static b = false;
    static interval =null;
    constructor(){
        super();
        //events
        this.onmouseover = function(e){
            let that = this
            console.log("update");
            if (!CPUInfo.b){
                CPUInfo.interval = setInterval(async function(){
                    //TODO: getting gpu data and update.
                    let cpu_info = await getCPUStat();
                    if (that.hasChildNodes()){
                        that.Update(cpu_info,()=>{});
                    }
                },1000);
                CPUInfo.b=true;
            }
            
        }
        this.onmouseleave = function(e){
            clearInterval(CPUInfo.interval);
            CPUInfo.b=false;
        }
    }
    FetchInterval(_type,time){
        console.log("fetching from CPU");
    }
    Init(){
        //set class
        //temp graph, percent graph for all core.
        let name_h2 = document.createElement('h2');
        let cores_p = document.createElement('p');
        let Usage_h3 = document.createElement('h3');
        let temperature_h3 = document.createElement('h3');
        name_h2.textContent = "name:";
        cores_p.textContent = "Cores: phys_Cores: ";
        Usage_h3.textContent = "Usage: ";
        temperature_h3.textContent = "Temperature:";
        //create div and canvas for memory
        let Usage_div = document.createElement('div');
        Usage_div.className = "graph";
        let Usage_canvas = document.createElement('canvas');
        Usage_div.appendChild(Usage_canvas);
        Usage_canvas.id = "cpu_usage_canvas";
        Usage_canvas.className = "canvas";
        Usage_canvas.height = 100; 
        Usage_canvas.width = 500;
        //create div and canvas for utilization
        let temperature_div = document.createElement('div');
        temperature_div.className = "graph";
        let temperature_canvas = document.createElement('canvas');
        temperature_div.appendChild(temperature_canvas);
        temperature_canvas.id = "cpu_temperature_canvas";
        temperature_canvas.className = "canvas";
        temperature_canvas.height = 100; 
        temperature_canvas.width = 500;
        this.appendChild(name_h2);
        this.appendChild(cores_p);
        this.appendChild(Usage_h3);
        this.appendChild(Usage_div);
        this.appendChild(temperature_h3);
        this.appendChild(temperature_div);
        let cpu_info = null;

        getCPUStat().then(final =>{cpu_info = final;})
        let that = this
        setTimeout(()=>{
            if (cpu_info ==null){
                console.log("cannot get initial data");
            }
            else{
                this.Update(cpu_info,function(){
                    that.children[0].textContent ="Name: " +cpu_info["name"];
                    //cores
                    that.children[1].textContent ="cores: "+ cpu_info["cores"];
                });
            }
        },250)
    }
    Update(cpu_info,cb){
        //name       
        //memory
        this.children[2].textContent ="Usage: "+cpu_info["Usage"].toFixed(3)+"%";
        this.children[4].textContent = "Temperature:"+cpu_info["temperature"].toFixed(3);
        let usage_canvas = document.getElementById('cpu_usage_canvas');
        let temperature_canvas = document.getElementById('cpu_temperature_canvas');

        drawGraph2(usage_canvas,cpu_info["coresUsage"]);
        drawGraph2(temperature_canvas,cpu_info["coresTemperature"]);
        cb();

    }
    AddButton(hardware_container, swapped){
        //TODO: Add button to move to container, swap container with the container with order:1;

    }
};


class GPUInfo extends HTMLElement{
    // TODO:
    // + graphs for temp, storage, ultilization of GPU.
    // + make a pop up to check for what process using GPU.
    static b = false;
    static interval =null;
    constructor(){
        super();
        //events
        this.onmouseover = function(e){
            let that = this
            console.log("update");
            if (!GPUInfo.b){
                GPUInfo.interval = setInterval(async function(){
                    //TODO: getting gpu data and update.
                    let gpu_info = await getGPUStat();
                    if (that.hasChildNodes()){
                        that.Update(gpu_info);
                    }
                },1000);
                GPUInfo.b=true;
            }
            
        }
        this.onmouseleave = function(e){
            clearInterval(GPUInfo.interval);
            GPUInfo.b=false;
        }
    }
    Update(gpu_info){
        this.children[0].textContent ="Name: " +gpu_info["name"];
        this.children[1].textContent ="Temperature: "+ gpu_info["temperature"];

        this.children[2].textContent ="Memory: "+gpu_info["memory_total"];
        let ult_canvas = document.getElementById('gpu_ult_canvas');
        let mem_canvas = document.getElementById('gpu_mem_canvas');

        drawGraph(ult_canvas,gpu_info["utilization"]);
        for(let i = 0;i<gpu_info["memory"].length;i++){
            gpu_info["memory"][i] = gpu_info["memory"][i] *100 ;
        }
        drawGraph(mem_canvas,gpu_info["memory"]);
        
    }
    FetchInterval(_type,time){
        console.log("fetching from GPU");
        
    }
    Init(){
        let name_h2 = document.createElement('h2');
        let tempurature_p = document.createElement('p');
        let memory_h3 = document.createElement('h3');
        let ultilization_h3 = document.createElement('h3');
        name_h2.textContent = "name:";
        tempurature_p.textContent = "tempurature:";
        memory_h3.textContent = "Memory: "
        ultilization_h3.textContent = "Ultilization"
        //create div and canvas for memory
        let mem_div = document.createElement('div');
        mem_div.className = "graph";
        let mem_canvas = document.createElement('canvas');
        mem_div.appendChild(mem_canvas);
        mem_canvas.id = "gpu_mem_canvas";
        mem_canvas.className = "canvas";
        mem_canvas.height = 100; 
        mem_canvas.width = 500;
        //create div and canvas for utilization
        let util_div = document.createElement('div');
        util_div.className = "graph";
        let util_canvas = document.createElement('canvas');
        util_div.appendChild(util_canvas);
        util_canvas.id = "gpu_ult_canvas";
        util_canvas.className = "canvas";
        util_canvas.height = 100; 
        util_canvas.width = 500;
        this.appendChild(name_h2);
        this.appendChild(tempurature_p);
        this.appendChild(memory_h3);
        this.appendChild(mem_div);
        this.appendChild(ultilization_h3);
        this.appendChild(util_div);
        let gpu_info = null;

        getGPUStat().then(final =>{gpu_info = final;})

        setTimeout(()=>{
            if (gpu_info ==null){
                console.log("cannot get initial data");
            }
            else{
                this.Update(gpu_info);
            }
        },250)
    }
    AddButton(hardware_container){
        //TODO: Add button to move to container, swap container with the container with order:1;
        
    }
};
class WifiInfo extends HTMLElement {
    // TODO:
    // + list of connectable wifi.
    // + connect to another wifi.
    constructor(){
        super();
        //events
    }

    FetchInterval(_type,time){
        console.log("fetching from Wifi");
    }
    Init(){
        //set class
        // init all the div necessary for elements.
    }
    AddButton(hardware_container){
        //TODO: Add button to move to container, swap container with the container with order:1;
        
    }

};
class RAMInfo extends HTMLElement {
    //TODO:
    // + graph for RAM usage.
    // + make a pop up to check for what App using how much bytes of RAMs.
    constructor(){
        super();
        //events
    }
    FetchInterval(_type,time){
        console.log("fetching from RAM");
    }
    Init(){
        //set class
        // init all the div necessary for elements.
    }
    AddButton(hardware_container){
        //TODO: Add button to move to container, swap container with the container with order:1;
        
    }
};

class NetworkInfo extends HTMLElement {
    //TODO:
    // + graph for a last minute upload/download bits.
    // + make a pop up for what up using network.
    constructor(){
        super();
        //events
    }
    
    FetchInterval(_type,time){
        console.log("fetching from Network");
    }
    Init(){
        //set class
        // graph for upload/download in 1 min. server save data while running.
        // total download/upload
    }
    AddButton(hardware_container){
        //TODO: Add button to move to container, swap container with the container with order:1;
        
    }
};
class DiskInfo extends HTMLElement {
    constructor(){
        super();
        //events
    }
    
    FetchInterval(_type,time){
        console.log("fetching from Network");
    }
    Init(){
        // set html class
        // TODO: a piece graph for disks usage. FileLight every hour on server?
        // TODO: button to run FileLight and have a updated FileLight.
        // TODO: change free space in months(if we use for months.)?
    }
    AddButton(hardware_container){
        //TODO: Add button to move to container, swap container with the container with order:1;
        
    }
};

window.customElements.define("cpu-info",CPUInfo);
window.customElements.define("gpu-info",GPUInfo);
window.customElements.define("wifi-info",WifiInfo);
window.customElements.define("ram-info",RAMInfo);
window.customElements.define("network-info",NetworkInfo);
