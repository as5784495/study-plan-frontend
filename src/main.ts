import {GetElement, GetElementClass} from "./common";
class Main extends GetElementClass{

    @GetElement()
    protected btn_menu: HTMLInputElement;

    @GetElement()
    protected div_hrefDiv: HTMLDivElement;

    constructor(){
        super();
        
        console.log(this.btn_menu);
        this.btn_menu.addEventListener("click", () => this.closeMenu());
    }

    closeMenu(){
        this.div_hrefDiv.style.display = (this.div_hrefDiv.style.display === "none") ? "block" : "none" ;
    }
}
const main = new Main();
