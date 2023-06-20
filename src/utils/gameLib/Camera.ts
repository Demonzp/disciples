import Game, { TPoint } from "./Game";

export default class Camera {
    private _x = 0;
    private _y = 0;
    constructor(private game: Game) { };

    scrollX(value: number) {
        //console.log('value = ', value);
        this._x = value;
    }

    scrollY(value: number) {
        this._y = value;
    }

    get cameraX() {
        return this._x;
    }

    get cameraY() {
        return this._y;
    }

    cameraPoint(): TPoint {
        return { x: this._x, y: this._y };
    }
}