import Container from "utils/gameLib/Container";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import BtnSeal from "./BtnSeal";
import store from "store/store";
import { setIsShowHireHero } from "store/slices/sliceMultiArena";
import ArenaHeroHireIco from "./ArenaHeroHireIco";
import { IUnit } from "store/slices/sliceGame";

const heroIds = [];

export default class ArenaHireHero{
    private cont: Container;
    private fon:Sprite;
    private isShowed = false;
    private heroIcons: ArenaHeroHireIco[] = [];
    private btnOk = new BtnSeal(this.scene, 'ok', this.onBtnOk.bind(this));
    private btnCancel = new BtnSeal(this.scene, 'cancel', this.onBtnCancel.bind(this));
    private selectedHero:IUnit|undefined;
    constructor(private scene:Scene){

    }

    show(){
        this.cont = this.scene.add.container(this.scene.halfWidth,this.scene.halfHeight);
        
        this.fon = this.scene.add.sprite('parchment-vertical');
        this.fon.setScale(0.925);
        this.btnOk.create();
        this.btnOk.sprite.x = 50;
        this.btnOk.sprite.y = 180;
        this.btnCancel.create();
        this.btnCancel.sprite.x = 105;
        this.btnCancel.sprite.y = 180;

        this.cont.add([
            this.fon, 
            this.btnOk.sprite, 
            this.btnCancel.sprite
        ]);
        const heroes = store.getState().multiArena.heroes;

        const stepY = 98;
        let y = -120;
        for (let i = 0; i < heroes.length; i++) {
            const hero = heroes[i];
            const icoHero = new ArenaHeroHireIco(
                this.scene, 
                hero
            );
            icoHero.cont.on('pointerup', ()=>this.clickOnHeroIco(icoHero));

            icoHero.cont.y = y;
            this.cont.add(icoHero.cont);
            this.heroIcons.push(icoHero);
            y+=stepY;
        }
        this.cont.setZindex(101);
        this.isShowed = true;
    }

    clickOnHeroIco(icoHero:ArenaHeroHireIco){
        //console.log('click on = ', icoHero.unitHero.defaultName);
        this.selectedHero = icoHero.unitHero;
        this.heroIcons.forEach(hI=>hI.offSelect());
        icoHero.onSelect();
    }

    onBtnOk(){
        if(!this.selectedHero){
            return;
        }
        
        console.log('selected on = ', this.selectedHero.defaultName);
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
        this.heroIcons.forEach(hI=>hI.destroy());
        this.heroIcons = [];
        this.scene.add.remove([
            this.cont,
            //this.fon,
        ]);
        this.isShowed = false;
    }
}