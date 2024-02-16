import Scene from "utils/gameLib/Scene";
import MainMenuButton from "./MainMenuButton";
import Container from "utils/gameLib/Container";
import store from "store/store";
import { setScene } from "store/slices/sliceGame";

export default class MainGameMenu{
    isShow = false;
    private isAnimate = false;
    private isAnimated = false;
    private speed = 7;
    private maxY = 63-63/2;
    private container:Container;
    private btn_exit:MainMenuButton;
    private btn_single:MainMenuButton;
    private btn_multi:MainMenuButton;
    constructor(public scene:Scene){
        //this.create();
    }

    create(){
        this.container = this.scene.add.container();
        this.btn_single = new MainMenuButton(this.scene, 0, 0, 'SINGLE PLAYER');
        this.btn_multi = new MainMenuButton(this.scene, 0, 60, 'MULTIPLAYER');
        this.btn_exit = new MainMenuButton(this.scene, 0, 60*2, 'EXIT', ()=>{
            store.dispatch(setScene('mainMenu'));
        });

        this.container.x = 650;
        this.container.data = 'main cont';
        this.container.y = -63*2-63/2;
        //this.container.add([this.btn_single.container]);
        this.container.add([this.btn_exit.container, this.btn_multi.container, this.btn_single.container]);
        this.isAnimate = true;
        this.isShow = true;
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
        }
    }

    animHide(){
        console.log('animShow');
        this.container.y-=this.speed;
        if(this.container.y>=-63*2-63/2){
            this.container.y = -63*2-63/2;
            this.isAnimate = false;
            this.isAnimated = true;
            this.btn_exit.destroy();
            this.btn_multi.destroy();
            this.btn_single.destroy();
            this.scene.add.remove(this.container);
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