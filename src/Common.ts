const elements = [] as { target: Object, prop: string, name: string }[];
export function GetElement(name?: string): PropertyDecorator {
    return function (target, prop: string) {
        elements.push({ target, prop, name: name || prop });
    }
} 

export class GetElementClass {
constructor() {
    
    // let  proto = Object.getPrototypeOf( Object.getPrototypeOf(this));
    let proto = Object.getPrototypeOf(this);;
    while (proto !== elements[0].target)
    {
        proto = Object.getPrototypeOf(proto);
    }

    console.log(elements.filter(v => v.target === proto));
    elements.filter(v => v.target === proto).forEach(v => this[v.prop] = document.getElementById(v.name));
}
}

export class Common extends GetElementClass {

    @GetElement()
    protected btn_menu: HTMLInputElement;

    @GetElement()
    protected div_hrefDiv: HTMLDivElement;

    constructor(){
        super();
        
        console.log(this.btn_menu);
        this.btn_menu.addEventListener("click", () => this.closeMenu());
    }

    closeMenu(){
        this.div_hrefDiv.style.display = (this.div_hrefDiv.style.display === "none") ? "block" : "none" ;
    }

}
