import Graphics from "utils/gameLib/Graphics";
import { IScene } from "../scenes/IScene";
import Text, { TDataSymbol } from "utils/gameLib/Text";
import Container from "utils/gameLib/Container";

export default class InputEl{
    width = 58;
    height = 20;
    fontSize = 16;
    private _x = 0;
    private _y = 0;
    private _borderGraphics: Graphics|undefined;
    private _fonGraphics: Graphics|undefined;
    private _textEl:Text|undefined;
    private _cursor:Graphics|undefined;
    private _mainCont: Container|undefined;
    private _beginCont: Container|undefined;
    conts:Container[] = [];
    dataSymbols:TDataSymbol[] = [];
    isSelect = false;
    private _value = '0';
    index = 0;
    callbackSelect: ()=>any;
    constructor(public scene:IScene, defaultValue = 0, callbackSelect?:()=>any){
        this.callbackSelect = callbackSelect;
        this._value = String(defaultValue);
        this.create();
    }

    get x(){
        return this._x;
    }

    get y(){
        return this._y;
    }

    set x(value: number){
        this._x = value;
        this.fonGraphics.x = value;
        this.borderGraphics.x = value;
        this.textEl.x = value+3;
        this.updateText();
    }

    set y(value:number){
        this._y = value;
        this.fonGraphics.y = value;
        this.borderGraphics.y = value;
        this.textEl.y = value+this.textEl.height+5/2;
        this.cursor.y = value+4/2;
        this.updateText();
    }

    get value(){
        return Number(this.textEl.text);
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
        //console.log('create inputEl');
        this._fonGraphics = this.scene.add.graphics();
        this.fonGraphics.fillStyle('white');
        this.fonGraphics.fillRect(0,0,this.width,this.height);

        this._borderGraphics = this.scene.add.graphics();
        //this.borderGraphics.lineWidth(1);
        this.borderGraphics.strokeStyle('black');
        this.borderGraphics.strokeRect(0,0,this.width,this.height);

        this._textEl = this.scene.add.text(this._value, 0+3,0+5);
        //this._textEl.color = 'black';
        this.textEl.fontSize = 16;

        this._cursor = this.scene.add.graphics();
        this.cursor.fillStyle('black');
        this.cursor.fillRect(this.textEl.width+4,0+2,2,this.height-4);
        this.cursor.alpha = 0;
        this.scene.timer.on(this.updateCursor,0.5,this,true);

        this.updateText();
        
        
    }

    destroy(){
        this.scene.add.remove(this.fonGraphics);
        this.scene.add.remove(this.borderGraphics);
        this.scene.add.remove(this.textEl);
        this.scene.add.remove(this.cursor);
        this.destroyActionConts();
    }

    isPositiveIntegerSymbol(str:string) {
        return /^[0-9]\d*$/.test(str);
    }

    containsDigit(str:string) {
        return /\d/.test(str);
    }

    removeLeadingZeros(str:string) {
        return str.replace(/^0+/, "");
    }

    onChange(e:KeyboardEvent){
        if(!this.isSelect){
            return;
        }
        //console.log('onChange');
        //e.preventDefault();
        //console.log('e.code = ', e.code, '||', e.key);
        if(this.isPositiveIntegerSymbol(e.key)){
            
            const strPrev = this.textEl.text;
            if(strPrev.length>3){
                return;
            }
            //console.log('index = ', this.index);
            const part1 = strPrev.slice(0,this.index+1);
            const part2 = strPrev.slice(this.index+1);
            const newStr = part1+e.key+part2;
            //console.log(part1+e.key+part2);
            this.textEl.text = newStr;
            this.index+=1;
            this.updateText();
            //console.log('onChange = ', e.key, '||', e.shiftKey);
        }else if(e.code==='ArrowRight'){
            this.index+=1;
            this.updateCursorPos();
        }else if(e.code==='ArrowLeft'){
            this.index-=1;
            this.updateCursorPos();
        }else if(e.code==='Backspace'){
            if(this.index<=-1){
                return;
            }
            const strPrev = this.textEl.text;
            ////console.log(strPrev);
            const part1 = strPrev.slice(0,this.index);
            const part2 = strPrev.slice(this.index+1);
            ////console.log(part1,'||',part2);
            const newStr = part1+part2;
            this.textEl.text = newStr;
            this.index-=1;
            this.updateText();
        }else if(e.code==='Delete'){
            if(this.dataSymbols.length>0&&this.index<this.dataSymbols.length-1){
                const strPrev = this.textEl.text;
                ////console.log(strPrev);
                const part1 = strPrev.slice(0,this.index+1);
                const part2 = strPrev.slice(this.index+2);
                ////console.log(part1,'||',part2);
                const newStr = part1+part2;
                this.textEl.text = newStr;
                //this.index-=1;
                this.updateText();
            }
        }
    }

