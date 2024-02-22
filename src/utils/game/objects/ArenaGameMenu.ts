import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import Sprite from "utils/gameLib/Sprite";
import MainMenuButton from "./MainMenuButton";
import store from "store/store";
import { setMenuType } from "store/slices/sliceMenuGame";

export default class ArenaGameMenu extends BaseMainGameMenu{
    private windowInfo:Sprite;
    private btn_lobby: MainMenuButton;
    private btn_to_battle: MainMenuButton;
    private btn_exit: MainMenuButton;
    constructor(scene:Scene){
        super(scene);
        this.showHook = this.showed.bind(this);
    }

    create(){
        this.hideHook = this.hidden.bind(this);
        this.maxY = 63-63/2;
        this.container = this.scene.add.container();
        this.container.x = 700;
        this.container.y = -63*2-63/2;
        this.btn_lobby = new MainMenuButton(this.scene, 0, 0, 'CREATE LOBBY');
        this.btn_to_battle = new MainMenuButton(this.scene, 0, 60, 'TO BATTLE');
        this.btn_exit = new MainMenuButton(this.scene, 0, 60*2, 'EXIT', ()=>{
            this.hideCallback = ()=>store.dispatch(setMenuType('multiplayer'));
            this.hide();
        }); 
        this.container.data = 'main cont';
        this.container.add([this.btn_exit.container, this.btn_lobby.container, this.btn_to_battle.container]);
        this.isAnimate = true;
        this.isShow = true;
    }

    showed(){
        this.windowInfo = this.scene.add.sprite('window-info');
        //this.windowInfo.setZindex(-1);
        this.windowInfo.x +=this.windowInfo.halfWidth;
        this.windowInfo.y +=this.windowInfo.halfHeight;
        this.container.setZindex(1);
    }

    hidden(){
        this.btn_lobby.destroy();
        this.btn_to_battle.destroy();
        this.btn_exit.destroy();
        this.scene.add.remove(this.windowInfo);
        this.hideCallback();
    }
}