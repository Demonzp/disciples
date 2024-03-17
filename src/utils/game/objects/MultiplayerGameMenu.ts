import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import MainMenuButton from "./MainMenuButton";
import store from "store/store";
import { setMenuType } from "store/slices/sliceMenuGame";
import Sprite from "utils/gameLib/Sprite";
import { setLogout } from "store/slices/sliceMultiplayer";

export default class MultiplayerGameMenu extends BaseMainGameMenu{
    private btn_exit:MainMenuButton;
    private btn_arena:MainMenuButton;
    private btn_logout:Sprite;
    constructor(scene: Scene){
        super(scene);
    }

    create(){
        this.hideHook = this.hidden.bind(this);
        this.showHook = this.createLogout.bind(this);
        this.maxY = 63/2;
        this.container = this.scene.add.container();
        this.container.x = 700;
        this.container.y = -63*2-63/2;
        this.btn_arena = new MainMenuButton(this.scene, 0, 0, 'ARENA', ()=>{
            this.hideCallback = ()=>store.dispatch(setMenuType('arena-menu'));
            this.hide();
        });

        this.btn_exit = new MainMenuButton(this.scene, 0, 60, 'EXIT', ()=>{
            this.hideCallback = ()=>store.dispatch(setMenuType('main'));
            this.hide();
        });

        this.container.data = 'main cont';
        
        //this.container.add([this.btn_single.container]);
        this.container.add([this.btn_exit.container, this.btn_arena.container]);
        this.isAnimate = true;
        this.isShow = true;
    }

    createLogout(){
        this.btn_logout = this.scene.add.sprite('big-bnt', 700, this.scene.height-63);
        this.btn_logout.on('pointerup',()=>{
            this.hideCallback = ()=>store.dispatch(setLogout(true));
            this.hide();
            //console.log('btn_logout');
            //store.dispatch(setLogout(true));
        });
    }

    hidden(){
        this.btn_arena.destroy();
        this.btn_exit.destroy();
        this.scene.add.remove(this.btn_logout);
        console.log('MultiplayerGameMenu hidden');
        this.hideCallback();
    }
}