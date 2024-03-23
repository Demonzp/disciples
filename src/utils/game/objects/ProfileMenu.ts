import store from "store/store";
import Container from "utils/gameLib/Container";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class ProfileMenu{
    private container: Container;
    private sprite: Sprite;
    private userIco: Sprite;
    private label: Text;
    private isAnimate = false;
    private isShow = false;

    constructor(private scene:Scene){}

    create(){
        const pathIco = store.getState().multiplayer.user.picture;
        this.scene.load.image('user-ico', pathIco);
        this.scene.game.load.loadFiles(this.initUserIco.bind(this));
        this.container = this.scene.add.container(135,40);
        this.sprite = this.scene.add.sprite('profile');
        this.sprite.setScale(0.5);

        this.container.add([this.sprite]);
    }

    initUserIco(){
        console.log('initUserIco');
        this.userIco = this.scene.add.sprite('user-ico');
        this.userIco.setScale(0.7);
        this.userIco.x = -this.sprite.halfWidth+this.userIco.halfWidth;
        this.userIco.setMask('profile-ico-mask');
        
        this.container.add(this.userIco);
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