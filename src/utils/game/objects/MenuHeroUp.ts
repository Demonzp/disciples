import Container from "utils/gameLib/Container";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class MenuHeroUp{
    private container: Container;
    private fon: Sprite;
    private isShowed = false;
    constructor(private scene:Scene){

    }

    create(){
        this.container = this.scene.add.container(this.scene.halfWidth,this.scene.halfHeight);
        this.fon = this.scene.add.sprite('parchment-hero-up');
        this.container.add([
            this.fon
        ]);
        this.isShowed = true;
    }

    destroy(){
        if(!this.isShowed){
            return;
        }
        this.scene.add.remove([
            this.container,
            this.fon
        ]);
        this.isShowed = false;
    }
}