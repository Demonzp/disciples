import { TCell, TFieldMatrix, addCapitalCity, setFieldMatrix, setPointerMatrix } from "store/slices/sliceGame";
import store from "store/store";
import Game, { TPoint } from "utils/gameLib/Game";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import CapitalCity from "../objects/CapitalCity";
import BaseObject from "../objects/BaseObject";
import { actionPointerMove, actionPointerUp, actionAddCapitalCity } from "store/actions/actionsGame";
import Graphics from "utils/gameLib/Graphics";
import City from "../objects/City";
import ModalPropertiesCapital from "../objects/ModalPropertiesCapital";
import InputEl from "../objects/InputEl";
import ModalPropertiesCity from "../objects/ModalPropertiesCity";

export type TPointMatrix = [number, number];

export default class EditorScene extends Scene {
    capitalCities: CapitalCity[] = [];
    cities: City[] = [];
    isCameraLeft = false;
    isCameraRight = false;
    isCameraUp = false;
    isCameraDown = false;
    cameraSpeed = 8;
    vMatrix: (TCell[])[] = [];
    capitalMatrix = 5;
    widthField = 0;
    heightField = 0;
    cameraMaxX = 0;
    cameraMaxY = 0;
    isSelectCasle = false;
    sizeField = 20;
    timeHoldDown = 0;
    timerHoldDown = 200;
    isPointerDown = false;
    isPointerMove = false;
    selectObj: BaseObject | null;
    widthCell = 0;
    heightCell = 0;
    halfWidthCell = 0;
    halfHeightCell = 0;
    isInit = false;
    modalPropertiesCapital:ModalPropertiesCapital = new ModalPropertiesCapital(this);
    modalPropertiesCity:ModalPropertiesCity = new ModalPropertiesCity(this);
    pointerDot: Graphics | null;
    //inputs: InputEl[] = [];

    //pointerMatrix: TPointMatrix = [0,0];
    constructor() {
        super('EditorScene');
    }

