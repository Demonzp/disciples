import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import MainMenuButton from "./MainMenuButton";
import store from "store/store";
import { setMenuType } from "store/slices/sliceMenuGame";

export default class MultiplayerGameMenu extends BaseMainGameMenu{
    private btn_exit:MainMenuButton;
    private btn_arena:MainMenuButton;
    constructor(scene: Scene){
        super(scene);
    }

    create(){
        this.hideHook = this.hidden.bind(this);
        this.maxY = 63-63/2;
        this.container = this.scene.add.container();
        this.container.x = 700;
        this.container.y = -63*2-63/2;
        this.btn_arena = new MainMenuButton(this.scene, 0, 60, 'ARENA', ()=>{
            this.hideCallback = ()=>store.dispatch(setMenuType('arena-menu'));
            this.hide();
        });

        this.btn_exit = new MainMenuButton(this.scene, 0, 60*2, 'EXIT', ()=>{
            this.hideCallback = ()=>store.dispatch(setMenuType('main'));
            this.hide();
        });

        this.container.data = 'main cont';
        
        //this.container.add([this.btn_single.container]);
        this.container.add([this.btn_exit.container, this.btn_arena.container]);
        this.isAnimate = true;
        this.isShow = true;
    }

    hidden(){
        this.btn_arena.destroy();
        this.btn_exit.destroy();
        console.log('MultiplayerGameMenu hidden');
        this.hideCallback();
    }
}