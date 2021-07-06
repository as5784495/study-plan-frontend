import {GetElement, GetElementClass} from "./common";
class Plan extends GetElementClass{
    @GetElement()
    protected div_cube: HTMLInputElement;
    @GetElement("div_target-container")
    protected dropTarget: HTMLDivElement;
    

    constructor () {
        super();
        console.log("plan");
        
        this.div_cube.addEventListener("dragstart",this.dragStart);
        this.dropTarget.addEventListener('drop', this.dropped);
        this.dropTarget.addEventListener('dragenter', this.cancelDefault);
        this.dropTarget.addEventListener('dragover', this.cancelDefault);
    }

    dragStart (e: DragEvent) {
        e.dataTransfer.setData("text/plain" , (e.target as HTMLElement).id);
    }

    dropped = (e: DragEvent) => {
        this.cancelDefault(e);
        let id = e.dataTransfer.getData('text/plain');
        (e.target as HTMLElement).appendChild(document.querySelector('#' + id));
      }
      
    cancelDefault = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
}
const plan = new Plan();
