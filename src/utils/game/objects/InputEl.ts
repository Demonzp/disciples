import Graphics from "utils/gameLib/Graphics";
import { IScene } from "../scenes/IScene";

export default class InputEl{
    width = 120;
    height = 20;
    fontSize = 16;
    private _borderGraphics: Graphics|undefined;
    private _fonGraphics: Graphics|undefined;
    constructor(public scene:IScene){
        this.create();
    }

    get borderGraphics(){
        return this._borderGraphics!;
    }

    get fonGraphics(){
        return this._fonGraphics!;
    }

    create(){
        this._fonGraphics = this.scene.add.graphics();
        this.fonGraphics.fillStyle('white');
        this.fonGraphics.fillRect(0,0,this.width,this.height);

        this._borderGraphics = this.scene.add.graphics();
        this.borderGraphics.strokeStyle('black');
        this.borderGraphics.strokeRect(0,0,this.width,this.height);
    }
}