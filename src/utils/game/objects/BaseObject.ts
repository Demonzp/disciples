import MainScane, { TPointMatrix } from "../scenes/mainScene2";

export default class BaseObject{
    constructor(protected scene:MainScane, public matrixPoint:TPointMatrix, public matrixSize:TPointMatrix){

    }

    moveTo(pointerMatrix:TPointMatrix){

    }
}