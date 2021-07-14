import Axios from "axios";
import {GetElement, GetElementClass} from "./common";
type ScheduleType = {
    className: string,
    day: number,
    lessionNum: number,
    point: number,
    professor: string,
    scheduleId: number,
    startTime: string,
}
type DaySchedule = [
    Mon: Schedule[],
    Tue: Schedule[],
    Wes: Schedule[],
    Thu: Schedule[],
    Fri: Schedule[],
]
class Schedule extends GetElementClass{
    private schedule;
    @GetElement()
    private tb_schedule: HTMLTableElement;

    
    private tb_element = document.getElementsByClassName("tb_element");

    private div_contain = document.getElementsByClassName("div_contain");
    

    constructor() {
        super();
        
        console.log("schedule");
        this.init();
    }

    async init(){
        await this.creatSchedule();
        const tb_element = Array.from(this.tb_element);
        const div_object = Array.from(this.div_contain);
        
        div_object.forEach((v) => {
            v.addEventListener("dragstart",this.dragStart);
        })

        tb_element.forEach((v) => {
            v.addEventListener('drop', this.dropped);
            v.addEventListener('dragenter', this.cancelDefault);
            v.addEventListener('dragover', this.cancelDefault);
        })


        
    }

    
    async creatSchedule(){
        window.parent.postMessage("loading", "*");
        this.schedule = await Axios.get("https://script.google.com/macros/s/AKfycbwFg7-fPUmEqJCh9tOkgllQGqfFCOMgfMwaCyt5Opm2bqBXSBfRSfliNUdDkoRqqLuI_A/exec?func=schedule")
        window.parent.postMessage("loaded", "*");

        let rowset = new Array(10+1).fill(null).map((v, i) => this.tb_schedule.rows.item(i));
        let cells = rowset[0].cells.length;
        rowset.shift();
        
        const classTime = ["08：10", "09：05", "10：15", "11：10", "12：05", "13：10", "14：05", "15：15", "16：10", "17：10"];
        const classday = [1, 2, 3, 4, 5];

        
        for(let i = 0;i<10;i++){
            for(let j = 1;j<cells;j++){
                let column = rowset[i].insertCell();
                column.id = `co_${i}${j}`;

                const div = document.createElement("div");
                div.classList.add("tb_element");
                column.appendChild(div);

                const div_contain = document.createElement("div");
                div_contain.classList.add("div_contain")
                div.append(div_contain);
                
            }   
        }

        Object.values(this.schedule.data).forEach((v:ScheduleType) =>{
            classTime.forEach((k , i)=>{
                if(k===v.startTime)
                {
                    classday.forEach((l,j)=>{
                        if(l===v.day){
                            for(let n=0;n<v.lessionNum;n++)
                            {
                                const div = document.getElementById(`co_${i+n}${j+1}`).getElementsByTagName("div")[0];
                                const  div_contain = document.getElementById(`co_${i+n}${j+1}`).getElementsByTagName("div")[0].getElementsByTagName("div")[0];
                                div_contain.innerHTML = `${v.className}/${v.professor}/${v.point}學分/${v.scheduleId}`;
                                // div.innerHTML = `${v.className}/${v.professor}/${v.point}學分/${v.scheduleId}`;
                            }
                        }
                    })
                }
            })
        })

    }

    dragStart (e: DragEvent) {
        e.dataTransfer.setData("text/plain1" , (e.target as HTMLElement).className);
    }

    dropped = (e: DragEvent) => {
        this.cancelDefault(e);
        let className = e.dataTransfer.getData('text/plain1');
        console.log(className);
        // (e.target as HTMLElement).appendChild(document.querySelector('.' + className));
      }
      
    cancelDefault = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

}
const schedule = new Schedule();