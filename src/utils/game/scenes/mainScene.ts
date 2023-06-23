import { addCapitalCity, setPointerMatrix } from "store/slices/sliceGame";
import store from "store/store";
import Game, { TPoint } from "utils/gameLib/Game";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import CapitalCity from "../objects/CapitalCity";
import BaseObject from "../objects/BaseObject";

export type TPointMatrix = [number,number];

export default class MainScene extends Scene{
    capitalCities:CapitalCity[] = [];
    isCameraLeft = false;
    isCameraRight = false;
    isCameraUp = false;
    isCameraDown = false;
    cameraSpeed = 8;
    vMatrix:(TPoint[])[] = [];
    capitalMatrix = 5;
    widthField = 0;
    heightField = 0;
    cameraMaxX = 0;
    cameraMaxY = 0;
    isSelectCasle = false;
    sizeField = 20;
    selectObj:BaseObject|null;
    //pointerMatrix: TPointMatrix = [0,0];
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

        // const grass = this.add.sprite('grass-water',100,100);
        // //grass.x += grass.halfWidth;
        // //grass.y +=grass.halfHeight;
        // grass.setFrame(5);
        // const grass2 = this.add.sprite('grass-water',100-48/2,100-48/2);
        // grass2.setFrame(12);
        console.log('mainScene');
        //const sizeField = 20;

        const rectCell = this.add.virtualRect(44,44);
        rectCell.rotate = 45;
        rectCell.scaleX = 0.5;
        const widthCell = rectCell.x1-rectCell.x3;
        const heightCell = rectCell.y2-rectCell.y0;
        const halfWidthCell = widthCell/2;
        const halfHeightCell = heightCell/2;
        console.log(widthCell, '||',heightCell);

        const rectangle = this.add.virtualRect(44*this.sizeField,44*this.sizeField);
        rectangle.rotate = 45;
        rectangle.scaleX = 0.5;
        this.widthField = rectangle.x1-rectangle.x3;
        this.heightField = rectangle.y2-rectangle.y0;
        this.cameraMaxX = this.widthField-this.width+80;
        this.cameraMaxY = this.heightField-this.height+80;
        rectangle.moveX(this.widthField/2);
        rectangle.moveY(this.heightField/2);

        let startX = rectangle.x0;
        let startY = rectangle.y0+halfHeightCell
        let row = [];
        for (let i = 1; i < this.sizeField+1; i++) {
            for (let j = 0; j < this.sizeField; j++) {
                const x = startX;
                const y = startY;
                row.push({x,y});
                startX-=halfWidthCell;
                startY+=halfHeightCell;
            }
            this.vMatrix.push(row);
            row = [];
            startX = rectangle.x0+halfWidthCell*i;
            startY = rectangle.y0+halfHeightCell*(i+1);
        }

        const graphicsDot = this.add.graphics();
        graphicsDot.fillStyle('red');
        graphicsDot.fillRect(0,0,10,10);

        store.dispatch(addCapitalCity({
            matrixPoint: [3,3],
            id: Game.createId(),
            race: "empire",
            squadOut: [],
            squadIn: []
        }));
        //this.empCastle = new CapitalCity(this, [1,1], 'empire');

        // this.empCastle = this.add.sprite('emp-castle');

        // this.empCastle.x = this.vMatrix[3][3].x;
        // this.empCastle.y = this.vMatrix[3][3].y-35;

        console.log('5,5 = ', this.vMatrix[5][5]);

        // this.empCastle.on('pointerup', ()=>{
        //     console.log('pointerup');
        //     this.isSelectCasle = true;
        // });

        this.input.on('pointermove', (point)=>{
            //console.log('point = ', point);
            const scrollX = point.x-this.game.camera.cameraPoint().x;
            const scrollY = point.y-this.game.camera.cameraPoint().y;
            //console.log('scroll = ', scrollX, '||', scrollY);
            for (let i = 0; i < this.vMatrix.length; i++) {
                const row = this.vMatrix[i];
                for (let j = 0; j < row.length; j++) {
                    const cell = row[j];
                    if((scrollX>=cell.x-20&&scrollX<=cell.x+20)
                        && (scrollY>=cell.y-halfHeightCell&&scrollY<=cell.y+halfHeightCell)
                    ){
                        store.dispatch(setPointerMatrix([i,j]));
                        //this.pointerMatrix = [i,j];
                        graphicsDot.fillRect(cell.x-5,cell.y-5,10,10);
                        if(this.selectObj){
                            this.selectObj.moveTo([i,j]);
                        }
                        // if(this.isSelectCasle&&i>Math.floor(this.capitalMatrix/2)&&i<this.sizeField-Math.floor(this.capitalMatrix/2)-1&&j>Math.floor(this.capitalMatrix/2)&&j<this.sizeField-Math.floor(this.capitalMatrix/2)-1){
                        //     this.empCastle.x = cell.x;
                        //     this.empCastle.y = cell.y-35;
                        // }
                    }
                }
            }
        });

