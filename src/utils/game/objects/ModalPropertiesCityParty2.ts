import Sprite from "utils/gameLib/Sprite";
import { IScene } from "../scenes/IScene";
import CityPartyOut2 from "./CityPartyOut2";
import Button from "./Button";
import store from "store/store";
import ModalPropsAddUnitCity from "./ModalPropsAddUnitCity";
import CityPartyIn2 from "./CityPartyIn2";
import { closeCityParty } from "store/slices/cityParty";
import { ICity } from "store/slices/sliceGame";
import { TPointer } from "utils/gameLib/InputEvent";

export default class ModalPropertiesCityParty{
    private _fon:Sprite|undefined;
    x = 0;
    y = 0;
    cityPartyOut = new CityPartyOut2(this);
    cityPartyIn = new CityPartyIn2(this);
    modalAddUnit = new ModalPropsAddUnitCity(this);
    isPartyProps = false;
    idInputUp = '';
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
            //console.log();
            if(this.cityPartyOut.modalAddHero.isShow){
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
        this.idInputUp = this.scene.input.on('pointerup', this.onPointerUp, this);
        this.isPartyProps = true;
        this.cityPartyOut.init();
        this.cityPartyIn.init();
    }

    onPointerUp(pointer:TPointer){
        const {isUpPortret, sidePortret} = store.getState().cityParty;
        if(!isUpPortret){
            this.cityPartyOut.onContainer(pointer);
            this.cityPartyIn.onContainer(pointer);
        }else{
            if(sidePortret==='left'){
                this.cityPartyOut.onPortretToAny(pointer);
            }
        }

    }

    hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
            this._btnOk.destroy();
            this.cityPartyOut.hide();
            this.cityPartyIn.hide();
        }
        this.scene.input.off(this.idInputUp);
        this.isPartyProps = false;
    }

    updateUnits(){
        if(!store.getState().cityParty.isOpen){
            return;
        }
        this.cityPartyOut.hide();
        this.cityPartyOut.init();
        this.cityPartyIn.hide();
        this.cityPartyIn.init();
    }
}