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

    constructor(){
        super();

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
