import { THeroSkill } from "store/slices/sliceMultiArena";
import store from "store/store";
import Container from "utils/gameLib/Container";
import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";
import BtnSeal from "./BtnSeal";

export default class MenuHeroUp{
    private container: Container;
    private fon: Sprite;
    private isShowed = false;
    private skillsObj: {label:Text, fon:Graphics, cont:Container, skill:THeroSkill}[] = [];
    private idx = 0;
    private defaultIdx = 5;
    private textDiscription: Text;
    private btnOk: BtnSeal;
    constructor(private scene:Scene){

    }

    create(){
        this.idx = this.defaultIdx;
        this.container = this.scene.add.container(this.scene.halfWidth,this.scene.halfHeight);
        this.fon = this.scene.add.sprite('parchment-hero-up');
        this.textDiscription = this.scene.add.text('');
        this.textDiscription.x = -165;
        this.textDiscription.y = 96;
        this.textDiscription.fontSize = 14;
        this.textDiscription.maxWidth = 350;

        this.btnOk = new BtnSeal(this.scene,'ok',()=>{});
        this.btnOk.create();
        this.btnOk.sprite.x = 150;
        this.btnOk.sprite.y = 174;

        this.container.add([
            this.fon,
            this.textDiscription,
            this.btnOk.sprite
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
                const cont = this.scene.add.container(skillLabel.x+155/2, skillLabel.y-(skillLabel.height+3)/2);
                cont.setInteractiveRect(155,skillLabel.height+3);
                cont.data = skill.id;
                cont.on('pointerup', ()=>this.clickOnSkill(cont));
                this.skillsObj.push({
                    label: skillLabel,
                    fon: graphics,
                    cont,
                    skill,
                });
                y+=stepY;
            }
        }
    }

    clickOnSkill(cont:Container){
        this.skillsObj.forEach(obj=>obj.fon.alpha=0);
        const skillObj = this.skillsObj.find(obj=>obj.cont.data===cont.data);
        skillObj.fon.alpha = 1;
        this.textDiscription.text = skillObj.skill.discription;
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