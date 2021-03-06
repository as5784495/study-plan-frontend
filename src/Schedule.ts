import Axios from "axios";
import { spread } from "lodash";
import {GetElement, GetElementClass} from "./common";
type ScheduleType = {
    className: string,
    day: number,
    point: number,
    professor: string,
    scheduleId: number,
    timeIds: number[],
}

type TimeType = {
    timeId: number,
    startTime: string,
    duration: number,
}

type Data = {
    schedule: ScheduleType[],
    time: TimeType[],
}




class Schedule extends GetElementClass{
    private header: { mode: string,
    credentials: string, // include, *same-origin, omit
    redirect: string,
    headers: {Authorization: string},
    };
    private token = "1N6-x-9dtKXbXL_ewacav-w7plJirLDeSmZXkvxCE24WgTgru5A8ZZOqs";
    private schedule: ScheduleType[];
    private time: TimeType[];
    @GetElement()
    private tb_schedule: HTMLTableElement;
    @GetElement()
    private btn_checkLession:HTMLInputElement;

    @GetElement()
    private div_settingBlock:HTMLDivElement;
    @GetElement()
    private btn_upload:HTMLInputElement;

    @GetElement()
    private div_dragSource:HTMLDivElement;
    @GetElement()
    private div_trashCan:HTMLDivElement;

    @GetElement()
    private form_lessionMaker:HTMLFormElement;
    @GetElement()
    private input_lession:HTMLInputElement;
    @GetElement()
    private input_professer:HTMLInputElement;
    @GetElement()
    private input_credit:HTMLInputElement;
    @GetElement()
    private input_lessionCode:HTMLInputElement;


    
    private tb_element = document.getElementsByClassName("tb_element");

    private div_contain = document.getElementsByClassName("div_contain");
    private dragging_div = null as  EventTarget | null ;
    

    constructor() {
        super();
        console.log("schedule");
        this.header = {
            mode: 'no-cors',
            credentials: 'include', // include, *same-origin, omit
            redirect: 'follow',
            headers: {Authorization: `Bearer ${ this.token }`}};
        this.init();

    }

    async init(){
        await this.creatSchedule();
        const tb_element = Array.from(this.tb_element);
        const div_object = Array.from(this.div_contain);
        tb_element.push(this.div_trashCan);

        this.btn_upload.addEventListener("click" ,this.uploadSchedule.bind(this));

        div_object.forEach((v) => {
            v.addEventListener("dragstart",this.dragStart.bind(this));
        })

        tb_element.forEach((v) => {
            v.addEventListener('drop', this.dropped.bind(this));
            v.addEventListener('dragenter', this.cancelDefault.bind(this));
            v.addEventListener('dragover', this.cancelDefault.bind(this));
        })

        this.form_lessionMaker.addEventListener("submit", this.makeLession.bind(this))
    }


    makeLession(e:Event){
        e.preventDefault();
        if(this.input_lession.value && this.input_professer.value && this.input_credit.value && this.input_lessionCode.value)
        {
            if(!document.querySelector("#div_dragSource")){
                const div1 = document.createElement("div");
                div1.id = "div_dragSource";
                this.div_settingBlock.appendChild(div1);
    
                const div2 = document.createElement("div");
                div2.id = "div_dragger";
                div2.draggable = true;
                div2.classList.add("div_draggerFromMaker");
                document.querySelector("#div_dragSource").appendChild(div2);
            }

            const div_dragger = document.getElementById("div_dragger") as HTMLDivElement;
            const div_dragSource = document.getElementById("div_dragSource") as HTMLDivElement;
            // console.log(div_dragger);
            div_dragger.innerHTML = `${this.input_lession.value}/${this.input_professer.value}/${this.input_credit.value}??????/${this.input_lessionCode.value}`;

            div_dragger.addEventListener("dragstart",this.dragStart.bind(this));
            div_dragSource.addEventListener('drop', this.dropped.bind(this));
            div_dragSource.addEventListener('dragenter', this.cancelDefault.bind(this));
            div_dragSource.addEventListener('dragover', this.cancelDefault.bind(this));

        }
        else alert("????????????");
        
        
    }

    async uploadSchedule(){
        const classTime = ["08???10", "09???05", "10???15", "11???10", "12???05", "13???10", "14???05", "15???15", "16???10", "17???10"];

        let data: ScheduleType[] = [];
        let Obj: ScheduleType;

        for(let i=0;i<5;i++)
        {
            for(let j=0;j<10;j++)
            {
                let content = (document.getElementById('tb_schedule') as HTMLTableElement).rows[j+1].cells[i+1].children[0].children[0].innerHTML;
                let contentSplit = content.split("/");
                // console.log(content);

                

                if(contentSplit[3] !== undefined)
                {

                    Obj = {
                        className: contentSplit[0],
                        day: i+1,
                        point: parseInt(contentSplit[2]) ,
                        professor: contentSplit[1],
                        scheduleId: parseInt(`${contentSplit[3]}`),
                        timeIds: [j],
                    }

                    data.push(Obj);
                }
                else{
                    data.push(undefined);
                }
                
            }
        } 
        data = data.filter((v,i) => {
            if(v === undefined) return false;
            const index =  data.findIndex(e => e?.scheduleId === v?.scheduleId);
            if(index !== i){
                data[index].timeIds.push(i%10);
            }
            return index === i;
        })

        

        
        
        // console.log(JSON.stringify(arr));

        console.log(JSON.stringify(data));
        console.log(this.header);
        
         
        await Axios.post("https://script.google.com/macros/s/AKfycbywO9Z4wDCDV5JrtGEhhc1y0_FEY4FGfPQXEpQPis4MEpkr_2eGWDc_U5G5ldeIWIAVNw/exec",{} ,this.header);

        


        
    }

