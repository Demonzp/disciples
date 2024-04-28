import Container from "utils/gameLib/Container";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class ArenaHireHero{
    private cont: Container;
    private fon:Sprite;
    private isShowed = false;
    constructor(private scene:Scene){

    }

    show(){
        this.cont = this.scene.add.container(this.scene.halfWidth,this.scene.halfHeight);
        
        this.fon = this.scene.add.sprite('parchment-vertical');
        this.fon.setScale(0.9);
        this.cont.add([this.fon]);
        this.cont.setZindex(101);
        this.isShowed = true;
    }

    hide(){
        if(!this.isShowed){
            return;
        }
        this.scene.add.remove([
            this.cont,
            this.fon,
        ]);
        this.isShowed = false;
    }
}