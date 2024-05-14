import store from "store/store";
import Container from "utils/gameLib/Container";
import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class MenuHeroUp{
    private container: Container;
    private fon: Sprite;
    private isShowed = false;
    private skillsObj: {label:Text,fon:Graphics}[] = [];
    private idx = 0;
    private defaultIdx = 5;
    constructor(private scene:Scene){

    }

    create(){
        this.idx = this.defaultIdx;
        this.container = this.scene.add.container(this.scene.halfWidth,this.scene.halfHeight);
        this.fon = this.scene.add.sprite('parchment-hero-up');
        this.container.add([
            this.fon
        ]);

        this.renderSkills();
        this.isShowed = true;
    }

    renderSkills(){
        const {heroSkills, units} = store.getState().multiArena;
        console.log('heroSkills = ', heroSkills);
        const hero = units.find(u=>u.isHero);
        const stepY = 16;
        let y = 160;
        for (let i = 0; i <= 10; i++) {
            if(i+this.idx>=heroSkills.length){
                return;
            }
            const skill = heroSkills[i+this.idx];
            if(hero.level>=skill.level){
                
                const graphics = this.scene.add.graphics();
                graphics.fillStyle('white');
                   
                const skillLabel = this.scene.add.text(skill.name);
                skillLabel.fontSize = 13;
                skillLabel.y = y;
                skillLabel.x = 358;
                graphics.fillRect(skillLabel.x,skillLabel.y-skillLabel.height,155,skillLabel.height+3);
                graphics.alpha = 0;
                this.skillsObj.push({
                    label: skillLabel,
                    fon: graphics,
                });
                y+=stepY;
            }
        }
    }

    destroy(){
        if(!this.isShowed){
            return;
        }
        this.scene.add.remove([
            this.container,
            this.fon
        ]);
        this.isShowed = false;
    }
}