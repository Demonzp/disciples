import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import Sprite from "utils/gameLib/Sprite";
import store from "store/store";
import ArenaParty from "./ArenaParty";
import { setInitScene } from "store/slices/sliceMultiArena";
import Text from "utils/gameLib/Text";
import ArenaHireHero from "./ArenaHireHero";
import MenuHeroUp from "./MenuHeroUp";
import ArenaHeroProfile from "./ArenaHeroProfile";

export default class ArenaManagerMenu extends BaseMainGameMenu{
    private mainSprite: Sprite;
    private spritePlayerRace: Sprite;
    private spriteEnemyRace: Sprite;
    private textDefault: Text;
    public party: ArenaParty;
    public hireHeroMenu: ArenaHireHero;
    public menuUpHero: MenuHeroUp;
    public arenaHeroProfile: ArenaHeroProfile;
    constructor(scene: Scene){
        super(scene);
    }

    create(){
        this.mainSprite = this.scene.add.sprite('arena-squad-menu', this.scene.halfWidth, this.scene.halfHeight);
        const {myRace, enemyRace} = store.getState().multiArena;

        this.spritePlayerRace = this.scene.add.sprite(`vs-ico-${myRace}`);
        this.spritePlayerRace.x = this.spritePlayerRace.halfWidth;
        this.spritePlayerRace.y = this.scene.height-this.spritePlayerRace.halfHeight;
        
        this.spriteEnemyRace = this.scene.add.sprite(`vs-ico-${enemyRace}`);
        this.spriteEnemyRace.x = this.scene.width - this.spriteEnemyRace.halfWidth;
        this.spriteEnemyRace.y = this.scene.height-this.spriteEnemyRace.halfHeight;
        //this.textDefault = this.scene.add.text('Click on free cell to hire a hero!', 14, 200, 110);
        //this.textDefault.fontSize = 16;
        this.arenaHeroProfile = new ArenaHeroProfile(this.scene);
        this.party = new ArenaParty(this.scene);
        this.hireHeroMenu = new ArenaHireHero(this.scene);
        this.menuUpHero = new MenuHeroUp(this.scene);
        //this.hireHeroMenu.show();
        store.dispatch(setInitScene(true));
    }

    update(){
        
    }
}