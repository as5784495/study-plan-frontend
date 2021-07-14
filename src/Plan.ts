import {GetElement, GetElementClass} from "./common";
class Plan extends GetElementClass{
    @GetElement()
    protected div_cube: HTMLInputElement;
    @GetElement()
    protected div_targetContainer: HTMLDivElement;
    @GetElement()
    protected div_sourceContainer: HTMLDivElement;

    constructor () {
        super();
        console.log("plan");

        window.parent.postMessage("loaded", "*");

        this.div_cube.addEventListener("dragstart",this.dragStart);
        this.div_targetContainer.addEventListener('drop', this.dropped);
        this.div_targetContainer.addEventListener('dragenter', this.cancelDefault);
        this.div_targetContainer.addEventListener('dragover', this.cancelDefault);
        
        this.div_sourceContainer.addEventListener('drop', this.dropped);
        this.div_sourceContainer.addEventListener('dragenter', this.cancelDefault);
        this.div_sourceContainer.addEventListener('dragover', this.cancelDefault);
    }

    dragStart (e: DragEvent) {
        e.dataTransfer.setData("text/plain" , (e.target as HTMLElement).id);
    }

    dropped = (e: DragEvent) => {
        this.cancelDefault(e);
        let id = e.dataTransfer.getData('text/plain');
        console.log(id);
        (e.target as HTMLElement).appendChild(document.querySelector('#' + id));
      }
      
    cancelDefault = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
}
const plan = new Plan();
