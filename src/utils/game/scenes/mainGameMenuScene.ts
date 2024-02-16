import Scene from "utils/gameLib/Scene";
import MainGameMenu from "../objects/MainGameMenu";

export default class MainGameMenuScene extends Scene{
    mainMenu:MainGameMenu;
    constructor(){
        super('MainGameMenuScene');
    }

    create(): void {
        const fon = this.add.sprite('main-menu-fon');
        fon.x = this.halfWidth;
        fon.y = this.halfHeight;
        this.mainMenu = new MainGameMenu(this);
    }

    update(){
        this.mainMenu.update();
    }
}