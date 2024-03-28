import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import BaseMainGameMenu from "./BaseMainGameMenu";

export default class QueueArenaMenu extends BaseMainGameMenu{
    //private container: Container;
    private fon: Sprite;
    constructor(scene:Scene){
        super(scene);
    }

    create(){
        this.container = this.scene.add.container();
        this.fon = this.scene.add.sprite('window-info');
        this.container.x = this.fon.halfWidth;
        
        this.container.add([this.fon]);
    }
}