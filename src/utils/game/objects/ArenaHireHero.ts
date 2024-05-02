import Container from "utils/gameLib/Container";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import BtnSeal from "./BtnSeal";
import store from "store/store";
import { setIsShowHireHero } from "store/slices/sliceMultiArena";
import ArenaHeroHireIco from "./ArenaHeroHireIco";

const heroIds = [];

export default class ArenaHireHero{
    private cont: Container;
    private fon:Sprite;
    private isShowed = false;
    private heroIcons: ArenaHeroHireIco[] = [];
    private btnOk = new BtnSeal(this.scene, 'ok', ()=>{});
    private btnCancel = new BtnSeal(this.scene, 'cancel', this.onBtnCancel.bind(this));
    constructor(private scene:Scene){

    }

    show(){
        this.cont = this.scene.add.container(this.scene.halfWidth,this.scene.halfHeight);
        
        this.fon = this.scene.add.sprite('parchment-vertical');
        this.fon.setScale(0.9);
        this.btnOk.create();
        this.btnOk.sprite.x = 50;
        this.btnOk.sprite.y = 175;
        this.btnCancel.create();
        this.btnCancel.sprite.x = 105;
        this.btnCancel.sprite.y = 175;
        for (let i = 0; i < 3; i++) {
            
        }
        this.cont.add([this.fon, this.btnOk.sprite, this.btnCancel.sprite]);
        this.cont.setZindex(101);
        this.isShowed = true;
    }

    onBtnCancel(){
        store.dispatch(setIsShowHireHero(false));
    }

    hide(){
        if(!this.isShowed){
            return;
        }
        this.btnOk.destroy();
        this.btnCancel.destroy();
        this.scene.add.remove([
            this.cont,
            this.fon,
        ]);
        this.isShowed = false;
    }
}