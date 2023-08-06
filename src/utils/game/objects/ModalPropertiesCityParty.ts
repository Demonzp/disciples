import Sprite from "utils/gameLib/Sprite";
import { IScene } from "../scenes/IScene";
import ModalPropertiesCity from "./ModalPropertiesCity";

export default class ModalPropertiesCityParty{
    private _fon:Sprite|undefined;
    scene: IScene;
    constructor(public parent:ModalPropertiesCity){
        this.scene = parent.scene;
    }

    init(){
        const cameraPoint = this.scene.game.camera.cameraPoint();
        this._fon = this.scene.add.sprite('modal-city-party');
        this._fon.setZindex(1000);
        const x = 0+this.scene.halfWidth-cameraPoint.x;
        const y = 0+this.scene.halfHeight-cameraPoint.y;
    }

    hide(){

    }
}