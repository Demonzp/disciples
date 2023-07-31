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
        
    }
}