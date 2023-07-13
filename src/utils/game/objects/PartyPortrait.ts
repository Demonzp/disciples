import { IUnit, TPartySide, portretPartyOneData } from "store/slices/sliceGame";
import CapitalParty from "./CapitalParty";
import Sprite from "utils/gameLib/Sprite";

export default class PartyPortrait{
    sprite: Sprite|undefined;
    constructor(public parent:CapitalParty, public unit:IUnit, public side: TPartySide){
        this.create();
    }

    create(){
        this.sprite = this.parent.parent.scene.add.sprite(`portrets-party-one-${this.unit.fraction}`);
        this.sprite.setFrame(portretPartyOneData[this.unit.icon]);
        this.sprite.x = this.parent.parent.x+this.parent.contPos[this.unit.position].x+1;
        this.sprite.y = this.parent.parent.y+this.parent.contPos[this.unit.position].y-10;
        this.sprite.flipX = this.side==='right'&&true;
    }
}