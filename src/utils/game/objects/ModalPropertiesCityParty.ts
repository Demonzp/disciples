import Sprite from "utils/gameLib/Sprite";
import { IScene } from "../scenes/IScene";
import ModalPropertiesCity from "./ModalPropertiesCity";
import CityPartyOut from "./CityPartyOut";
import Button from "./Button";
import store from "store/store";

export default class ModalPropertiesCityParty{
    private _fon:Sprite|undefined;
    scene: IScene;
    x = 0;
    y = 0;
    cityPartyOut = new CityPartyOut(this);
    private _btnOk:Button|undefined;
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
        this._btnOk = new Button(this.scene,'Ok', ()=>{
            if(this.parent.modalCityParty.cityPartyOut.modalAddHero&&this.parent.modalCityParty.cityPartyOut.modalAddHero.isShow){
                return;
            }
            this.hide();
            this.parent.init(this.parent.cityData);
        });
        this._btnOk.init();
        this._btnOk.x = this.x-this._btnOk.width/2;
        this._btnOk.y = this.y+200;
        this._btnOk.setZindex(1000);
        this.cityPartyOut.init();
    }

    hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
            this._btnOk.destroy();
            this.cityPartyOut.hide();
            //this.parent._hide();
        }
    }
}