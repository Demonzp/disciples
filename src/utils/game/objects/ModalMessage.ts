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
        this._fon.setZindex(1500);
    }

    destroy(){
        this.scene.add.remove(this._fon);
    }
}