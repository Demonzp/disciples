import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class SelectLine{
    private _borderGraphics: Graphics|undefined;
    private _fonGraphics: Graphics|undefined;
    private _textEl:Text|undefined; 
    private _arrowUp:Sprite|undefined;
    private _arrowDown:Sprite|undefined;
    //private _idUp: string;
    //private _idDown: string;
    width = 200;
    height = 20;
    index = -1;
    constructor(public scene: Scene, public data:string[], private _defaultValue?:string, private _callback?:(data:string)=>void){
        this.index = data.length;
    }

    get value(){
        if(this.index<this.data.length){
            return this.data[this.index];
        }else{
            return undefined;
        }
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

    set value(data:string){
        //console.log('set value = ',data);
        const textIdx = this.data.findIndex(t=>t===data);
        if(textIdx!==-1){
            this.index = textIdx;
            this.textEl.text = this.data[this.index];
        }
    }

    set x(value: number){
        this._arrowUp.x = value+237;
        this._arrowDown.x = value+215;
        this.fonGraphics.x = value;
        this.borderGraphics.x = value;
        this.textEl.x = value+3;
    }

    set y(value: number){
        this._arrowUp.y = value+10;
        this._arrowDown.y = value+10;
        this.fonGraphics.y = value;
        this.borderGraphics.y = value;
        this.textEl.y = value+this.textEl.height+5/2;
    }

    init(){
        this._arrowUp = this.scene.add.sprite('arrows', 237, 10);
        this._arrowUp.on('pointerup', this.onArrowUp,this);

        this._arrowDown = this.scene.add.sprite('arrows', 215, 10);
        this._arrowDown.on('pointerup', this.onArrowDown,this);
        //this._arrowUp.setFrame(22);

        this._fonGraphics = this.scene.add.graphics();
        this.fonGraphics.fillStyle('white');
        this.fonGraphics.fillRect(0,0,this.width,this.height);

        this._borderGraphics = this.scene.add.graphics();
        //this.borderGraphics.lineWidth(1);
        this.borderGraphics.strokeStyle('black');
        this.borderGraphics.strokeRect(0,0,this.width,this.height);
        let text = '';
        if(this.data.length>0){
            if(this._defaultValue){
                const textIdx = this.data.findIndex(t=>t===this._defaultValue);
                if(textIdx!==-1){
                    this.index = textIdx;
                    text = this.data[textIdx];
                }
            }else{
                this.index = 0;
                text = this.data[0];
            }
        }
        this._textEl = this.scene.add.text(text, 0+3,0+5);
        //this._textEl.color = 'black';
        this.textEl.fontSize = 16;

        //console.log('this._arrowUp');
        this.arrowsIcon();
    }

    destroy(){
        this.scene.add.remove(this.fonGraphics);
        this.scene.add.remove(this.borderGraphics);
        this.scene.add.remove(this.textEl);
        this.scene.add.remove(this._arrowUp);
        this.scene.add.remove(this._arrowDown);
    }

    onArrowUp(){
        if(this.index===0){
            return;
        }
        this.index-=1;
        this.textEl.text = this.data[this.index];
        if(this._callback){
            this._callback(this.data[this.index]);
        }
        this.arrowsIcon();
    }

    onArrowDown(){
        if(this.index>=this.data.length-1){
            return;
        }

        this.index+=1;
        this.textEl.text = this.data[this.index];
        if(this._callback){
            this._callback(this.data[this.index]);
        }
        this.arrowsIcon();
    }

    arrowsIcon(){
        if(this.index>0){
            this._arrowUp.setFrame(22);
        }else{
            this._arrowUp.setFrame(14);
        }

        if(this.index<this.data.length-1){
            this._arrowDown.setFrame(5);
        }else{
            this._arrowDown.setFrame(1);
        }
    }
}