import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class ModalPropertiesCapitalParty{
    private _fon: Sprite|undefined;
    x = 0;
    y = 0;
    constructor(public scene:Scene){

    }

    init(){
        const cameraPoint = this.scene.game.camera.cameraPoint();
        this._fon = this.scene.add.sprite('modal-city-party');
        const x = 0+this.scene.halfWidth-cameraPoint.x;
        const y = 0+this.scene.halfHeight-cameraPoint.y;
        this.x = x;
        this.y = y;
        this._fon.x = x;
        this._fon.y = y;
    }

    hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
        }
    }
}