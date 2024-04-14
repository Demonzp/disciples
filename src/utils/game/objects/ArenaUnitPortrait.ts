import { IUnit, portretPartyOneData } from "store/slices/sliceGame";
import { TPoint } from "utils/gameLib/Game";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

const coordinats:{[key:string]:TPoint} = {
    '00':{x:220,y:49},
    '01':{x:303,y:49},
    '10':{x:220,y:154},
    '11':{x:303,y:154},
    '20':{x:220,y:260},
    '21':{x:303,y:260},
};

export default class ArenaUnitPortrait{
    private startPos:TPoint = {x:0,y:0};
    private sprite: Sprite;
    constructor(private scene:Scene, public unit:IUnit){
        this.startPos = coordinats[`${unit.position[0]}${unit.position[1]}`];
        if(unit.numCells===2){
            this.sprite = this.scene.add.sprite(`portret-units-two`,this.startPos.x,this.startPos.y);
        }else{
            this.sprite = this.scene.add.sprite(`portret-units-one-${this.unit.fraction}`,this.startPos.x,this.startPos.y);
        }
        this.sprite.setFrame(portretPartyOneData[this.unit.icon]);
    }
}