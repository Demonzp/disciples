import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import Sprite from "utils/gameLib/Sprite";
import store from "store/store";
import ArenaParty from "./ArenaParty";

export default class ArenaManagerMenu extends BaseMainGameMenu{
    private mainSprite: Sprite;
    private spritePlayerRace: Sprite;
    private spriteEnemyRace: Sprite;
    private party: ArenaParty;
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
        this.party = new ArenaParty(this.scene);
    }

    update(){
        
    }
}