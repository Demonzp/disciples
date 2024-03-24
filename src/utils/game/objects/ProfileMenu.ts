import store from "store/store";
import Container from "utils/gameLib/Container";
import Game from "utils/gameLib/Game";
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
    private prevIcoPath = '';
    private speedX = 7;
    private maxX = 0;
    private startX = 0;
    private icoId = '';

    constructor(private scene:Scene){}

    create(){
        
        if(this.isAnimate){
            if(this.isShow){
                this.isShow = false;
            }else{
                this.isShow = true;
            }
            return;
        }
        if(this.isShow){
            return;
        }
        this.container = this.scene.add.container(0,0);
        this.sprite = this.scene.add.sprite('profile');
        this.sprite.setScale(0.4);
        this.label = this.scene.add.text(store.getState().multiplayer.user.firstName+' '+store.getState().multiplayer.user.secondName)
        this.label.y = this.label.y+5;
        this.label.x = 20-this.label.halfWidth;
        this.startX = -this.sprite.halfWidth;
        this.maxX = this.sprite.halfWidth;
        this.container.y = this.sprite.halfHeight;
        this.container.x = this.startX;

        this.container.add([this.sprite, this.label]);
        const pathIco = store.getState().multiplayer.user.picture;
        if(this.prevIcoPath!==pathIco){
            this.prevIcoPath = pathIco;
            this.icoId = Game.createId();
            this.scene.load.image(this.icoId, pathIco);
            this.scene.game.load.loadFiles(this.initUserIco.bind(this));
        }else{
            this.initUserIco();
        }
        this.show();
    }

    initUserIco(){
        //console.log('initUserIco');
        this.userIco = this.scene.add.sprite(this.icoId);
        this.userIco.setScale(0.54);
        this.userIco.x = -this.sprite.halfWidth+this.userIco.halfWidth;
        this.userIco.setMask('profile-ico-mask');
        
        this.container.add(this.userIco);
    }

    show(){
        this.isAnimate = true;
        this.isShow = true;
    }

    hide(){
        this.isAnimate = true;
        this.isShow = false;
    }

    private _hidden(){
        this.scene.add.remove([
            this.container,
            this.sprite,
            this.userIco,
            this.label
        ]);
    }

    private _animShow(){
        this.container.x+=this.speedX;
        if(this.container.x>=this.maxX){
            this.container.x = this.maxX;
            this.isAnimate = false;
        }
    }

    private _animHide(){
        this.container.x-=this.speedX;
        if(this.container.x<=this.startX){
            this.container.x = this.startX;
            this.isAnimate = false;
            this._hidden();
        }
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