import { IUnit, portretBigData } from "store/slices/sliceGame";
import store from "store/store";
import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class MenuUnitInfo{
    private fon: Sprite;
    private portrait: Sprite;
    private labelName: Text;
    private isOpen = false;
    constructor(private scene: Scene){

    }

    create(){
        const {infoUnitUid, units} = store.getState().multiArena;
        const unit = units.find(u=>u.uid===infoUnitUid);

        this.fon = this.scene.add.sprite('window-info', this.scene.halfWidth, this.scene.halfHeight);
        this.portrait = this.scene.add.sprite('units-big-portrait', 282, 128);
        this.portrait.setFrame(portretBigData[unit.icon]);

        this.labelName = this.scene.add.text(unit.defaultName);
        this.labelName.fontSize = 14;
        this.labelName.x = this.fon.x-this.fon.halfWidth+this.fon.halfWidth/2-this.labelName.halfWidth;
        this.labelName.y = this.portrait.y+this.portrait.halfHeight+40;
        this.isOpen = true;
    }

    destroy(){
        if(!this.isOpen){
            return;
        }

        this.scene.add.remove([
            this.fon,
            this.portrait,
            this.labelName,
        ]);

        this.isOpen = false;
    }
}