    destroyActionConts(){
        if(this._beginCont){
            this.scene.add.remove(this._beginCont);
        }
        this.conts.forEach(cont=>{
            this.scene.add.remove(cont);
        });

        if(this._mainCont){
            this.scene.add.remove(this._mainCont);
        }
    }

    updateText(){
        this.dataSymbols = this.textEl.getArrSymbolData()[0];
        
        this.destroyActionConts();

        if(this.dataSymbols.length<=0){
            this._mainCont = this.scene.add.container(this.x+this.width/2,this.y+this.height/2);
            this._mainCont.setInteractiveRect(this.width,this.height);
            this._mainCont.on('pointerup', ()=>{
                //////console.log('contMain = ');
                //this.cursor.x = this.textEl.width+4;
                this.index = this.dataSymbols.length-1;
                this.updateCursorPos();
                this.select();
            });
    
            this.updateCursorPos();
            return;
        }

        const prevSymbol = this.dataSymbols[0];
        this._beginCont = this.scene.add.container();
        this._beginCont.x = this.x+prevSymbol.x+3+prevSymbol.width/2;
        this._beginCont.y = this.y+prevSymbol.y+5+prevSymbol.height/2+1;
        this._beginCont.setInteractiveRect(prevSymbol.width,prevSymbol.height+2);
        this._beginCont.on('pointerup', ()=>{
            //////console.log('click on = ', 'begin');
            //this.cursor.x = 4;
            this.index = -1;
            this.updateCursorPos();
            this.select();
        });
        const noLast = this.dataSymbols.slice(0,this.dataSymbols.length-1);
        //////console.log('noLast = ', noLast);
        noLast.forEach((d,i)=>{
            const cont = this.scene.add.container();
            cont.x = this.x+d.x+3+d.width/2+4+(4*i);
            cont.y = this.y+d.y+5+d.height/2+1;
            cont.setInteractiveRect(d.width,d.height+2);
            cont.on('pointerup', ()=>{
                //////console.log('click on = ', d.symbol);
                //this.cursor.x = d.x+d.width+4+(4*i);
                this.index = i;
                this.updateCursorPos();
                this.select();
            });
            this.conts.push(cont);
        });

        this._mainCont = this.scene.add.container(this.x+this.width/2+this.textEl.width/2,this.y+this.height/2);
        this._mainCont.setInteractiveRect(this.width-this.textEl.width,this.height);
        this._mainCont.on('pointerup', ()=>{
            //////console.log('contMain = ');
            //this.cursor.x = this.textEl.width+4;
            this.index = this.dataSymbols.length-1;
            this.updateCursorPos();
            this.select();
        });

        this.updateCursorPos();
    }

    updateCursorPos(){
        if(this.index<=-1){
            this.index=-1;
            this.cursor.x = this.x+4;
            return;
        }else if(this.index>=this.dataSymbols.length-1){
            this.index = this.dataSymbols.length-1;
            this.cursor.x = this.x+this.textEl.width+4;
            return;
        }
        const symbolData = this.dataSymbols[this.index];
        this.cursor.x = this.x+symbolData.x+symbolData.width+4+(3.5*this.index);
    }

    select(){
        this.isSelect = true;
        this.borderGraphics.lineWidth(2);
        this.callbackSelect();
        // this.borderGraphics.strokeStyle('black');
        // this.borderGraphics.strokeRect(0,0,this.width,this.height);
    }

    ofSelect(){
        if(this.isSelect){
            const noZeros = this.removeLeadingZeros(this.textEl.text);
            this.textEl.text = noZeros;
            this.updateText();
        }
        this.isSelect = false;
        this.borderGraphics.lineWidth(1);
        //this.borderGraphics.strokeStyle('black');
        //this.borderGraphics.strokeRect(0,0,this.width,this.height);
        this.cursor.alpha = 0;
    }

    updateCursor(){
        if(this.cursor.alpha>0){
            this.cursor.alpha = 0;
        }else if(this.isSelect){
            this.cursor.alpha = 1;
        }
    }
}