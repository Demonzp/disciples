import Graphics from "utils/gameLib/Graphics";
import { IScene } from "../scenes/IScene";

export default class ModalPropertiesCapital{
    private _graphics:Graphics|undefined;
    width = 660;
    height = 460;
    halfWidth = 0;
    halfHeight = 0;
    constructor(public scene:IScene){
        //this.init();
        this.halfWidth = this.width/2;
        this.halfHeight = this.height/2;
    }

    get graphics(){
        return this._graphics!;
    }

    init(){
        // this._graphics = this.scene.add.graphics();
        // this.graphics.fillStyle('grey');
        // const cameraPoint = this.scene.game.camera.cameraPoint();
        // const x = 0+this.scene.halfWidth+cameraPoint.x-this.halfWidth;
        // const y = 0+this.scene.halfHeight+cameraPoint.y-this.halfHeight;
        // this.graphics.fillRect(x,y, this.width, this.height);
    }
}