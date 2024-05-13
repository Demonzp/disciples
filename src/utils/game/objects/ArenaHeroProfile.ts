import { portretBigData } from "store/slices/sliceGame";
import store from "store/store";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class ArenaHeroProfile{
    private icoHero: Sprite;
    private textDefault: Text;
    private labelName: Text;
    private labelLevel: Text;
    private labelLeadership: Text;
    constructor(private scene:Scene){

    }

    create(){
        const {isHasHero, units} = store.getState().multiArena;
        if(!isHasHero){
            if(this.textDefault){
                return;
            }
            this.textDefault = this.scene.add.text('Click on free cell to hire a hero!', 14, 200, 110);
            this.textDefault.fontSize = 16;
        }else{
            if(this.textDefault){
                this.textDefault.alpha = 0;
            }
            if(this.icoHero){
                return;
            }
            const hero = units.find(u=>u.isHero);
            this.icoHero = this.scene.add.sprite('units-big-portrait');
            this.icoHero.setScale(1.02);
            this.icoHero.x = this.icoHero.halfWidth;
            this.icoHero.y = 86;
            this.icoHero.setFrame(portretBigData[hero.icon]);
            
            this.labelName = this.scene.add.text(`${hero.defaultName}`, 15, 184);
            this.labelName.fontSize = 13;

            this.labelLevel = this.scene.add.text(`level: ${hero.level}`, 15, this.labelName.y+this.labelName.halfHeight);
            this.labelLevel.fontSize = 12;

            this.labelLeadership = this.scene.add.text(`leadership: ${units.reduce((prev,u)=>{return prev+u.numCells},-1)}/${hero.leadership}`, 15, this.labelLevel.y+this.labelName.halfHeight);
            this.labelLeadership.fontSize = 12;
        }
    }
}