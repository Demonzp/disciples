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

        this._textEl = this.scene.add.text('1234', 0+3,0+5);
        //this._textEl.color = 'black';
        this.textEl.fontSize = 16;
        this.textEl.width;

        this._cursor = this.scene.add.graphics();
        this.cursor.fillStyle('black');
        this.cursor.fillRect(this.textEl.width+4,0+2,2,this.height-4);
        this.scene.timer.on(this.updateCursor,0.6,this,true);

        const dataSymbols = this.textEl.getArrSymbolData();
        const prevSymbol = dataSymbols[0][0];
        const cont = this.scene.add.container();
        cont.x = prevSymbol.x+3+prevSymbol.width/2;
        cont.y = prevSymbol.y+5+prevSymbol.height/2+1;
        cont.setInteractiveRect(prevSymbol.width,prevSymbol.height+2);
        cont.on('pointerup', ()=>{
            console.log('click on = ', 'begin');
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
            });
        });

        const contMain = this.scene.add.container(0+this.width/2,0+this.height/2);
        contMain.setInteractiveRect(this.width,this.height);
        contMain.on('pointerup', ()=>{
            console.log('contMain = ');
            this.cursor.x = this.textEl.width+4;
        });

        console.log('data = ', dataSymbols);

        
    }

    updateCursor(){
        if(this.cursor.alpha>0){
            this.cursor.alpha = 0;
        }else{
            this.cursor.alpha = 1;
        }
    }
}