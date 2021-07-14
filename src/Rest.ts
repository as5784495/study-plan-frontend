import {GetElement, GetElementClass} from "./common";
class Rest extends GetElementClass{
    constructor(){
        super();
        window.parent.postMessage("loaded", "*");
        console.log("rest");
    }
}
const rest = new Rest();
