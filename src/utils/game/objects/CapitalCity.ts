import Sprite from "utils/gameLib/Sprite";
import MainScane, { TPointMatrix } from "../scenes/mainScene";
import BaseObject from "./BaseObject";

export type TCapitalRace = 'empire'|'legions'|'clans'|'elves'|'undead';

export default class CapitalCity extends BaseObject{
    private _sprite:Sprite|undefined;
    constructor(scene:MainScane, matrixPoint:TPointMatrix, public race:TCapitalRace){
        super(scene, matrixPoint, [5,5]);
        
        this.create();
    }

    create(){
        this._sprite = this.scene.add.sprite(`${this.race}-castle`);
        //const i = 
    }

    get sprite(){
        return this._sprite!;
    }
}