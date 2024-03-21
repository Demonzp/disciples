import Container from "utils/gameLib/Container";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class ProfileMenu{
    private container: Container;
    private sprite: Sprite;
    private label: Text;
    private isAnimate = false;
    private isShow = false;

    constructor(private scene:Scene){}

    create(){
        this.container = this.scene.add.container(135,40);
        this.sprite = this.scene.add.sprite('profile');
        this.sprite.setScale(0.5);

        this.container.add([this.sprite]);
    }

    show(){

    }

    hide(){

    }

    private _animShow(){

    }

    private _animHide(){

    }

    update(){
        if(this.isAnimate){
            if(this.isShow){
                this._animShow();
            }else{
                this._animHide();
            }
        }
    }
}