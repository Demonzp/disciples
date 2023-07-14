import { IUnit, TPartySide, portretPartyOneData } from "store/slices/sliceGame";
import CapitalParty from "./CapitalParty";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";
import Container from "utils/gameLib/Container";
import { TPoint } from "utils/gameLib/Game";

export default class PartyPortrait {
    sprite: Sprite | undefined;
    hitPoints: Text | undefined;
    cont: Container | undefined;
    isCanMove = false;
    startPoint: TPoint = { x: 0, y: 0 };
    constructor(public parent: CapitalParty, public unit: IUnit, public side: TPartySide) {
        this.create();
    }

    create() {
        this.cont = this.parent.parent.scene.add.container(this.parent.parent.x + this.parent.contPos[this.unit.position].x, this.parent.parent.y + this.parent.contPos[this.unit.position].y);
        this.cont.setInteractiveRect(70, 95);
        this.cont.setZindex(1001);
        this.sprite = this.parent.parent.scene.add.sprite(`portrets-party-one-${this.unit.fraction}`);
        this.sprite.setFrame(portretPartyOneData[this.unit.icon]);
        this.sprite.x = +1;
        this.sprite.y = -10;
        // this.sprite.x = this.parent.parent.x+this.parent.contPos[this.unit.position].x+1;
        // this.sprite.y = this.parent.parent.y+this.parent.contPos[this.unit.position].y-10;
        this.sprite.flipX = this.side === 'right' && true;


        this.hitPoints = this.parent.parent.scene.add.text(`${String(this.unit.hitPoints)}/${String(this.unit.hitPoints)}`);
        this.hitPoints.color = 'white';
        this.hitPoints.x = -this.hitPoints.width / 2;
        this.hitPoints.y = +46;
        // this.hitPoints.x = this.parent.parent.x+this.parent.contPos[this.unit.position].x-this.hitPoints.width/2;
        // this.hitPoints.y = this.parent.parent.y+this.parent.contPos[this.unit.position].y+46;

        this.cont.add([this.sprite, this.hitPoints]);
        this.cont.on('pointerdown', (pointer) => {
            this.isCanMove = true;
            this.startPoint.x = this.cont.x - pointer.x;
            this.startPoint.y = this.cont.y - pointer.y;
        });

        // this.parent.parent.scene.input.on('pointermove',(pointer)=>{
        //     if(!this.isCanMove){
        //         return;
        //     }
        //     this.cont.x = pointer.x+this.startPoint.x;
        //     this.cont.y = pointer.y+this.startPoint.y;
        // });

        // this.parent.parent.scene.input.on('pointerup',(pointer)=>{
        //     if(!this.isCanMove){
        //         return;
        //     }
        //     this.parent.dropPortrait(pointer,this);
        //     this.isCanMove = false;
        // });

        // this.cont.on('pointermove', (pointer)=>{
        //     if(!this.isCanMove){
        //         return;
        //     }
        //     this.cont.x = pointer.x+this.startPoint.x;
        //     this.cont.y = pointer.y+this.startPoint.y;
        // });
    }

    move(point: TPoint) {
        if (!this.isCanMove) {
            return;
        }

        this.cont.x = point.x + this.startPoint.x;
        this.cont.y = point.y + this.startPoint.y;
    }

    drop(point: TPoint) {
        if (!this.isCanMove) {
            return;
        }
        this.parent.dropPortrait(point, this);
        this.isCanMove = false;
    }
}