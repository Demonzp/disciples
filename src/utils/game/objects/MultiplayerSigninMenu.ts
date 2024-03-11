import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import MainMenuButton from "./MainMenuButton";
import store from "store/store";
import { setMenuType } from "store/slices/sliceMenuGame";

export default class MultiplayerSigninMenu extends BaseMainGameMenu{
    private btnExit: MainMenuButton;
    constructor(scene:Scene){
        super(scene);
    }

    create(){
        this.hideHook = this.hidden.bind(this);
        this.maxY = 63/2;
        this.container = this.scene.add.container();
        this.container.x = 700;
        this.container.y = -63;
        this.btnExit = new MainMenuButton(this.scene, 0,0,'EXIT',()=>{
            //console.log('MultiplayerSigninMenu EXIT');
            this.hideCallback = ()=>store.dispatch(setMenuType('main'));
            this.hide();
        });
        //this.container.data = 'main cont';

        this.container.add(this.btnExit.container);
        this.isAnimate = true;
        this.isShow = true;
    }

    hidden(){
        this.btnExit.destroy();
        console.log('MultiplayerSigninMenu hidden');
        this.hideCallback();
    }
}