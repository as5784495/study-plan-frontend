let elements = [] as { target: Object, prop: string, name: string }[];
export function GetElement(name?: string): PropertyDecorator {
    return function (target, prop: string) {
        elements.push({ target, prop, name: name || prop });
    }
} 

export class GetElementClass {
    constructor() {
        let found = elements.filter(v => {
            let proto = this;
            while(proto !== v.target)
            {
                proto = Object.getPrototypeOf(proto);
                if(proto === null)
                {
                    return false;
                }
            }
            return true;
        })
        // console.log(found); 確認found
        found.forEach(v => this[v.prop] = document.getElementById(v.name));
    }
}

export class Common extends GetElementClass {
    constructor(){
        super();
    }
}
