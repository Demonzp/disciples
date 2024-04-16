import { IUnit, portretPartyOneData } from "store/slices/sliceGame";
import Container from "utils/gameLib/Container";
import { TPoint } from "utils/gameLib/Game";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

const coordinats:{[key:string]:TPoint} = {
    '00':{x:219,y:49},
    '01':{x:301,y:49},
    '10':{x:219,y:154},
    '11':{x:301,y:154},
    '20':{x:219,y:260},
    '21':{x:301,y:260},
};

export default class ArenaUnitPortrait{
    private startPos:TPoint = {x:0,y:0};
    private sprite: Sprite;
    private container: Container;
    constructor(private scene:Scene, public unit:IUnit){
        this.create();
    }

    create(){
        this.startPos = coordinats[`${this.unit.position[0]}${this.unit.position[1]}`];
        this.container = this.scene.add.container(this.startPos.x,this.startPos.y);
        if(this.unit.numCells===2){
            this.container.x -= 40;
            this.sprite = this.scene.add.sprite(`portret-units-two`);
        }else{
            this.sprite = this.scene.add.sprite(`portret-units-one-${this.unit.fraction}`);
        }
        this.sprite.setFrame(portretPartyOneData[this.unit.icon]);
        this.container.add([this.sprite]);
    }
}