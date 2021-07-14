import {GetElement, GetElementClass} from "./common";
class Main extends GetElementClass{

    @GetElement()
    protected btn_menu: HTMLInputElement;

    @GetElement()
    protected div_mainMenu: HTMLDivElement;

    @GetElement()
    protected div_hrefDiv: HTMLDivElement;

    @GetElement()
    protected iframe_content: HTMLIFrameElement;
    @GetElement()
    private div_loading: HTMLDivElement;
    
    constructor(){
        super();
        
        localStorage.getItem("src") ? `http://127.0.0.1:5500/${localStorage.getItem("src")}` : `http://127.0.0.1:5500/dist/Schedule/`;

        window.addEventListener("message", (e: MessageEvent) => {
            console.log(e.data);
            if(e.data === "loading")
            {
                this.div_loading.style.display = "flex";
                this.iframe_content.style.opacity = "0";

            }
            else if (e.data === "loaded")
            {
                this.div_loading.style.display = "none";
                this.iframe_content.style.opacity = "1";
            }
        });
        
        this.btn_menu.addEventListener("click", () => {
            const visible = (this.div_hrefDiv.style.display === "block");

            this.div_hrefDiv.style.display = visible ? "none" : "block";
            if (visible) {
                this.div_mainMenu.classList.remove("menu-visible");
                this.iframe_content.classList.remove("menu-visible");
            }
            else {
                this.div_mainMenu.classList.add("menu-visible");
                this.iframe_content.classList.add("menu-visible");
            }
        });

        this.div_hrefDiv.addEventListener("click", (event: MouseEvent) => {
            const a = event.target as HTMLAnchorElement;
            const matched = a.href.match(/dist.*/)[0];
            localStorage.setItem("src", matched);
            
        });
    }
}
const main = new Main();