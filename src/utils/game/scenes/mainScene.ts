import { TPoint } from "utils/gameLib/Game";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class MainScane extends Scene{
    empCastle:Sprite|null = null;
    isCameraLeft = false;
    isCameraRight = false;
    isCameraUp = false;
    isCameraDown = false;
    constructor(){
        super('MainScene');
    }

    create(): void {
        //for (let i = 0; i < 200; i++) {
            // const fon = this.add.sprite('map-grid');
            // fon.x = fon.x+fon.halfWidth;
            // fon.y = fon.y+100;   
        //}
        
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
        const sizeField = 48;
        const rectangle = this.add.virtualRect(44*sizeField,44*sizeField,195,212);
        rectangle.rotate = 45;
        rectangle.scaleX = 0.5;
        const width = rectangle.x1-rectangle.x3;
        const height = rectangle.y2-rectangle.y0;
        rectangle.moveX(width/2);
        rectangle.moveY(height/2);

        console.log(width,'||',height);
        const graphicsRect3 = this.add.graphics();
        graphicsRect3.fillStyle('#e61010');
        graphicsRect3.beginPath();
          
        graphicsRect3.moveTo(rectangle.x0, rectangle.y0);
        graphicsRect3.lineTo(rectangle.x1, rectangle.y1);
        graphicsRect3.lineTo(rectangle.x2, rectangle.y2);
        graphicsRect3.lineTo(rectangle.x3, rectangle.y3);
        graphicsRect3.lineTo(rectangle.x0, rectangle.y0);

        graphicsRect3.stroke();

        for (let i = 1; i < sizeField; i++) {
            const t = (1/sizeField)*i;
            const startPoint = this.findPointOnLinearCurve(
                {
                    x:rectangle.x3,
                    y:rectangle.y3,
                },
                {
                    x:rectangle.x0,
                    y:rectangle.y0,
                },
                t
            );

            const endPoint = this.findPointOnLinearCurve(
                {
                    x:rectangle.x2,
                    y:rectangle.y2,
                },
                {
                    x:rectangle.x1,
                    y:rectangle.y1,
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

        for (let i = 1; i < sizeField; i++) {
            const t = (1/sizeField)*i;
            const startPoint = this.findPointOnLinearCurve(
                {
                    x:rectangle.x3,
                    y:rectangle.y3,
                },
                {
                    x:rectangle.x2,
                    y:rectangle.y2,
                },
                t
            );

            const endPoint = this.findPointOnLinearCurve(
                {
                    x:rectangle.x0,
                    y:rectangle.y0,
                },
                {
                    x:rectangle.x1,
                    y:rectangle.y1,
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
        document.addEventListener('keydown',(e)=>{
            switch(e.code) {
                case 'ArrowLeft':
                    //console.log('Press a key');
                    this.isCameraLeft = true;
                    break;
                case 'ArrowRight':
                    //console.log('Press a key');
                    this.isCameraRight = true;
                    break;
            }

            switch(e.code) {
                case 'ArrowUp':
                    //console.log('Press a key');
                    this.isCameraUp = true;
                    break;
                case 'ArrowDown':
                    //console.log('Press a key');
                    this.isCameraDown = true;
                    break;
            }
        });

        document.addEventListener('keyup',(e)=>{
            switch(e.code) {
                case 'ArrowLeft':
                    //console.log('Press a key');
                    this.isCameraLeft = false;
                    break;
                case 'ArrowRight':
                    //console.log('Press a key');
                    this.isCameraRight = false;
                    break;
            }

            switch(e.code) {
                case 'ArrowUp':
                    //console.log('Press a key');
                    this.isCameraUp = false;
                    break;
                case 'ArrowDown':
                    //console.log('Press a key');
                    this.isCameraDown = false;
                    break;
            }
        });
        //const cameraPoint = this.game.camera.cameraPoint();
        this.game.camera.scrollX(-width/2+this.halfWidth);
        this.game.camera.scrollY(-height/2+this.halfHeight);
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
        const camera = this.game.camera;

        if(this.isCameraDown){
            this.game.camera.scrollY(camera.cameraPoint().y-4);
            
            
        }else if(this.isCameraUp){
            this.game.camera.scrollY(camera.cameraPoint().y+4);
            if(camera.cameraPoint().y>60){
                this.game.camera.scrollY(60);
            }
        }

        if(this.isCameraLeft){
            this.game.camera.scrollX(camera.cameraPoint().x+4);
            if(camera.cameraPoint().x>60){
                this.game.camera.scrollX(60);
            }
        }else if(this.isCameraRight){
            this.game.camera.scrollX(camera.cameraPoint().x-4);
            
        }

        // const cameraPoint = this.game.camera.cameraPoint();
        // this.game.camera.scrollX(cameraPoint.x+1);
    }
}