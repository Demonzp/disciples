import Scene from "utils/gameLib/Scene";

export default class MainScene extends Scene{

    //pointerMatrix: TPointMatrix = [0,0];
    constructor(){
        super('MainScene');
    }

    create(): void {
        console.log('mainScene');
    }

    update(_: number): void {
    }
}