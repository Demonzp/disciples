import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class ArenaHeroHireIco{
    public sprite: Sprite;
    constructor(private scene:Scene){

    }

    create(key:string){
        this.sprite = this.scene.add.sprite(key);
    }

    destroy(){
        this.scene.add.remove(this.sprite);
    }
}