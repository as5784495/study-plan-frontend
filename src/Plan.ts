import {GetElement, GetElementClass} from "./common";
class Plan extends GetElementClass{
    @GetElement()
    protected div_cube: HTMLInputElement;

    constructor(){
        super();
        
        // this.div_cube.addEventListener("dragstart", )
    }
}
const plan = new Plan();
