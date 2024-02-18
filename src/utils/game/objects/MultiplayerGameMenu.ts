import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import MainMenuButton from "./MainMenuButton";

export default class MultiplayerGameMenu extends BaseMainGameMenu{
    private btn_exit:MainMenuButton;

    constructor(scene: Scene){
        super(scene);
    }

    create(){
        this.hideHook = this.hidden.bind(this);
        this.maxY = 63-63/2;
        this.container = this.scene.add.container();
        this.container.x = 650;
        this.container.y = -63*2-63/2;
        this.btn_exit = new MainMenuButton(this.scene, 0, 60*2, 'EXIT', ()=>{
            //store.dispatch(setScene('mainMenu'));
        });

        
        this.container.data = 'main cont';
        
        //this.container.add([this.btn_single.container]);
        this.container.add([this.btn_exit.container]);
        this.isAnimate = true;
        this.isShow = true;
    }

    hidden(){
        console.log('MultiplayerGameMenu hidden');
    }
}