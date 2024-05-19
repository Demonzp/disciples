import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import Text from "utils/gameLib/Text";

export default class MenuUnitInfo{
    private fon: Sprite;
    private portrait: Sprite;
    private labelName: Text;
    constructor(private scene: Scene){

    }

    create(){
        this.fon = this.scene.add.sprite('window-info', this.scene.halfWidth, this.scene.halfHeight);
        this.portrait = this.scene.add.sprite('units-big-portrait', 200, 100);
        this.portrait.setFrame(0);
    }

    destroy(){
        this.scene.add.remove([
            this.fon,
        ]);
    }
}