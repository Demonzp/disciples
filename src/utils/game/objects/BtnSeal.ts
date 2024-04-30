import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

type TCallback = ()=>void;

export default class BtnSeal{
    public sprite: Sprite;
    constructor(private scene:Scene, private key:'ok'|'cancel',private callback:TCallback){

    }

    create(){
        this.sprite = this.scene.add.sprite('seal-btns');
        this.sprite.on('pointerover', this.onMouseOver, this);
        this.sprite.on('pointerout', this.onMouseOut, this);
        this.sprite.on('pointerup', this.onPointerUp, this);
        //this.sprite.setScale(0.9);
        if(this.key==='ok'){
            this.sprite.setFrame(2);
        }else{
            this.sprite.setFrame(0);
        }
    }

    onPointerUp(){
        this.callback();
    }

    onMouseOver(){
        if(this.key==='ok'){
            this.sprite.setFrame(3);
        }else{
            this.sprite.setFrame(1);
        }
    }

    onMouseOut(){
        if(this.key==='ok'){
            this.sprite.setFrame(2);
        }else{
            this.sprite.setFrame(0);
        }
    }

    destroy(){
        this.scene.add.remove(this.sprite);
    }
}