    create(): void {
        //console.log('EditorScene');
        const rectField = store.getState().game.fieldRect;
        //this.sizeField = store.getState().game.fieldMatrix.length;
        this.vMatrix = store.getState().game.fieldMatrix;
        const rectCell = store.getState().game.cellRect;
        this.sizeField = this.vMatrix.length;
        this.halfWidthCell = rectCell.halfWidth;
        this.halfHeightCell = rectCell.halfHeight;

        const graficsGrid = this.add.graphics();
        graficsGrid.strokeStyle('#02b331');
        graficsGrid.beginPath();

        graficsGrid.moveTo(rectField.x0, rectField.y0);
        graficsGrid.lineTo(rectField.x1, rectField.y1);
        graficsGrid.lineTo(rectField.x2, rectField.y2);
        graficsGrid.lineTo(rectField.x3, rectField.y3);
        graficsGrid.lineTo(rectField.x0, rectField.y0);

        for (let i = 1; i < this.sizeField; i++) {
            const t = (1 / this.sizeField) * i;
            const startPoint = this.findPointOnLinearCurve(
                {
                    x: rectField.x3,
                    y: rectField.y3,
                },
                {
                    x: rectField.x0,
                    y: rectField.y0,
                },
                t
            );

            const endPoint = this.findPointOnLinearCurve(
                {
                    x: rectField.x2,
                    y: rectField.y2,
                },
                {
                    x: rectField.x1,
                    y: rectField.y1,
                },
                t
            );

            graficsGrid.moveTo(startPoint.x, startPoint.y);
            graficsGrid.lineTo(endPoint.x, endPoint.y);
        }

        for (let i = 1; i < this.sizeField; i++) {
            const t = (1 / this.sizeField) * i;
            const startPoint = this.findPointOnLinearCurve(
                {
                    x: rectField.x3,
                    y: rectField.y3,
                },
                {
                    x: rectField.x2,
                    y: rectField.y2,
                },
                t
            );

            const endPoint = this.findPointOnLinearCurve(
                {
                    x: rectField.x0,
                    y: rectField.y0,
                },
                {
                    x: rectField.x1,
                    y: rectField.y1,
                },
                t
            );
            graficsGrid.moveTo(startPoint.x, startPoint.y);
            graficsGrid.lineTo(endPoint.x, endPoint.y);
        }
        graficsGrid.stroke();

        document.addEventListener('keydown', (e) => {
            //console.log('isOpen = ', this.modalPropertiesCapital.isOpen);
            if(this.modalPropertiesCapital.isOpen){
                this.modalPropertiesCapital.keyboardInput(e);
                return;
            }else if(this.modalPropertiesCity.isOpen){
                this.modalPropertiesCity.keyboardInput(e);
                return;
            }
            switch (e.code) {
                case 'ArrowLeft':
                    //console.log('Press a key');
                    this.isCameraLeft = true;
                    break;
                case 'ArrowRight':
                    //console.log('Press a key');
                    this.isCameraRight = true;
                    break;
            }

            switch (e.code) {
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

        document.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    //console.log('Press a key');
                    this.isCameraLeft = false;
                    break;
                case 'ArrowRight':
                    //console.log('Press a key');
                    this.isCameraRight = false;
                    break;
            }

            switch (e.code) {
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

        this.input.on('pointerdown', () => {
            this.isPointerDown = true;
            this.timeHoldDown = Date.now();
        });

        this.input.on('pointerup', (pointer) => {
            if (this.isPointerDown && !this.isPointerMove) {
                const pointMatrix = this.findFieldCell(pointer);
                this.modalPropertiesCapital.pointerUp();
                //this.inputs.forEach(inputEl => inputEl.ofSelect());
                //console.log('pointerUp = ', pointMatrix);
                if (pointMatrix) {

                    store.dispatch(actionPointerUp(pointMatrix));
                }
            }
            this.isPointerMove = false;
            this.isPointerDown = false;
        });

        this.input.on('pointermove', (pointer) => {
            const state = store.getState().game;
            if (state.editorMod === 'properties' && state.selectObj) {
                return;
            }
            const pointMatrix = this.findFieldCell(pointer);
            if (pointMatrix) {

                store.dispatch(actionPointerMove(pointMatrix));
            }
        });

        this.widthField = rectField.x1 - rectField.x3;
        this.heightField = rectField.y2 - rectField.y0;
        this.cameraMaxX = this.widthField - this.width + 80;
        this.cameraMaxY = this.heightField - this.height + 80;
        this.pointerDot = this.add.graphics();
        this.pointerDot.fillStyle('red');
        this.pointerDot.setZindex(2000);
        
        this.updateCapitals();
        this.isInit = true;

        //this.modalPropertiesCapital.init();

        //this.inputs.push(new InputEl(this));
        // this.cities.push(new City(
        //     this,
        //     'dawdawd',
        //     [1,1],
        //     'neutral',
        //     2
        // ));
    }

    findFieldCell(point: TPoint): TPointMatrix {
        const scrollX = point.x - this.game.camera.cameraPoint().x;
        const scrollY = point.y - this.game.camera.cameraPoint().y;
        //console.log('this.vMatrix = ', this.vMatrix[0][this.sizeField-1]);
        //console.log(scrollX, '||', scrollY);
        for (let i = 0; i < this.vMatrix.length; i++) {
            const row = this.vMatrix[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if ((scrollX >= cell.x - 20 && scrollX <= cell.x + 20)
                    && (scrollY >= cell.y - this.halfHeightCell && scrollY <= cell.y + this.halfHeightCell)
                ) {
                    this.pointerDot.fillRect(cell.x - 5, cell.y - 5, 10, 10);
                    return [i, j];
                    //store.dispatch(actionPointerMove([i,j]));

                }
            }
        }
    }

    findPointOnLinearCurve(startPoint: TPoint, endPoint: TPoint, t: number): TPoint {
        const x = startPoint.x + (endPoint.x - startPoint.x) * t;
        const y = startPoint.y + (endPoint.y - startPoint.y) * t;
        return { x, y };
    }

    updateCapitals() {
        const capitals = store.getState().game.capitalCities;
        if(capitals.length<this.capitalCities.length){
            for (let i = 0; i < this.capitalCities.length; i++) {
                const capitalCity = this.capitalCities[i];
                if(!capitals.find(c=>c.id===capitalCity.id)){
                    capitalCity.destroy();
                    this.capitalCities.splice(i,1);
                }
            }
        }
        capitals.forEach(c => {
            const castle = this.capitalCities.find(c2 => c2.id === c.id);
            if (castle) {
                castle.updateState(c);
            } else {
                //console.log('add to render new CapitalCity');
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

    updateCities() {
        const cities = store.getState().game.cities;
        //console.log('updateCities');
        if(cities.length<this.cities.length){
            for (let i = 0; i < this.cities.length; i++) {
                const city = this.cities[i];
                if(!cities.find(c=>c.id===city.id)){
                    city.destroy();
                    this.cities.splice(i,1);
                }
            }
        }

        cities.forEach(c => {
            const city = this.cities.find(c2 => c2.id === c.id);
            if (city) {
                city.updateState(c);
            } else {
                //console.log('add to render new City');
                const newCity = new City(
                    this,
                    c.id,
                    c.matrixPoint,
                    c.owner,
                    c.lvl
                );
                this.cities.push(newCity);
            }
        });
    }

    updatePointer() {
        const point = store.getState().game.pointerMatrix;
        if (this.selectObj) {
            this.selectObj.moveTo(point);
        }
    }

    updateUnits(){
        this.modalPropertiesCapital.updateUnits();
        this.modalPropertiesCity.updateUnits();
    }

    updateCityParty(){
        const cityParty = store.getState().cityParty;
        if(cityParty.isOpen){
            const gameState = store.getState().game;
            const city = gameState.cities[gameState.selectObj.idx];
            this.modalPropertiesCity.init(city);
        }
    }

    // updateProperties(){
    //     const gameState = store.getState().game;
    //     if(gameState.editorMod==='properties'&&gameState.selectObj){
    //         console.log('render Properties');
    //     }else{
    //         console.log('hide Properties');
    //     }
    // }

    openProperties() {
        const gameState = store.getState().game;
        if (gameState.editorMod === 'properties' && gameState.selectObj) {
            if (gameState.selectObj.type === 'capitalCity') {
                //console.log('properties of capital');
                const capital = gameState.capitalCities[gameState.selectObj.idx];
                //console.log('gold = ',capital.gold);
                this.modalPropertiesCapital.init(capital);
            }else if(gameState.selectObj.type === 'city'){
                const city = gameState.cities[gameState.selectObj.idx];
                this.modalPropertiesCity.init(city);
            }
        } else {
            this.modalPropertiesCapital.hide();
            this.modalPropertiesCity.hide();
        }

    }

    update(_: number): void {
        const camera = this.game.camera;

        if (this.isCameraDown) {

            // const casl = this.cities[0];
            // casl.sprite.y+=1;
            // console.log('5,5 = ', this.vMatrix[3][2]);
            // console.log(casl.sprite.x,'|',casl.sprite.y);
            // return;
            this.game.camera.scrollY(camera.cameraPoint().y - this.cameraSpeed);
            if (camera.cameraPoint().y < -this.cameraMaxY) {
                this.game.camera.scrollY(-this.cameraMaxY);
            }

        } else if (this.isCameraUp) {
            // if(this.isSelectCasle){
            //     this.empCastle.y -= 1;
            //     console.log('5,5 = ', this.vMatrix[5][5]);
            //     console.log(this.empCastle.x,'|',this.empCastle.y);
            //     return;
            // }
            // const casl = this.cities[0];
            // casl.sprite.y-=1;
            // console.log('5,5 = ', this.vMatrix[3][2]);
            // console.log(casl.sprite.x,'|',casl.sprite.y);
            // return;
            this.game.camera.scrollY(camera.cameraPoint().y + this.cameraSpeed);
            if (camera.cameraPoint().y > 80) {
                this.game.camera.scrollY(80);
            }
        }

        if (this.isCameraLeft) {
            // if(this.isSelectCasle){
            //     this.empCastle.x -= 1;
            //     console.log('5,5 = ', this.vMatrix[5][5]);
            //     console.log(this.empCastle.x,'|',this.empCastle.y);
            //     return;
            // }
            // const casl = this.cities[0];
            // casl.sprite.x-=1;
            // console.log('5,5 = ', this.vMatrix[3][2]);
            // console.log(casl.sprite.x,'|',casl.sprite.y);
            // return;
            this.game.camera.scrollX(camera.cameraPoint().x + this.cameraSpeed);
            if (camera.cameraPoint().x > 80) {
                this.game.camera.scrollX(80);
            }
        } else if (this.isCameraRight) {
            // if(this.isSelectCasle){
            //     this.empCastle.x += 1;
            //     console.log('5,5 = ', this.vMatrix[5][5]);
            //     console.log(this.empCastle.x,'|',this.empCastle.y);
            //     return;
            // }
            // const casl = this.cities[0];
            // casl.sprite.x+=1;
            // console.log('5,5 = ', this.vMatrix[3][2]);
            // console.log(casl.sprite.x,'|',casl.sprite.y);
            // return;
            this.game.camera.scrollX(camera.cameraPoint().x - this.cameraSpeed);
            //console.log('cameraPointX = ', camera.cameraPoint().x);
            if (camera.cameraPoint().x < -this.cameraMaxX) {
                this.game.camera.scrollX(-this.cameraMaxX);
            }
        }

        // const cameraPoint = this.game.camera.cameraPoint();
        // this.game.camera.scrollX(cameraPoint.x+1);
    }
}