import Graphics from "utils/gameLib/Graphics";
import { IScene } from "../scenes/IScene";
import Text from "utils/gameLib/Text";

export default class InputEl{
    width = 120;
    height = 20;
    fontSize = 16;
    private _borderGraphics: Graphics|undefined;
    private _fonGraphics: Graphics|undefined;
    private _textEl:Text|undefined;
    private _cursor:Graphics|undefined;
    isSelect = false;
    constructor(public scene:IScene){
        this.create();
    }

    get borderGraphics(){
        return this._borderGraphics!;
    }

    get fonGraphics(){
        return this._fonGraphics!;
    }

    get textEl(){
        return this._textEl!;
    }

    get cursor(){
        return this._cursor!;
    }

    create(){
        this._fonGraphics = this.scene.add.graphics();
        this.fonGraphics.fillStyle('white');
        this.fonGraphics.fillRect(0,0,this.width,this.height);

        this._borderGraphics = this.scene.add.graphics();
        this.borderGraphics.lineWidth(3);
        this.borderGraphics.strokeStyle('black');
        this.borderGraphics.strokeRect(0,0,this.width,this.height);

        this._textEl = this.scene.add.text('9999', 0+3,0+5);
        //this._textEl.color = 'black';
        this._textEl.fontSize = 16;
        this.textEl.width;

        this._cursor = this.scene.add.graphics();
        this.cursor.fillStyle('black');
        this.cursor.fillRect(this.textEl.width+4,0+2,2,this.height-4);
        this.scene.timer.on(this.updateCursor,0.6,this,true);
    }

    updateCursor(){
        if(this.cursor.alpha>0){
            this.cursor.alpha = 0;
        }else{
            this.cursor.alpha = 1;
        }
    }
}