    async creatSchedule(){
        window.parent.postMessage("loading", "*");
        const data  = await Axios.get("https://script.google.com/macros/s/AKfycbywO9Z4wDCDV5JrtGEhhc1y0_FEY4FGfPQXEpQPis4MEpkr_2eGWDc_U5G5ldeIWIAVNw/exec?func=schedule")
        this.schedule = data.data.schedule;
        this.time = data.data.time;
        window.parent.postMessage("loaded", "*");
        // console.log(this.schedule);

        

        let rowset = new Array(10+1).fill(null).map((v, i) => this.tb_schedule.rows.item(i));
        let cells = rowset[0].cells.length;
        rowset.shift();
        
        const classTime = ["08???10", "09???05", "10???15", "11???10", "12???05", "13???10", "14???05", "15???15", "16???10", "17???10"];
        const classday = [1, 2, 3, 4, 5];

        
        for(let i = 0;i<10;i++){
            for(let j = 1;j<cells;j++){
                let column = rowset[i].insertCell();
                column.id = `co_${i}${j}`;

                const div = document.createElement("div");
                div.classList.add("tb_element");
                column.appendChild(div);

                const div_contain = document.createElement("div");
                div_contain.classList.add("div_contain");
                div_contain.draggable = true;
                div.append(div_contain);
                
            }   
        }
        // console.log(this.schedule, this.time);

        Object.values(this.schedule).forEach((v) =>{
            this.time.forEach((k , i)=>{
                if(k.timeId === v.timeIds[0])
                {
                    classday.forEach((l,j)=>{
                        if(l===v.day){
                            for(let n=0;n<v.timeIds.length;n++)
                            {
                                const div = document.getElementById(`co_${i+n}${j+1}`).getElementsByTagName("div")[0];
                                const  div_contain = document.getElementById(`co_${i+n}${j+1}`).getElementsByTagName("div")[0].getElementsByTagName("div")[0];
                                div_contain.innerHTML = `${v.className}/${v.professor}/${v.point}??????/${v.scheduleId}`;
                            }
                        }
                    })
                }
            })
        })
        
        // Object.values(this.schedule).forEach((v) =>{
        //     classTime.forEach((k , i)=>{
        //         if(k===v.startTime)
        //         {
        //             classday.forEach((l,j)=>{
        //                 if(l===v.day){
        //                     for(let n=0;n<v.lessionNum;n++)
        //                     {
        //                         const div = document.getElementById(`co_${i+n}${j+1}`).getElementsByTagName("div")[0];
        //                         const  div_contain = document.getElementById(`co_${i+n}${j+1}`).getElementsByTagName("div")[0].getElementsByTagName("div")[0];
        //                         div_contain.innerHTML = `${v.className}/${v.professor}/${v.point}??????/${v.scheduleId}`;
        //                         // div.innerHTML = `${v.className}/${v.professor}/${v.point}??????/${v.scheduleId}`;
        //                     }
        //                 }
        //             })
        //         }
        //     })
        // })

    }

    dragStart (e: DragEvent) {
        this.dragging_div = e.target;
    }

    dropped = (e: DragEvent) => {
        this.cancelDefault(e);
        let dropper = e.target as HTMLElement;
        let dragger = this.dragging_div as HTMLElement;
        const targetChild = (dropper.getElementsByClassName("div_contain"))[0];
        console.log("dropper", dropper);
        console.log("dragger", dragger);

        if(dropper.id === "div_trashCan")
        {
            dragger.innerHTML = "";
            if(dragger.className === "div_draggerFromMaker"){
                dragger.parentElement.remove();
                dragger.remove();
            }
            
            return 0;
        }

        while(dropper.className != "tb_element"){dropper = dropper.parentElement};

        if(dragger.className !== "div_draggerFromMaker")
        {
            (dragger as HTMLElement).parentElement.appendChild(targetChild);
            dropper.appendChild(dragger);
        }
        else if(dragger.className === "div_draggerFromMaker")
        {
            const draggerParent = dragger.parentElement;

            targetChild.remove();
            dropper.appendChild(dragger);
            dragger.className = "div_contain";
            dragger.id = "";
            
            draggerParent.remove();
        }

        this.dragging_div = null;
      }
      
    cancelDefault = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

}
const schedule = new Schedule();