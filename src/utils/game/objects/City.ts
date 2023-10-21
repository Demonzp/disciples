import BaseObject from "./BaseObject";
import { TPointMatrix } from "../scenes/editorScene";
import { ICity, TTerrain } from "store/slices/sliceGame";
import { IScene } from "../scenes/IScene";
import Sprite from "utils/gameLib/Sprite";

export default class City extends BaseObject{
    private _sprite:Sprite|undefined;
    fundament:Sprite|undefined;
    isCanPut = true;
    constructor(scene:IScene, public id: string, matrixPoint:TPointMatrix, public owner:TTerrain, public lvl:number){
        super(scene, matrixPoint, [5,5]);
        
        this.create();
    }

    create(){
        this._sprite = this.scene.add.sprite(`city-${this.lvl}`);
        this._sprite.setZindex(200);
        this._sprite.play();
        //this._sprite.x = 300;
        //this._sprite.y = 300;
        this.move();
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

    move(){

        const i = this.matrixPoint[0]+2;
        const j = this.matrixPoint[1]+1;
        
        const vMatrix = this.scene.vMatrix;

        const cell = vMatrix[i][j];

        this.sprite.x = cell.x-32.18;
        this.sprite.y = cell.y-24.91;


        if(!this.isCanPut){
            if(!this.fundament){
                this.fundament = this.scene.add.sprite('fundament4x4');
                this.fundament.setZindex(this.sprite.zIndex+1);
            }
            this.fundament.x = cell.x-32.18;
            this.fundament.y = cell.y-24.91;
            this.fundament.setZindex(this.sprite.zIndex+1);
        }else{
            if(this.fundament){
                this.scene.add.remove(this.fundament);
                this.fundament = undefined;
            }
        }
    }

    updateState(data:ICity){
        //console.log('update State!!');

        this.matrixPoint = data.matrixPoint;
        this.isCanPut = data.isCanPut;
        if(this.lvl!==data.lvl){
            this.destroy();
            this.create();
        }else{
            this.move();
        }
        //this.move();
        if(data.isUp){
            this.sprite.setZindex(1000);
        }else{
            this.sprite.setZindex(200+(data.matrixPoint[0]+data.matrixPoint[1]-4));
        }
    }

    update(){

    }
}