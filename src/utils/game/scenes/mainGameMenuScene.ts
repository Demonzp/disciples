import Scene from "utils/gameLib/Scene";
import MainGameMenu from "../objects/MainGameMenu";
import store from "store/store";
import { setReadyScene } from "store/slices/sliceGame";
import MultiplayerGameMenu from "../objects/MultiplayerGameMenu";
import ArenaGameMenu from "../objects/ArenaGameMenu";

export default class MainGameMenuScene extends Scene{
    mainMenu:MainGameMenu;
    multiplayerMenu:MultiplayerGameMenu;
    arenaMenu:ArenaGameMenu;
    constructor(){
        super('MainGameMenuScene');
    }

    create(): void {
        const fon = this.add.sprite('main-menu-fon');
        fon.x = this.halfWidth;
        fon.y = this.halfHeight;
        this.mainMenu = new MainGameMenu(this);
        this.multiplayerMenu = new MultiplayerGameMenu(this);
        this.arenaMenu = new ArenaGameMenu(this);
        //this.arenaMenu.create();
        store.dispatch(setReadyScene());
    }

    update(){
        this.mainMenu.update();
        this.multiplayerMenu.update();
    }
}