        const graphicsRect3 = this.add.graphics();
        graphicsRect3.strokeStyle('#02b331');
        graphicsRect3.beginPath();
          
        graphicsRect3.moveTo(rectangle.x0, rectangle.y0);
        graphicsRect3.lineTo(rectangle.x1, rectangle.y1);
        graphicsRect3.lineTo(rectangle.x2, rectangle.y2);
        graphicsRect3.lineTo(rectangle.x3, rectangle.y3);
        graphicsRect3.lineTo(rectangle.x0, rectangle.y0);

        graphicsRect3.stroke();

        for (let i = 1; i < this.sizeField; i++) {
            const t = (1/this.sizeField)*i;
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

        for (let i = 1; i < this.sizeField; i++) {
            const t = (1/this.sizeField)*i;
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
        this.game.camera.scrollX(-this.widthField/2+this.halfWidth);
        this.game.camera.scrollY(-this.heightField/2+this.halfHeight);
        


        // const graphicsDot2 = this.add.graphics();
        // graphicsDot2.fillStyle('blue');
        // graphicsDot2.fillRect(this.vMatrix[5][5].x-5,this.vMatrix[5][5].y-5,10,10);

        graphicsDot.setZindex(2);
    }

    findPointOnLinearCurve(startPoint:TPoint, endPoint:TPoint, t:number):TPoint {
        const x = startPoint.x + (endPoint.x - startPoint.x) * t;
        const y = startPoint.y + (endPoint.y - startPoint.y) * t;
        return { x, y };
    }

    updateCapitals(){
        const capitals = store.getState().game.capitalCities;
        capitals.forEach(c=>{
            const castle = this.capitalCities.find(c2=>c2.id===c.id);
            if(castle){
                castle.update(c);
            }else{
                console.log('add to render new CapitalCity');
                const capitalCity = new CapitalCity(
                    this,
                    c.id,
                    c.matrixPoint,
                    c.race
                );
                this.capitalCities.push(capitalCity);
            }
        });
    }

    update(_: number): void {
        const camera = this.game.camera;

        if(this.isCameraDown){
            // if(this.isSelectCasle){
            //     this.empCastle.y += 1;
            //     console.log('5,5 = ', this.vMatrix[5][5]);
            //     console.log(this.empCastle.x,'|',this.empCastle.y);
            //     return;
            // }
            this.game.camera.scrollY(camera.cameraPoint().y-this.cameraSpeed);
            if(camera.cameraPoint().y<-this.cameraMaxY){
                this.game.camera.scrollY(-this.cameraMaxY);
            }
            
        }else if(this.isCameraUp){
            // if(this.isSelectCasle){
            //     this.empCastle.y -= 1;
            //     console.log('5,5 = ', this.vMatrix[5][5]);
            //     console.log(this.empCastle.x,'|',this.empCastle.y);
            //     return;
            // }
            this.game.camera.scrollY(camera.cameraPoint().y+this.cameraSpeed);
            if(camera.cameraPoint().y>80){
                this.game.camera.scrollY(80);
            }
        }

        if(this.isCameraLeft){
            // if(this.isSelectCasle){
            //     this.empCastle.x -= 1;
            //     console.log('5,5 = ', this.vMatrix[5][5]);
            //     console.log(this.empCastle.x,'|',this.empCastle.y);
            //     return;
            // }
            this.game.camera.scrollX(camera.cameraPoint().x+this.cameraSpeed);
            if(camera.cameraPoint().x>80){
                this.game.camera.scrollX(80);
            }
        }else if(this.isCameraRight){
            // if(this.isSelectCasle){
            //     this.empCastle.x += 1;
            //     console.log('5,5 = ', this.vMatrix[5][5]);
            //     console.log(this.empCastle.x,'|',this.empCastle.y);
            //     return;
            // }
            this.game.camera.scrollX(camera.cameraPoint().x-this.cameraSpeed);
            //console.log('cameraPointX = ', camera.cameraPoint().x);
            if(camera.cameraPoint().x<-this.cameraMaxX){
                this.game.camera.scrollX(-this.cameraMaxX);
            }
        }

        // const cameraPoint = this.game.camera.cameraPoint();
        // this.game.camera.scrollX(cameraPoint.x+1);
    }
}