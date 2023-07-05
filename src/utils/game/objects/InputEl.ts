import Graphics from "utils/gameLib/Graphics";
import { IScene } from "../scenes/IScene";
import Text from "utils/gameLib/Text";
import Container from "utils/gameLib/Container";

export default class InputEl{
    width = 120;
    height = 20;
    fontSize = 16;
    private _borderGraphics: Graphics|undefined;
    private _fonGraphics: Graphics|undefined;
    private _textEl:Text|undefined;
    private _cursor:Graphics|undefined;
    private _mainCont: Container|undefined;
    private _beginCont: Container|undefined;
    conts:Container[] = [];
    isSelect = false;
    index = 0;
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
        //this.borderGraphics.lineWidth(1);
        this.borderGraphics.strokeStyle('black');
        this.borderGraphics.strokeRect(0,0,this.width,this.height);

        this._textEl = this.scene.add.text('1234897', 0+3,0+5);
        //this._textEl.color = 'black';
        this.textEl.fontSize = 16;
        this.textEl.width;

        this._cursor = this.scene.add.graphics();
        this.cursor.fillStyle('black');
        this.cursor.fillRect(this.textEl.width+4,0+2,2,this.height-4);
        this.cursor.alpha = 0;
        this.scene.timer.on(this.updateCursor,0.6,this,true);

        this.updateText();
        //console.log('data = ', dataSymbols);
        
    }

    isPositiveIntegerSymbol(str:string) {
        return /^[0-9]\d*$/.test(str);
    }

    containsDigit(str:string) {
        return /\d/.test(str);
    }

    onChange(e:KeyboardEvent){
        //e.preventDefault();
        //console.log('e.code = ', e.code, '||', e.key, '||', e.shiftKey);
        if(this.isPositiveIntegerSymbol(e.key)){
            const strPrev = this.textEl.text;
            console.log('index = ', this.index);
            const part1 = strPrev.slice(0,this.index+1);
            const part2 = strPrev.slice(this.index+1);
            const newStr = part1+e.key+part2;
            //console.log(part1+e.key+part2);
            this.textEl.text = newStr;
            this.updateText();
            console.log('onChange = ', e.key, '||', e.shiftKey);
        }
    }

    updateText(){
        const dataSymbols = this.textEl.getArrSymbolData();
        const prevSymbol = dataSymbols[0][0];
        if(this._beginCont){
            this.scene.add.remove(this._beginCont);
        }
        this.conts.forEach(cont=>{
            this.scene.add.remove(cont);
        });

        if(this._mainCont){
            this.scene.add.remove(this._mainCont);
        }
        this._beginCont = this.scene.add.container();
        this._beginCont.x = prevSymbol.x+3+prevSymbol.width/2;
        this._beginCont.y = prevSymbol.y+5+prevSymbol.height/2+1;
        this._beginCont.setInteractiveRect(prevSymbol.width,prevSymbol.height+2);
        this._beginCont.on('pointerup', ()=>{
            console.log('click on = ', 'begin');
            this.cursor.x = 4;
            this.index = -1;
            this.select();
        });
        const noLast = dataSymbols[0].slice(0,dataSymbols[0].length-1);
        console.log('noLast = ', noLast);
        noLast.forEach((d,i)=>{
            const cont = this.scene.add.container();
            cont.x = d.x+3+d.width/2+prevSymbol.width;
            cont.y = d.y+5+d.height/2+1;
            cont.setInteractiveRect(d.width,d.height+2);
            cont.on('pointerup', ()=>{
                console.log('click on = ', d.symbol);
                this.cursor.x = d.x+d.width+4+(4*i);
                this.index = i;
                this.select();
            });
            this.conts.push(cont);
        });

        this._mainCont = this.scene.add.container(0+this.width/2,0+this.height/2);
        this._mainCont.setInteractiveRect(this.width,this.height);
        this._mainCont.on('pointerup', ()=>{
            console.log('contMain = ');
            this.cursor.x = this.textEl.width+4;
            this.index = dataSymbols[0].length;
            this.select();
        });
    }

    select(){
        this.isSelect = true;
        this.borderGraphics.lineWidth(2);
        this.borderGraphics.strokeStyle('black');
        this.borderGraphics.strokeRect(0,0,this.width,this.height);
    }

    ofSelect(){
        this.isSelect = false;
        this.borderGraphics.lineWidth(1);
        this.borderGraphics.strokeStyle('black');
        this.borderGraphics.strokeRect(0,0,this.width,this.height);
        this.cursor.alpha = 0;
    }

    updateCursor(){
        if(this.cursor.alpha>0){
            this.cursor.alpha = 0;
        }else if(this.select){
            this.cursor.alpha = 1;
        }
    }
}