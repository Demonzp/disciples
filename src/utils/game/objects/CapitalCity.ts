import Sprite from "utils/gameLib/Sprite";
import MainScane, { TPointMatrix } from "../scenes/mainScene";
import BaseObject from "./BaseObject";
import { ICapitalCity } from "store/slices/sliceGame";

export type TCapitalRace = 'empire'|'legions'|'clans'|'elves'|'undead';

export default class CapitalCity extends BaseObject{
    private _sprite:Sprite|undefined;
    fundament:Sprite|undefined;
    isCanPut = true;
    constructor(scene:MainScane, public id: string, matrixPoint:TPointMatrix, public race:TCapitalRace){
        super(scene, matrixPoint, [5,5]);
        
        this.create();
    }

    create(){
        this._sprite = this.scene.add.sprite(`${this.race}-castle`);
        this.move();
        // const i = this.matrixPoint[0]+2;
        // const j = this.matrixPoint[1]+2;
        // const vMatrix = this.scene.vMatrix;
        // if(i<this.scene.sizeField&&j<this.scene.sizeField){
            
        //     const cell = vMatrix[i][j];
        //     //console.log('render!! = ', cell);
        //     this._sprite.x = cell.x;
        //     this._sprite.y = cell.y-35;
        // }
        // this._sprite.on('pointerup', ()=>{
        //     console.log('pointerup');
        //     this.scene.selectObj = this;
        // }); 
    }

    move(){
        //console.log('pointerMatrix = ', pointerMatrix);
        const i = this.matrixPoint[0]+2;
        const j = this.matrixPoint[1]+2;
        const vMatrix = this.scene.vMatrix;
        const cell = vMatrix[i][j];
        //console.log('render!! = ', cell);
        this.sprite.x = cell.x;
        this.sprite.y = cell.y-35;

        // if(this.fundament){
        //     this.fundament.x = cell.x;
        //     this.fundament.y = cell.y-35;
        // }

        if(!this.isCanPut){
            if(!this.fundament){
                this.fundament = this.scene.add.sprite('fundament5x5');
            }
            this.fundament.x = cell.x;
            this.fundament.y = cell.y-35;
        }else{
            if(this.fundament){
                this.scene.add.remove(this.fundament);
                this.fundament = undefined;
            }
        }
    }

    get sprite(){
        return this._sprite!;
    }

    updateState(data:ICapitalCity){
        console.log('update State!!');
        this.matrixPoint = data.matrixPoint;
        this.isCanPut = data.isCanPut;
        this.move();
    }

    update(){

    }
}