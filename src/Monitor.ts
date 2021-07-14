import {GetElement, GetElementClass} from "./common";
class Monitor extends GetElementClass{
    constructor(){
        super();

        window.parent.postMessage("loaded", "*");
        
        console.log("monitor");
    }
}
const monitor = new Monitor();
