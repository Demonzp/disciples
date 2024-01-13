import Scene from "utils/gameLib/Scene";
import MainGameMenu from "../objects/MainGameMenu";

export default class MainGameMenuScene extends Scene{
    private mainMenu:MainGameMenu;
    constructor(){
        super('MainGameMenuScene');
    }

    create(): void {
        const fon = this.add.sprite('main-menu-fon');
        fon.x = this.halfWidth;
        fon.y = this.halfHeight;
        this.mainMenu = new MainGameMenu(this);
        // const fireflyHuman = this.add.sprite('_FIREFLY_HUMAN');
        // fireflyHuman.alpha = 0.5;
        // fireflyHuman.frameRate = 2;
        // fireflyHuman.x = 200;
        // fireflyHuman.y = 300;
        // fireflyHuman.play();
    }

    update(){
        this.mainMenu.update();
    }
}