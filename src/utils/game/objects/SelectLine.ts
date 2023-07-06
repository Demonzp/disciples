import Scene from "utils/gameLib/Scene";

export default class SelectLine{
    index = -1;
    constructor(public scene: Scene, public data:string[]){
        this.index = data.length;
    }

    get value(){
        if(this.index<this.data.length){
            return this.data[this.index];
        }else{
            return undefined;
        }
    }
}