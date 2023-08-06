import Text from "utils/gameLib/Text";
import { IScene } from "../scenes/IScene";
import Sprite from "utils/gameLib/Sprite";
import Button from "./Button";

export default class ModalMessage{
    private _textEl: Text|undefined;
    private _fon: Sprite|undefined;
    private _btnOk: Button|undefined;
    private _textElHead: Text|undefined;
    constructor(public scene:IScene, public onOK:()=>void){
    }

    init(text:string){
        const cameraPoint = this.scene.game.camera.cameraPoint();
        const x = 0+this.scene.halfWidth-cameraPoint.x;
        const y = 0+this.scene.halfHeight-cameraPoint.y;
        this._fon = this.scene.add.sprite('modal-message');
        this._fon.x = x;
        this._fon.y = y;
        this._btnOk = new Button(this.scene,'Ok',this.destroy.bind(this));
        this._btnOk.init();
        this._btnOk.x = x;
        this._btnOk.y = y+150;
        this._textElHead = this.scene.add.text('MESSAGE');
        this._textElHead.x = x-200;
        this._textElHead.y = y-180;
        this._textEl = this.scene.add.text(text);
        this._textEl.x = x-200;
        this._textEl.y = y-140;
        //this._fon.setZindex(1500);
    }

    destroy(){
        this.onOK();
        this.scene.add.remove(this._fon);
        this.scene.add.remove(this._textElHead);
        this.scene.add.remove(this._textEl);
        this._btnOk.destroy();
    }
}