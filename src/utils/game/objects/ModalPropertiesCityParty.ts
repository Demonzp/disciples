import Sprite from "utils/gameLib/Sprite";
import { IScene } from "../scenes/IScene";
import ModalPropertiesCity from "./ModalPropertiesCity";
import CityPartyOut from "./CityPartyOut";

export default class ModalPropertiesCityParty{
    private _fon:Sprite|undefined;
    scene: IScene;
    x = 0;
    y = 0;
    cityPartyOut = new CityPartyOut(this);
    constructor(public parent:ModalPropertiesCity){
        this.scene = parent.scene;
    }

    init(){
        const cameraPoint = this.scene.game.camera.cameraPoint();
        this._fon = this.scene.add.sprite('modal-city-party');
        this._fon.setZindex(1000);
        this.x = 0+this.scene.halfWidth-cameraPoint.x;
        this.y = 0+this.scene.halfHeight-cameraPoint.y;
        this._fon.x = this.x;
        this._fon.y = this.y;
        this.cityPartyOut.init();
    }

    hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
        }
    }
}