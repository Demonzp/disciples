import Scene from "utils/gameLib/Scene";
import MainGameMenu from "../objects/MainGameMenu";
import store from "store/store";
import { setReadyScene } from "store/slices/sliceGame";
import MultiplayerGameMenu from "../objects/MultiplayerGameMenu";
import ArenaGameMenu from "../objects/ArenaGameMenu";
import MultiplayerSigninMenu from "../objects/MultiplayerSigninMenu";
import ProfileMenu from "../objects/ProfileMenu";
import QueueArenaMenu from "../objects/QueueArenaMenu";
import ArenaManagerMenu from "../objects/ArenaManagerMenu";

export default class MainGameMenuScene extends Scene{
    mainMenu:MainGameMenu;
    multiplayerSigninMenu:MultiplayerSigninMenu;
    multiplayerMenu:MultiplayerGameMenu;
    profileMenu: ProfileMenu;
    arenaMenu:ArenaGameMenu;
    queueArenaMenu:QueueArenaMenu;
    arenaManagerMenu: ArenaManagerMenu;
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
        this.multiplayerSigninMenu = new MultiplayerSigninMenu(this);
        this.profileMenu = new ProfileMenu(this);
        this.queueArenaMenu = new QueueArenaMenu(this);
        this.arenaManagerMenu = new ArenaManagerMenu(this);
        //this.profileMenu.create();
        //this.arenaMenu.create();
        store.dispatch(setReadyScene());
    }

    update(){
        this.mainMenu.update();
        this.multiplayerMenu.update();
        this.arenaMenu.update();
        this.multiplayerSigninMenu.update();
        this.profileMenu.update();
        this.queueArenaMenu.update();
        this.arenaManagerMenu.update();
    }
}