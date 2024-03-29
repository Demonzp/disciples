import Container from "utils/gameLib/Container";
import Scene from "utils/gameLib/Scene";

export default class BaseMainGameMenu{
    isShow = false;
    protected maxY = 0;
    protected isAnimate = false;
    protected isAnimated = false;
    protected speed = 7;
    protected container: Container;
    public hideCallback:()=>void;
    protected hideHook:()=>void;
    protected showHook:()=>void|null = null;
    constructor(protected scene:Scene){
        //this.create();
    }

    hide(){
        this.isAnimate = true;
        this.isShow = false;
    }

    animShow(){
        console.log('animShow');
        this.container.y+=this.speed;
        if(this.container.y>=this.maxY){
            this.container.y = this.maxY;
            this.isAnimate = false;
            this.isAnimated = true;
            if(this.showHook){
                this.showHook();
            }
        }
    }

    animHide(){
        console.log('animHide');
        this.container.y-=this.speed;
        if(this.container.y<=-63*2-63/2){
            this.container.y = -63*2-63/2;
            this.isAnimate = false;
            this.isAnimated = true;
            this.hideHook();
            //this.btn_exit.destroy();
            //this.btn_multi.destroy();
            //this.btn_single.destroy();
            this.scene.add.remove(this.container);
            //this.hideCallback();
        }
    }

    update(){
        if(this.isAnimate){
            if(this.isShow){
                this.animShow();
            }else{
                this.animHide();
            }
        }  
    }
}