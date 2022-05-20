//read view component from viewTemplate.json

//create according to ViewTemplate.json

//get element from html files
let sliderContainer=document.getElementById("slider-container");
let menuButton=document.getElementById("menu-button");
let listSubSliderContainer = document.getElementsByClassName("subslider-container");


sliderContainer.onwheel = function(e){
    e.stopImmediatePropagation();
    console.log(e.deltaY);
    if(e.deltaY>0){
        let top_str = window.getComputedStyle(sliderContainer, null).getPropertyValue('top');
        let number_str = top_str.substring(0,top_str.length-2);
        let top_number = parseFloat(number_str);
        top_number-=10;
        sliderContainer.style.top = top_number.toString()+"px";
    }
    if(e.deltaY<0){
        let top_str = window.getComputedStyle(sliderContainer, null).getPropertyValue('top');
        let number_str = top_str.substring(0,top_str.length-2);
        let top_number = parseFloat(number_str);
        top_number+=10;
        sliderContainer.style.top = top_number.toString()+"px";
    }
}
for(let i=0; i<listSubSliderContainer.length;i++){
    let element = listSubSliderContainer[i];
    element.onwheel = function(e){
        e.stopImmediatePropagation();
        console.log(e.deltaY);
        if(e.deltaY>0){
            let top_str = window.getComputedStyle(element, null).getPropertyValue('top');
            let number_str = top_str.substring(0,top_str.length-2);
            let top_number = parseFloat(number_str);
            top_number-=10;
            element.style.top = top_number.toString()+"px";
        }
        if(e.deltaY<0){
            let top_str = window.getComputedStyle(element, null).getPropertyValue('top');
            let number_str = top_str.substring(0,top_str.length-2);
            let top_number = parseFloat(number_str);
            top_number+=10;
            element.style.top = top_number.toString()+"px";
        }
    }
}


let arr = document.getElementsByClassName("sys-info");
for(let i =0; i<arr.length;i++){
    if (arr[i].id=="sys-info-1"){
        arr[i].style.order = 2;
        let gpuInfo = new GPUInfo();
        gpuInfo.Init();
        gpuInfo.className = "dataview";
        arr[i].append(gpuInfo);
        
    }
    if (arr[i].id=="sys-info-2"){
        arr[i].style.order = 3;
    }
    if (arr[i].id=="sys-info-3"){
        let cpuInfo = new CPUInfo();
        cpuInfo.Init();
        cpuInfo.className = "dataview";
        arr[i].style.order = 1;
        arr[i].append(cpuInfo);
    }
    
}


let btn_map = [[1,2,3],[2,3,1],[3,1,2]];
let hardwareBtns = document.getElementsByClassName("hardware-btn")
for (let i = 0;i<hardwareBtns.length;i++){
    hardwareBtns[i].onmouseover = function(){
        let ar = document.getElementsByClassName("sys-info");
        for(let j =0; j<ar.length;j++){
            if (ar[j].id=="sys-info-1"){
                ar[j].style.order = btn_map[i][0];
            }
            if (ar[j].id=="sys-info-2"){
                ar[j].style.order = btn_map[i][1];
            }
            if (ar[j].id=="sys-info-3"){
                ar[j].style.order = btn_map[i][2];
            }
    
        }
    }
}


// const FlexSlider = {
// 	// total no of items
// 	num_items: 5, //hard coded for now
	
// 	// position of current item in view
// 	current: 1,

// 	init: function() {
// 		// set CSS order of each item initially
// 		document.querySelectorAll(".sys-item").forEach(function(element, index) {
// 			element.style.order = index+1;
// 		});

// 		this.addEvents();
// 	},

// 	addEvents: function() {
// 		var that = this;

// 		// click on move item button
// 		document.querySelector("#move-button").addEventListener('click', () => {
// 			this.gotoNext();
// 		});

// 		// after each item slides in, slider container fires transitionend event
// 		document.querySelector("#slider-container").addEventListener('transitionend', () => {
// 			this.changeOrder();
// 		});
// 	},

// 	changeOrder: function() {
// 		// change current position
// 		if(this.current == this.num_items)
// 			this.current = 1;
// 		else 
// 			this.current++;

// 		let order = 1;

// 		// change order from current position till last
// 		for(let i=this.current; i<=this.num_items; i++) {
// 			document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
// 			order++;
// 		}

// 		// change order from first position till current
// 		for(let i=1; i<this.current; i++) {
// 			document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
// 			order++;
// 		}

// 		// translate back to 0 from -100%
// 		// we don't need transitionend to fire for this translation, so remove transition CSS
// 		document.querySelector("#slider-container").classList.remove('slider-container-transition');
// 		document.querySelector("#slider-container").style.transform = 'translateX(0)';
// 	},

// 	gotoNext: function() {
// 		// translate from 0 to -100% 
// 		// we need transitionend to fire for this translation, so add transition CSS
// 		document.querySelector("#slider-container").classList.add('slider-container-transition');
// 		document.querySelector("#slider-container").style.transform = 'translateX(-100%)';
// 	}
// };

// FlexSlider.init();