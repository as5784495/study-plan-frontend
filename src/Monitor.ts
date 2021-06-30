import {GetElement, GetElementClass} from "./common";
class Monitor extends GetElementClass{
    constructor(){
        super();
        console.log("monitor");
    }
}
const monitor = new Monitor();
