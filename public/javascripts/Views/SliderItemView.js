class SliderItemView extends HTMLElement{
    constructor(imageElement) {
    super();
    // this.className="slider-item";
    // let x = document.createElement("div");
    // this.htmlElementOuter.appendChild(x);

    }
    add_to_parent = function(htmlEle){
        htmlEle.appendChild(this.htmlElementOuter);
    }
    //hover to do something

}

window.customElements.define("slider-item",SliderItemView)