import Sprite from "utils/gameLib/Sprite";
import { IScene } from "../scenes/IScene";
import CityPartyOut2 from "./CityPartyOut2";
import Button from "./Button";
import store from "store/store";
import ModalPropsAddUnitCity from "./ModalPropsAddUnitCity";
import CityPartyIn2 from "./CityPartyIn2";
import { closeCityParty } from "store/slices/cityParty";
import { ICity } from "store/slices/sliceGame";

export default class ModalPropertiesCityParty{
    private _fon:Sprite|undefined;
    x = 0;
    y = 0;
    cityPartyOut = new CityPartyOut2(this);
    cityPartyIn = new CityPartyIn2(this);
    modalAddUnit = new ModalPropsAddUnitCity(this);
    isPartyProps = false;
    cityData:ICity|null=null;
    private _btnOk:Button|undefined;
    constructor(public scene:IScene){
        this.scene = scene;
    }

    init(cityData:ICity){
        this.cityData = cityData;
        const cameraPoint = this.scene.game.camera.cameraPoint();
        this._fon = this.scene.add.sprite('modal-city-party');
        this._fon.setZindex(1000);
        this.x = 0+this.scene.halfWidth-cameraPoint.x;
        this.y = 0+this.scene.halfHeight-cameraPoint.y;
        this._fon.x = this.x;
        this._fon.y = this.y;
        this._btnOk = new Button(this.scene,'Ok', ()=>{
            if(this.cityPartyOut.modalAddHero.isShow&&this.cityPartyOut.modalAddHero.isShow){
                return;
            }

            if(this.modalAddUnit.isShow){
                return;
            }
            //this.hide();
            store.dispatch(closeCityParty());
            //this.parent.init(this.parent.cityData);
        });
        this._btnOk.init();
        this._btnOk.x = this.x-this._btnOk.width/2;
        this._btnOk.y = this.y+200;
        this._btnOk.setZindex(1000);
        this.isPartyProps = true;
        this.cityPartyOut.init();
        this.cityPartyIn.init();
    }

    hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
            this._btnOk.destroy();
            this.cityPartyOut.hide();
            this.cityPartyIn.hide();
        }
        this.isPartyProps = false;
    }

    updateUnits(){
        this.cityPartyOut.hide();
        this.cityPartyOut.init();
        this.cityPartyIn.hide();
        this.cityPartyIn.init();
    }
}