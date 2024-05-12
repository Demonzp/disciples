import { setIsMenuUpHero } from "store/slices/sliceMultiArena";
import store from "store/store";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";

export default class IcoLvlUpHero{
    public sprite: Sprite;
    constructor(private scene:Scene){

    }

    create(){
        this.sprite = this.scene.add.sprite('ico-lvl-up',20,-25);
        this.sprite.setScale(1.1);
        this.sprite.on('pointerup', ()=>{
            console.log('open menu hero up!');
            store.dispatch(setIsMenuUpHero(true));
        });
    }

    destroy(){
        if(!this.sprite){
            return;
        }
        this.scene.add.remove(this.sprite);
    }
}