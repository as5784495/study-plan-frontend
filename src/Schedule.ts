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
    private daySchedule: DaySchedule;
    

    constructor() {
        super();
        
        console.log("schedule");
        console.log(this.tb_schedule);
        this.creatSchedule();
        this.pageSelect();
    }

    pageSelect () {
        
    }
    
    async creatSchedule(){
        this.schedule = await Axios.get("https://script.google.com/macros/s/AKfycbwFg7-fPUmEqJCh9tOkgllQGqfFCOMgfMwaCyt5Opm2bqBXSBfRSfliNUdDkoRqqLuI_A/exec?func=schedule")
        console.log(this.schedule);
        console.log(this.schedule.data);

        this.daySchedule = new Object as DaySchedule;
        console.log(this.daySchedule)


        // let cells = this.tb_schedule.rows.item(0).cells.length;
        // let row1 = this.tb_schedule.rows.item(1);
        // let row2 = this.tb_schedule.rows.item(2);
        // let row3 = this.tb_schedule.rows.item(3);
        // let row4 = this.tb_schedule.rows.item(4);
        // let row5 = this.tb_schedule.rows.item(5);
        // let row6 = this.tb_schedule.rows.item(6);
        // let row7 = this.tb_schedule.rows.item(7);
        // let row8 = this.tb_schedule.rows.item(8);
        // let row9 = this.tb_schedule.rows.item(9);
        // let row10 = this.tb_schedule.rows.item(10);
        // let rowset = [row1, row2, row3, row4, row5, row6, row7, row8, row9 , row10];
        let rowset = new Array(10+1).fill(null).map((v, i) => this.tb_schedule.rows.item(i));
        let cells = rowset[0].cells.length;
        rowset.shift();
        
        let classTime = ["08：10", "09：05", "10：15", "11：10", "12：05", "13：10", "14：05", "15：15", "16：10", "17：10"];
        let classday = [1, 2, 3, 4, 5];

        
        for(let i = 0;i<10;i++){
            for(let j = 1;j<cells;j++){
                let column = rowset[i].insertCell();
                column.id = `co_${i}${j}` ;
                // document.getElementById(`co_${i}${j}`).innerHTML = `co_${i}${j}`;
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
