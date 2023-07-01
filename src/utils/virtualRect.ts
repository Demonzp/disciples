/*
x0,y0-----x1,y1
|         |
|         |
x3,y3-----x2,y2
*/
export default class VirtualRect{
    x0=0;
    y0=0;
    x1=0;
    y1=0;
    x2=0;
    y2=0;
    x3=0;
    y3=0;
    angle = 0;
    halfWidth = 0;
    halfHeight = 0;
    private _scaleX = 1;
    private _scaleY = 1;
    constructor( width:number, height:number, public x=0, public y=0){
        this.halfWidth = width/2;
        this.halfHeight = height/2;
        this.calcRect();
    }

    set rotate(value: number){
        this.angle = value;
        this.calcRect();
    }

    set scaleX(value: number){
        this._scaleX = value;
        this.calcAfterScale();
    }

    get scaleX():number{
        return this._scaleX;
    }

    set scaleY(value: number){
        this._scaleY = value;
        this.calcAfterScale();
    }

    get scaleY():number{
        return this._scaleY;
    }

    moveX(value: number){
        this.x = value;
        this.calcRect();
        this.calcAfterScale();
    }

    moveY(value: number){
        this.y = value;
        this.calcRect();
        this.calcAfterScale();
    }

    private calcAfterScale(){
        this.y0 = ((this.y0-this.y)*this._scaleX)+this.y;
        this.y1 = ((this.y1-this.y)*this._scaleX)+this.y;
        this.y2 = ((this.y2-this.y)*this._scaleX)+this.y;
        this.y3 = ((this.y3-this.y)*this._scaleX)+this.y;

        this.x0 = ((this.x0-this.x)*this.scaleY)+this.x;
        this.x1 = ((this.x1-this.x)*this.scaleY)+this.x;
        this.x2 = ((this.x2-this.x)*this.scaleY)+this.x;
        this.x3 = ((this.x3-this.x)*this.scaleY)+this.x;
    }

    private calcRect(){
        const rad = this.angle * Math.PI/180;
        const kX = Math.cos(rad);
        const kY = Math.sin(rad);
        // const startCalcX = startX*kX-startY*kY;
        // const startCalcY = startX*kY+startY*kX;
        const calcX0 = this.x - this.halfWidth;
        const calcX1 = this.x + this.halfWidth;
        const calcY0 = this.y-this.halfHeight;
        const calcY1 = this.y+this.halfHeight;
        this.x0 = ((calcX0-this.x)*kX-(calcY0-this.y)*kY)+this.x;
        this.x1 = ((calcX1-this.x)*kX-(calcY0-this.y)*kY)+this.x;
        this.x2 = ((calcX1-this.x)*kX-(calcY1-this.y)*kY)+this.x;
        this.x3 = ((calcX0-this.x)*kX-(calcY1-this.y)*kY)+this.x;
        this.y0 = ((calcX0-this.x)*kY+(calcY0-this.y)*kX)+this.y;
        this.y1 = ((calcX1-this.x)*kY+(calcY0-this.y)*kX)+this.y;
        this.y2 = ((calcX1-this.x)*kY+(calcY1-this.y)*kX)+this.y;
        this.y3 = ((calcX0-this.x)*kY+(calcY1-this.y)*kX)+this.y;
    }

}