import Sprite from "utils/gameLib/Sprite";
import { TPointMatrix } from "../scenes/editorScene";
import BaseObject from "./BaseObject";
import { ICapitalCity, TCapitalRace } from "store/slices/sliceGame";
import { IScene } from "../scenes/IScene";

export default class CapitalCity extends BaseObject{
    private _sprite:Sprite|undefined;
    fundament:Sprite|undefined;
    isCanPut = true;
    constructor(scene:IScene, public id: string, matrixPoint:TPointMatrix, public race:TCapitalRace){
        super(scene, matrixPoint, [5,5]);
        
        this.create();
    }

    create(){
        this._sprite = this.scene.add.sprite(`castle-${this.race}`);
        this._sprite.setZindex(200);
        this._sprite.play();
        //this._sprite.alpha = 0;
        this.move();
 
    }

    move(){
        //console.log('pointerMatrix = ', pointerMatrix);
        const i = this.matrixPoint[0]+2;
        const j = this.matrixPoint[1]+2;
        
        const vMatrix = this.scene.vMatrix;
        //console.log('vMatrix = ', vMatrix);
        const cell = vMatrix[i][j];
        //console.log('render!! = ', cell);
        this.sprite.x = cell.x-9;
        this.sprite.y = cell.y-45;
        //this.sprite.y = cell.y-35;

        // if(this.fundament){
        //     this.fundament.x = cell.x;
        //     this.fundament.y = cell.y-35;
        // }

        if(!this.isCanPut){
            if(!this.fundament){
                this.fundament = this.scene.add.sprite('fundament5x5');
                this.fundament.setZindex(this.sprite.zIndex+1);
            }
            this.fundament.x = cell.x;
            this.fundament.y = cell.y-35;
            this.fundament.setZindex(this.sprite.zIndex+1);
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

    destroy(){
        this.scene.add.remove(this.sprite);
        if(this.fundament){
            this.scene.add.remove(this.fundament);
        }
    }

    updateState(data:ICapitalCity){
        //console.log('update State!! CapitalCity');
        this.matrixPoint = data.matrixPoint;
        this.isCanPut = data.isCanPut;
        this.move();
        if(this.scene.modalPropertiesCapital.modalCityParty.isPartyProps){
            //console.log('update party!!');
            this.scene.modalPropertiesCapital.hide();
            this.scene.modalPropertiesCapital.init(data);
            this.scene.modalPropertiesCapital.hide();
            //this.scene.modalPropertiesCapital.modalCityParty.capitalParty.init;
            //setTimeout(()=>{
                this.scene.modalPropertiesCapital.modalCityParty.init();
            //});
            
        }
        if(data.isUp){
            this.sprite.setZindex(1000);
        }else{
            this.sprite.setZindex(200+(data.matrixPoint[0]+data.matrixPoint[1]-4));
        }
    }

    update(){

    }
}