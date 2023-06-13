import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class MainScane extends Scene{
    empCastle:Sprite|null = null;
    constructor(){
        super('MainScene');
    }

    create(): void {
        console.log('mainScene');
        this.empCastle = this.add.sprite('emp-castle');
        this.empCastle.x = this.empCastle.halfWidth;
        this.empCastle.y = this.empCastle.halfHeight;
    }

    update(_: number): void {
    }
}