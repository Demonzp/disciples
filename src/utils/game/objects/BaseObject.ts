import MainScane, { TPointMatrix } from "../scenes/editorScene";

export default class BaseObject{
    constructor(protected scene:MainScane, public matrixPoint:TPointMatrix, public matrixSize:TPointMatrix){

    }

    moveTo(pointerMatrix:TPointMatrix){

    }
}