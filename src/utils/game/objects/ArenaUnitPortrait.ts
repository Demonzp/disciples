import { IUnit, portretPartyOneData } from "store/slices/sliceGame";
import Container from "utils/gameLib/Container";
import { TPoint } from "utils/gameLib/Game";
import Graphics from "utils/gameLib/Graphics";
import { TPointer } from "utils/gameLib/InputEvent";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";
import { coordinats } from "./ArenaParty";

export default class ArenaUnitPortrait{
    private startPos:TPoint = {x:0,y:0};
    private sprite: Sprite;
    public container: Container;
    private hpLabel:Text;
    private hpFon:Graphics;
    public isUp = false;
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
        this.container.setInteractiveRect(this.sprite.width,this.sprite.height);
        this.hpFon = this.scene.add.graphics();
        this.hpFon.fillStyle('#dcdcde');
        this.hpFon.fillRect(-this.sprite.halfWidth,this.sprite.halfHeight,this.sprite.width,16);
        
        this.hpLabel = this.scene.add.text(`${this.unit.defaultHp}/${this.unit.hitPoints}`);
        this.hpLabel.fontSize = 12;
        this.hpLabel.y = this.sprite.halfHeight+this.hpLabel.height+3;
        this.hpLabel.x = -this.hpLabel.halfWidth;
        this.container.add([this.sprite, this.hpFon, this.hpLabel]);
        this.container.on('pointerdown', ()=>{
            this.isUp = true;
            //console.log('click on = ', this.unit.defaultName);
        });
    }

    move(pointer:TPointer){
        if(this.isUp){
            this.container.x = pointer.x;
            this.container.y = pointer.y;
        }
    }

    drop(pointer:TPointer){
        if(!this.isUp){
            return;
        }
        this.isUp = false;

    }
}