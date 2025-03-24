import { IUnit, portretPartyOneData } from "store/slices/sliceGame";
import { openInfoUnit } from "store/slices/sliceMultiArena";
import store from "store/store";
import Container from "utils/gameLib/Container";
import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class ArenaHeroHireIco{
    public cont: Container;
    private border: Sprite;
    private sprite: Sprite;
    private labelName: Text;
    private labelLvl: Text;
    private labelLvlValue: Text;
    private labelLeadership: Text;
    private labelLeadershipValue: Text;
    private borderSelect: Graphics;
    public isSelect = false;

    constructor(private scene:Scene, public unitHero:IUnit){
        console.log('constructor ArenaHeroHireIco');
        this.create();
    }

    create(){
        this.cont = this.scene.add.container();
        this.cont.setInteractiveRect(258, 84);

        this.labelName = this.scene.add.text(`${this.unitHero.defaultName}`,0,-48);
        this.labelName.fontStyle = 'bold';
        this.labelName.fontSize = 15;

        this.labelLvl = this.scene.add.text('Level:', 0, -20);
        this.labelLvl.fontSize = 12;

        this.labelLvlValue = this.scene.add.text(String(this.unitHero.level), 80, -20);
        this.labelLvlValue.fontSize = 12;

        this.labelLeadership = this.scene.add.text('Leadership:', 0, -5);
        this.labelLeadership.fontSize = 12;

        this.labelLeadershipValue = this.scene.add.text(String(this.unitHero.leadership), 80, -5);
        this.labelLeadershipValue.fontSize = 12;

        this.border = this.scene.add.sprite('border1-one', -89, 0);
        //console.log(`ArenaHeroHireIco portret-units-one-${this.unitHero.fraction}`);
        this.sprite = this.scene.add.sprite(`portret-units-one-${this.unitHero.fraction}`,-89, 0);
        this.sprite.setFrame(portretPartyOneData[this.unitHero.icon]);

        this.cont.add([
            this.sprite, 
            this.border, 
            this.labelName, 
            this.labelLvl, 
            this.labelLvlValue,
            this.labelLeadership,
            this.labelLeadershipValue,
        ]);
        this.cont.on('pointerdown', (pointer)=>{
            //console.log('pointer = ', pointer.event.button);
            
            const {isShowHeroUp, isLoad, isUpUnit, isInfoUnitOpen} = store.getState().multiArena;
            //console.log();
            if(
                (
                !isShowHeroUp&&
                !isLoad&&
                !isUpUnit&&
                !isInfoUnitOpen)&&
                (pointer.event.pointerType==='mouse'&&pointer.event.button===2)
            ){
                console.log('right on Hero!!!');
                store.dispatch(openInfoUnit(this.unitHero));
            }
        });
        //this.cont.on('pointerup', );
    }

    onSelect(){
        this.isSelect = true;
        this.borderSelect = this.scene.add.graphics();
        this.borderSelect.strokeRect(-258/2,-89/2,258,89);
        this.cont.add(this.borderSelect);
    }

    offSelect(){
        if(!this.isSelect){
            return;
        }
        this.isSelect = false;
        this.cont.remove(this.borderSelect);
        //this.scene.add.remove(this.borderSelect);
    }

    destroy(){
        this.scene.add.remove([
            this.cont,
            this.border,
            this.sprite,
            this.labelName,
            this.labelLvl,
            this.labelLvlValue,
            this.labelLeadership,
            this.labelLeadershipValue,
        ]);
    }
}