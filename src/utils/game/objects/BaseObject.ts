import { TPointMatrix } from "../scenes/editorScene";
import { IScene } from "../scenes/IScene";

export default class BaseObject{
    constructor(protected scene:IScene, public matrixPoint:TPointMatrix, public matrixSize:TPointMatrix){

    }

    moveTo(pointerMatrix:TPointMatrix){

    }
}