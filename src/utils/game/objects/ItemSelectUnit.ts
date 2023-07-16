import { IBaseUnit, IUnit, portretPartyOneData } from "store/slices/sliceGame";
import Container from "utils/gameLib/Container";
import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class ItemSelectUnit{
    private _cont:Container|undefined;
    private _portret:Sprite|undefined;
    private _border:Graphics|undefined;
    private _nameUnit:Text|undefined;
    constructor(public scene:Scene, public unit:IBaseUnit, public onClick:(data:ItemSelectUnit)=>void){

    }

    init(){
        this._cont = this.scene.add.container();
        this._cont.setInteractiveRect(306,84);
        this._portret = this.scene.add.sprite(`portrets-party-one-${this.unit.fraction}`, -115,0);
        this._portret.setFrame(portretPartyOneData[this.unit.icon]);
        this._nameUnit = this.scene.add.text(this.unit.defaultName, 2,-32);
        this._nameUnit.fontSize = 14;

        // this._border = this.scene.add.graphics();
        // this._border.strokeRect(-160, -43, 308, 86);
        this._cont.add([this._portret, this._nameUnit]);
        this._cont.on('pointerup', ()=>{
            this.onClick(this);
            //console.log('click on unit', this.unit.defaultName);
        });
    }

    setIsSelect(value:boolean){
        if(value){
            this._border = this.scene.add.graphics();
            this._border.strokeRect(-153, -43, 308, 86);
            this._cont.add(this._border);
        }else{
            if(this._border){
                this._cont.remove(this._border);
                this._border = undefined;
            }
        }
    }

    destroy(){
        if(this._cont){
            this.scene.add.remove(this._cont);
        }
    }

    setPosition(x:number, y:number){
        if(!this._cont){
            return;
        }

        this._cont.x = x;
        this._cont.y = y;
    }
}