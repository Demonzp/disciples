import { THeroSkill } from "store/slices/sliceMultiArena";
import store from "store/store";
import Container from "utils/gameLib/Container";
import Graphics from "utils/gameLib/Graphics";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";
import BtnSeal from "./BtnSeal";
import BtnSealArrow from "./BtnSealArrow";
import { IUnit, portretPartyOneData } from "store/slices/sliceGame";

type TSkillObj = {
    label: Text,
    fon: Graphics,
    cont: Container,
};

export default class MenuHeroUp {
    private container: Container;
    private fon: Sprite;
    private isShowed = false;
    private skillsObj: TSkillObj[] = [];
    private heroSkills: THeroSkill[] = [];
    private idx = 0;
    private defaultIdx = 0;
    private selectIdx = 0;
    private textDiscription: Text;
    private btnOk: BtnSeal;
    private btnUp: BtnSealArrow;
    private btnDown: BtnSealArrow;
    private portrait: Sprite;
    private borderPortrait: Sprite;
    private hero: IUnit; 
    constructor(private scene: Scene) {

    }

    create() {
        const { heroSkills, units } = store.getState().multiArena;
        console.log('heroSkills = ', heroSkills);
        this.hero = units.find(u => u.isHero);
        this.heroSkills = heroSkills.filter(skill => skill.level <= this.hero.level)
        
        this.idx = this.defaultIdx;
        this.container = this.scene.add.container(this.scene.halfWidth, this.scene.halfHeight);
        this.fon = this.scene.add.sprite('parchment-hero-up');
        this.textDiscription = this.scene.add.text('');
        this.textDiscription.x = -165;
        this.textDiscription.y = 96;
        this.textDiscription.fontSize = 14;
        this.textDiscription.maxWidth = 350;

        this.btnOk = new BtnSeal(this.scene, 'ok', () => { });
        this.btnOk.create();
        this.btnOk.sprite.x = 150;
        this.btnOk.sprite.y = 174;

        this.btnUp = new BtnSealArrow(this.scene, 'up', this.onBtnUp.bind(this));
        this.btnUp.create();
        this.btnUp.sprite.x = 120;
        this.btnUp.sprite.y = -75;

        this.btnDown = new BtnSealArrow(this.scene, 'down', this.onBtnDown.bind(this));
        this.btnDown.create();
        this.btnDown.sprite.x = 120;
        this.btnDown.sprite.y = 50;

        this.portrait = this.scene.add.sprite(`portret-units-one-${this.hero.fraction}`, -135, -15);
        this.portrait.setFrame(portretPartyOneData[this.hero.icon]);

        this.borderPortrait = this.scene.add.sprite('border1-one', -135, -15);

        this.container.add([
            this.fon,
            this.textDiscription,
            this.btnOk.sprite,
            this.btnUp.sprite,
            this.btnDown.sprite,
            this.portrait,
            this.borderPortrait,
        ]);

        this.renderSkills();
        this.calcSelectSkill();
        this.isShowed = true;
    }

    renderSkills() {
        
        const stepY = 16;
        let y = 160;
        for (let i = 0; i < 10; i++) {
            if (i + this.idx >= this.heroSkills.length) {
                return;
            }
            const skill = this.heroSkills[i + this.idx];

            const graphics = this.scene.add.graphics();
            graphics.fillStyle('white');

            const skillLabel = this.scene.add.text(skill.name);
            skillLabel.fontSize = 13;
            skillLabel.y = y;
            skillLabel.x = 358;
            graphics.fillRect(skillLabel.x, skillLabel.y - skillLabel.height, 155, skillLabel.height + 3);
            graphics.alpha = 0;
            const cont = this.scene.add.container(skillLabel.x + 155 / 2, skillLabel.y - (skillLabel.height + 3) / 2);
            cont.setInteractiveRect(155, skillLabel.height + 3);
            cont.data = skill.id;
            const skillObj = {
                label: skillLabel,
                fon: graphics,
                cont
            }
            cont.on('pointerup', () => this.onSkill(skillObj));
            this.skillsObj.push(skillObj);
            y += stepY;
        }
    }

    onBtnUp() {
        if (this.selectIdx === 0) {
            return;
        }
        this.selectIdx -= 1;
        if(this.selectIdx<0+this.idx){
            this.idx-=1;
            this.destroySkillsList();
            this.renderSkills();
        }
        //this.idx = this.selectIdx;
        this.calcSelectSkill();
    }

    onBtnDown() {
        if (this.selectIdx === this.heroSkills.length-1) {
            return;
        }
        this.selectIdx += 1;
        if(this.selectIdx>9+this.idx){
            this.idx+=1;
            this.destroySkillsList();
            this.renderSkills();
        }
        this.calcSelectSkill();
    }

    calcSelectSkill() {
        //const { heroSkills } = store.getState().multiArena;
        const skillObj = this.skillsObj.find(obj => obj.cont.data === this.heroSkills[this.selectIdx].id);
        this.selectSkill(skillObj);
    }

    onSkill(obj: TSkillObj) {
        this.skillsObj.forEach(obj => obj.fon.alpha = 0);
        //const { heroSkills } = store.getState().multiArena;
        this.selectIdx = this.heroSkills.findIndex(skill => skill.id === obj.cont.data);
        this.selectSkill(obj);
        //this.textDiscription.text = skillObj.skill.discription;
    }

    selectSkill(obj: TSkillObj) {
        //const { heroSkills } = store.getState().multiArena;
        console.log('selectIdx = ', this.selectIdx);
        console.log('skillName = ', this.heroSkills[this.selectIdx].name);
        this.skillsObj.forEach(obj => obj.fon.alpha = 0);
        obj.fon.alpha = 1;
        this.textDiscription.text = this.heroSkills[this.selectIdx].discription;
    }

    destroySkillsList(){
        this.skillsObj.forEach(skill=>{
            this.scene.add.remove([
                skill.cont,
                skill.fon,
                skill.label
            ]);
        });
        this.skillsObj = [];
    }

    destroy() {
        if (!this.isShowed) {
            return;
        }
        this.scene.add.remove([
            this.container,
            this.fon
        ]);
        this.isShowed = false;
    }
}