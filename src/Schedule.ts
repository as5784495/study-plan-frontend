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

    @GetElement()
    private div_loading: HTMLDivElement;
    

    constructor() {
        super();
        
        console.log("schedule");
        this.creatSchedule();
        this.pageSelect();
    }

    pageSelect () {
        
    }
    
    async creatSchedule(){
        window.parent.postMessage("loading", "*");

        this.div_loading.style.display = "flex";
        this.tb_schedule.style.display = "none"
        this.schedule = await Axios.get("https://script.google.com/macros/s/AKfycbwFg7-fPUmEqJCh9tOkgllQGqfFCOMgfMwaCyt5Opm2bqBXSBfRSfliNUdDkoRqqLuI_A/exec?func=schedule")
        this.tb_schedule.style.display = "block";
        this.div_loading.style.display = "none";

        window.parent.postMessage("loaded", "*");

        let rowset = new Array(10+1).fill(null).map((v, i) => this.tb_schedule.rows.item(i));
        let cells = rowset[0].cells.length;
        rowset.shift();
        
        let classTime = ["08：10", "09：05", "10：15", "11：10", "12：05", "13：10", "14：05", "15：15", "16：10", "17：10"];
        let classday = [1, 2, 3, 4, 5];

        
        for(let i = 0;i<10;i++){
            for(let j = 1;j<cells;j++){
                let column = rowset[i].insertCell();
                column.id = `co_${i}${j}` ;
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
                            document.getElementById(`co_${i+n}${j+1}`).innerHTML = `${v.className}/${v.professor}/${v.point}學分/${v.scheduleId}`;
                            }
                        }
                    })
                }
            })
        })

    }

}
const schedule = new Schedule();
