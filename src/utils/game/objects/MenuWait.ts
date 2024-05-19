import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class MenuWait{
    private fon: Graphics;
    private sprite: Sprite;
    constructor(private scene:Scene){

    }

    create(){
        this.fon = this.scene.add.graphics();
        this.fon.fillRect(0,0, this.scene.width, this.scene.height);
        this.fon.alpha = 0.6;
        
        this.sprite = this.scene.add.sprite('cursor-wait',this.scene.halfWidth, this.scene.halfHeight);
        this.sprite.frameRate = 10;
        this.sprite.play();
    }

    destroy(){
        this.scene.add.remove([
            this.fon,
            this.sprite
        ]);
    }
}