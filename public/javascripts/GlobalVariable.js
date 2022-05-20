var SvgHome=document.getElementById("svg-home");
var SvgPerson=document.getElementById("svg-person");
var SvgFolder=document.getElementById("svg-folder");
var SvgHardware=document.getElementById("svg-hardware");
var SvgTaskList=document.getElementById("svg-task-list");

function drawGraph(canvas,arr){
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    let x = 0
    let c = 0;
    ctx.moveTo(canvas.width-20,canvas.height);
    while(arr.length>0){
        x = arr.pop();
        if (c==0){
            ctx.lineTo(canvas.width-c*8-20,canvas.height-x);
        }
        else{
            ctx.lineTo(canvas.width-c*8-20,canvas.height-x);
        }
        c++;
        // if (c==59)
        //     break;
    }
    ctx.lineTo(canvas.width-59*8-20,canvas.height)
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function drawGraph2(canvas,arr){
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    colors = ["#FF0000","E9783D","#3DAEE9","#4D3DE9","#CE3DE9","#E93D83","#D9E93D","#58E93D","#3DE9A3"]
    let t = arr.shift();
    let i =0;
    while(t){
        
            ctx.strokeStyle = colors[i];
            ctx.fillStyle = colors[i]+"40";
            ctx.beginPath();
            let x = 0
            let c = 0;
            ctx.moveTo(canvas.width-20,canvas.height);
            while(t.length>0){
                x = t.pop();
                if (c==0){
                    ctx.lineTo(canvas.width-c*8-20,canvas.height-x);
                }
                else{
                    ctx.lineTo(canvas.width-c*8-20,canvas.height-x);
                }
                c++;
                // if (c==59)
                //     break;
            }
            ctx.lineTo(canvas.width-59*8-20,canvas.height)
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        i+=1;
        t = arr.shift();
    }
    
    
}
function drawGraph3(canvas,arr){
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    colors = ["#FF0000","E9783D","#3DAEE9","#4D3DE9","#CE3DE9","#E93D83","#D9E93D","#58E93D","#3DE9A3"]
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FF0000"+"40";
    ctx.beginPath();
    let x = 0;
    let c = 0;
    ctx.moveTo(canvas.width-20,canvas.height);
    console.log(arr)
    while(arr.length>0){
        x = arr.pop();
        console.log(x);
        if (c==0){
            ctx.lineTo(canvas.width-c*8-20,canvas.height-(x/150)*100);
        }
        else{
            ctx.lineTo(canvas.width-c*8-20,canvas.height-(x/150)*100);
        }
        c++;
        // if (c==59)
        //     break;
    }
    ctx.lineTo(canvas.width-59*8-20,canvas.height)
    ctx.stroke();
    ctx.fill();
    ctx.closePath();    
}