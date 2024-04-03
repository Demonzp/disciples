import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import Sprite from "utils/gameLib/Sprite";

export default class ArenaManagerMenu extends BaseMainGameMenu{
    private mainSprite: Sprite;
    constructor(scene: Scene){
        super(scene);
    }

    create(){
        this.mainSprite = this.scene.add.sprite('arena-squad-menu', this.scene.halfWidth, this.scene.halfHeight);
    }
}