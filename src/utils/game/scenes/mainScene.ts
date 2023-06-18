import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class MainScane extends Scene{
    empCastle:Sprite|null = null;
    constructor(){
        super('MainScene');
    }

    create(): void {
        const fon = this.add.sprite('map-grid');
        fon.x = fon.x+fon.halfWidth;
        fon.y = fon.y+fon.halfHeight;
        const graphics = this.add.graphics();
        graphics.lineWidth(1);
        let startX = 40;
        let startY = 0;
        const step = 40;
        graphics.beginPath();
        const rad = -60 * Math.PI/180;
        for (let i = 0; i < 48; i++) {
            
            
            const kX = Math.cos(rad);
            const kY = Math.sin(rad);
            const startCalcX = startX*kX-startY*kY;
            const startCalcY = startX*kY+startY*kX;
            graphics.moveTo(startCalcX, startCalcY);
            const calcY = startCalcY+48*40;
            const x = startCalcX*kX-calcY*kY;
            const y = startCalcX*kY+calcY*kX;
            graphics.lineTo(x, y);
            //startX+=step;
        }
        const kX = Math.cos(rad);
            const kY = Math.sin(rad);
            graphics.moveTo(startX, startY);
            const calcY = startY+48*40;
            const x = startX*kX-calcY*kY;
            const y = startX*kY+calcY*kX;
            graphics.lineTo(x, y);

        graphics.stroke();

        console.log('mainScene');
        this.empCastle = this.add.sprite('emp-castle');
        this.empCastle.x = this.empCastle.halfWidth;
        this.empCastle.y = this.empCastle.halfHeight;
    }

    update(_: number): void {
    }
}