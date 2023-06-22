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
        const i = this.matrixPoint[0]+2;
        const j = this.matrixPoint[1]+2;
        const vMatrix = this.scene.vMatrix;
        if(i<this.scene.sizeField&&j<this.scene.sizeField){
            
            const cell = vMatrix[i][j];
            console.log('render!! = ', cell);
            this._sprite.x = cell.x;
            this._sprite.y = cell.y-35;
        }
        //const i = 
    }

    moveTo(pointerMatrix:TPointMatrix){

    }

    get sprite(){
        return this._sprite!;
    }
}