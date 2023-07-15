import Container from "utils/gameLib/Container";
import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Text from "utils/gameLib/Text";

export default class Button{
    private _fon: Graphics|undefined;
    private _cont: Container|undefined;
    private _textEl: Text|undefined;
    width = 0;
    height = 24;
    constructor(public scene:Scene, private _text='button', private onClick?:()=>any){

    }

    get fon(){
        return this._fon!;
    }

    get cont(){
        return this._cont!;
    }

    get textEl(){
        return this._textEl!;
    }

    set x(value: number){
        this.fon.x = value;
        this.cont.x = value+(this.textEl.width+6)/2;
        this.textEl.x = value+5;
    }

    set y(value:number){
        this.fon.y = value;
        this.cont.y = value+this.height/2;
        this.textEl.y = value+this.height-(this.height-this._textEl.height)/2;
    }

    setZindex(value: number){
        this._fon.setZindex(value);
        this._textEl.setZindex(value+1);
        this.cont.setZindex(value);
    }

    init(){
        this._fon = this.scene.add.graphics();
        this._fon.fillStyle('#686f7d');
        //this._fon.fillRect(0,0,this.width,this.height);

        this._cont = this.scene.add.container();
        

        this._textEl = this.scene.add.text(this._text);
        this._textEl.fontSize = 14;
        //this._textEl.color = '#686f7d';
        this._textEl.x = 0+3;
        this._textEl.y = 0+this.height-(this.height-this._textEl.height)/2;

        this._fon.fillRect(0,0,this._textEl.width+10,this.height);
        this._cont.setInteractiveRect(this._textEl.width+10,this.height);
        this.width = this._textEl.width+10;
        this._cont.x = 0+(this._textEl.width+10)/2;
        this._cont.y = 0+this.height/2;
        this._cont.on('pointerup', ()=>{
            if(this.onClick){
                this.onClick();
            }
            //console.log('click on ',this._text);
        });
    }

    destroy(){
        this.scene.add.remove(this.fon);
        this.scene.add.remove(this.cont);
        this.scene.add.remove(this.textEl);
    }
}