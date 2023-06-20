import { TPoint } from "utils/gameLib/Game";
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
        fon.y = fon.y+100;
        //const graphics = this.add.graphics();
        //graphics.lineWidth(1);
        let startX = 40;
        let startY = 0;
        const step = 40;
        //graphics.beginPath();
        const rad = -60 * Math.PI/180;

        // const grass = this.add.sprite('grass-water',100,100);
        // //grass.x += grass.halfWidth;
        // //grass.y +=grass.halfHeight;
        // grass.setFrame(5);
        // const grass2 = this.add.sprite('grass-water',100-48/2,100-48/2);
        // grass2.setFrame(12);
        console.log('mainScene');
        const rectangle = this.add.virtualRect(48,48,100,100);
        rectangle.rotate = 45;
        const graphicsRect = this.add.graphics();
        graphicsRect.fillStyle('#e61010');
        graphicsRect.beginPath();
          
        graphicsRect.moveTo(rectangle.x0, rectangle.y0);
        graphicsRect.lineTo(rectangle.x1, rectangle.y1);
        graphicsRect.lineTo(rectangle.x2, rectangle.y2);
        //graphicsRect.lineTo(rectangle.x3, rectangle.y3);
        //graphicsRect.lineTo(rectangle.x0, rectangle.y0);

        graphicsRect.stroke();

        const rectangle2 = this.add.virtualRect(48,48,100,100);
        rectangle2.rotate = 0;
        const graphicsRect2 = this.add.graphics();
        graphicsRect2.fillStyle('#e61010');
        graphicsRect2.beginPath();
          
        graphicsRect2.moveTo(rectangle2.x0, rectangle2.y0);
        graphicsRect2.lineTo(rectangle2.x1, rectangle2.y1);
        graphicsRect2.lineTo(rectangle2.x2, rectangle2.y2);
        graphicsRect2.lineTo(rectangle2.x3, rectangle2.y3);
        graphicsRect2.lineTo(rectangle2.x0, rectangle2.y0);

        graphicsRect2.stroke();

        const rectangle3 = this.add.virtualRect(44*6,44*6,195,212);
        rectangle3.rotate = 45;
        rectangle3.scaleX = 0.5;
        const width = rectangle3.x1-rectangle3.x3;
        const height = rectangle3.y2-rectangle3.y0;
        console.log(width,'||',height);
        const graphicsRect3 = this.add.graphics();
        graphicsRect3.fillStyle('#e61010');
        graphicsRect3.beginPath();
          
        graphicsRect3.moveTo(rectangle3.x0, rectangle3.y0);
        graphicsRect3.lineTo(rectangle3.x1, rectangle3.y1);
        graphicsRect3.lineTo(rectangle3.x2, rectangle3.y2);
        graphicsRect3.lineTo(rectangle3.x3, rectangle3.y3);
        graphicsRect3.lineTo(rectangle3.x0, rectangle3.y0);

        graphicsRect3.stroke();

        for (let i = 1; i < 6; i++) {
            const t = (1/6)*i;
            const startPoint = this.findPointOnLinearCurve(
                {
                    x:rectangle3.x3,
                    y:rectangle3.y3,
                },
                {
                    x:rectangle3.x0,
                    y:rectangle3.y0,
                },
                t
            );

            const endPoint = this.findPointOnLinearCurve(
                {
                    x:rectangle3.x2,
                    y:rectangle3.y2,
                },
                {
                    x:rectangle3.x1,
                    y:rectangle3.y1,
                },
                t
            );

            const graphics = this.add.graphics();
            graphics.lineWidth(1);
            graphics.beginPath();
            graphics.moveTo(startPoint.x, startPoint.y);
            graphics.lineTo(endPoint.x, endPoint.y);
            graphics.stroke();
        }

        for (let i = 1; i < 6; i++) {
            const t = (1/6)*i;
            const startPoint = this.findPointOnLinearCurve(
                {
                    x:rectangle3.x3,
                    y:rectangle3.y3,
                },
                {
                    x:rectangle3.x2,
                    y:rectangle3.y2,
                },
                t
            );

            const endPoint = this.findPointOnLinearCurve(
                {
                    x:rectangle3.x0,
                    y:rectangle3.y0,
                },
                {
                    x:rectangle3.x1,
                    y:rectangle3.y1,
                },
                t
            );

            const graphics = this.add.graphics();
            graphics.lineWidth(1);
            graphics.beginPath();
            graphics.moveTo(startPoint.x, startPoint.y);
            graphics.lineTo(endPoint.x, endPoint.y);
            graphics.stroke();
        }
        // this.empCastle = this.add.sprite('emp-castle');
        // this.empCastle.x = this.empCastle.halfWidth;
        // this.empCastle.y = this.empCastle.halfHeight;
    }

    findPointOnLinearCurve(startPoint:TPoint, endPoint:TPoint, t:number):TPoint {
        const x = startPoint.x + (endPoint.x - startPoint.x) * t;
        const y = startPoint.y + (endPoint.y - startPoint.y) * t;
        return { x, y };
    }

    update(_: number): void {
        const cameraPoint = this.game.camera.cameraPoint();
        this.game.camera.scrollX(cameraPoint.x+1);
    }
}