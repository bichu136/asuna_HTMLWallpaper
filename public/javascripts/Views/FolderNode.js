class FolderNode extends HTMLElement{
    //TODO: 
    //  + make element<p> scroll while hover
    //  + subslider-scroll with drag
    //  + scroll view to the latest children.
    constructor(){
        super()
        let nameP = document.createElement('p');
        nameP.textContent = "";
        let subsliderContainer = document.createElement('div');
        subsliderContainer.className="subslider-container";
        // this.appendChild(nameSpan);
        // this.appendChild(subsliderContainer);
        this.onmousedown = function (e){
            if (this.children.length==2){
                //FIXME: remove timeout
                return;
            }
            
            // fetch something childs from server.
            console.log("fetching...")
            let Folder = this.children[0].textContent;
            console.log(Folder)
            console.log(this.children[0])
            let root_dirs = "";
            let ele = this
            while (ele.parentElement.parentElement.tagName == "FOLDER-NODE")
            {
                root_dirs =ele.parentElement.parentElement.children[0].textContent+ "/" + root_dirs;
                ele = ele.parentElement.parentElement;
            }
            Folder = root_dirs+Folder;
            let folder_info = null;
            ele = this
            getChildrenFolder(Folder,function(r){console.log(folder_info);folder_info=r;});
            let check_Timeout = setTimeout(function(){
                    
                    if (folder_info==null){
                        //TODO:show loading
                        console.log("timeout");
                        ele.showTimedOutBox();
                    }
                    else{
                        console.log("fetch_done");
                        //add subfolder here
                        console.log(folder_info);
                        let subSlider = FolderNode.fromJSONToHTMLchildren(folder_info);
                        ele.clearTimeoutBox();
                        ele.appendChild(subSlider);
                    }
                },250);
            console.log(folder_info);
            // folder_info.contents.forEach(function(item){
            //     let t = new FolderNode();
            //     t.nameSpan.textContent = item.name;
            //     this.children[1].appendChild(t);
            // })
        }
        
    }
    clearTimeoutBox(){
        let b = false;
        if (this.hasChildNodes()) {
            
            this.children[0].classList.forEach((value,key,parent)=>{if(value =="time-out"){b=true}});
        };
        if (b){
            this.removeChild(this.children[0]);
        }
    }
    showTimedOutBox(){
        let subSliderContainter = document.createElement("div");
        subSliderContainter.className="subslider-container time-out"
        let clear_both_div = document.createElement("div");
        clear_both_div.style = "clear:both";
        subSliderContainter.appendChild(clear_both_div);
        subSliderContainter.textContent +="timed out";
        subSliderContainter.style="background-color:green;";
        //create Timeout()
        this.appendChild(subSliderContainter);
    }
    static fromJSONToHTMLchildren(folder_info){
        let subSliderContainter = document.createElement("div");
        subSliderContainter.className="subslider-container"
        let clear_both_div = document.createElement("div");
        clear_both_div.style = "clear:both";
        subSliderContainter.appendChild(clear_both_div);
        folder_info.contents.forEach((item)=>{

            let folder_node = new FolderNode();
            folder_node.className="tree-node "+ item.type;
            let nameP = document.createElement('p');
            nameP.textContent = item.name;
            folder_node.appendChild(nameP);
            subSliderContainter.appendChild(folder_node);
        });
        subSliderContainter.onwheel = function(e){
            e.stopImmediatePropagation();
            console.log(e.deltaY);
            if(e.deltaY>0){
                let top_str = window.getComputedStyle(subSliderContainter, null).getPropertyValue('top');
                let number_str = top_str.substring(0,top_str.length-2);
                let top_number = parseFloat(number_str);
                top_number-=10;
                subSliderContainter.style.top = top_number.toString()+"px";
            }
            if(e.deltaY<0){
                let top_str = window.getComputedStyle(subSliderContainter, null).getPropertyValue('top');
                let number_str = top_str.substring(0,top_str.length-2);
                let top_number = parseFloat(number_str);
                top_number+=10;
                subSliderContainter.style.top = top_number.toString()+"px";
            }
        }
        
        return subSliderContainter;
    }
    
}

window.customElements.define("folder-node",FolderNode)