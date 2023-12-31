import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";
import ModalPropertiesCapital from "./ModalPropertiesCapital";
import CapitalParty from "./CapitalParty";
import Button from "./Button";
import ModalPropertiesAddUnit from "./ModalPropertiesAddUnit";

export default class ModalPropertiesCapitalParty{
    private _fon: Sprite|undefined;
    private _fonAddLeader: Graphics|undefined;
    private _textAddLeader: Text|undefined;
    capitalParty = new CapitalParty(this);
    private _btnOk:Button|undefined;
    modalAddUnit = new ModalPropertiesAddUnit(this);
    isPartyProps = false;
    scene:Scene;
    x = 0;
    y = 0;
    constructor(public parent:ModalPropertiesCapital){
        this.scene = parent.scene;
    }

    init(){
        const capitalData = this.parent.capitalData;
        const cameraPoint = this.scene.game.camera.cameraPoint();
        this._fon = this.scene.add.sprite('modal-city-party');
        this._fon.setZindex(1000);
        const x = 0+this.scene.halfWidth-cameraPoint.x;
        const y = 0+this.scene.halfHeight-cameraPoint.y;
        this.x = x;
        this.y = y;
        this._fon.x = x;
        this._fon.y = y;
        this.capitalParty.init();
        if(!capitalData.squadOut){
            this._fonAddLeader = this.scene.add.graphics();
            this._fonAddLeader.fillStyle('#7b786b');
            this._fonAddLeader.fillRect(x-364,y-185,154,320);
            this._fonAddLeader.setZindex(1000);
            this._textAddLeader = this.scene.add.text('In capital city you can not create a party',0,0,148);
            this._textAddLeader.fontSize = 16;
            this._textAddLeader.x = x-364+(154-this._textAddLeader.width)/2;
            this._textAddLeader.y = y-185+this._textAddLeader.height+6;
            this._textAddLeader.setZindex(1000);
        }
        this._btnOk = new Button(this.scene,'Ok', ()=>{
            if(this.modalAddUnit.isShow){
                return;
            }
            this.hide();
            this.parent.init(this.parent.capitalData);
        });
        this._btnOk.init();
        this._btnOk.x = x-this._btnOk.width/2;
        this._btnOk.y = y+200;
        this._btnOk.setZindex(1000);
        this.isPartyProps = true;
    }

    hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
            this.scene.add.remove(this._fonAddLeader);
            this.scene.add.remove(this._textAddLeader);
            this.capitalParty.hide();
            this._btnOk.destroy();
            //this.modalAddUnit.hide();
            this.isPartyProps = false;
        }
    }

    updateUnits(){
        console.log('updateUnits');
        this.capitalParty.hide();
        this.capitalParty.init();
    }
}