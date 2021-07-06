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

    protected href_groups = document.getElementsByClassName("href_groups") as HTMLCollection;
    
    constructor(){
        super();
        let arrHref = Array.from(this.href_groups);
        this.iframe_content.src = localStorage.getItem("src");
        arrHref.forEach((v) => {
            v.addEventListener("click", () => {
                setTimeout(() => {
                    console.log(this.iframe_content.contentWindow.location.href);
                    localStorage.setItem("src", this.iframe_content.contentWindow.location.href);
                }, 100)
            });
        })
        
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
    }
}
const main = new Main();