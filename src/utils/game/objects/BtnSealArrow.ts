import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

type TCallback = ()=>void;

export default class BtnSealArrow{
    public sprite:Sprite;
    constructor(private scene:Scene, private key:'up'|'down', private callback:TCallback){

    }

    create(){
        this.sprite = this.scene.add.sprite('seal-arrows');
        this.sprite.on('pointerover', this.onMouseOver, this);
        this.sprite.on('pointerout', this.onMouseOut, this);
        this.sprite.on('pointerup', this.onPointerUp, this);
        if(this.key==='up'){
            this.sprite.angle = 180;
        }
    }

    onMouseOver(){
        this.sprite.setFrame(1);
    }

    onMouseOut(){
        this.sprite.setFrame(0);
    }

    onPointerUp(){
        this.callback();
    }

    destroy(){
        this.scene.add.remove(this.sprite);
    }
}