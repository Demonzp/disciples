import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import BaseMainGameMenu from "./BaseMainGameMenu";
import Text from "utils/gameLib/Text";
import socketInst from "utils/socket";

export default class QueueArenaMenu extends BaseMainGameMenu{
    //private container: Container;
    private fon: Sprite;
    private btnExit: Sprite;
    private labelExit: Text;
    constructor(scene:Scene){
        super(scene);
    }

    create(){
        this.container = this.scene.add.container();
        this.fon = this.scene.add.sprite('window-info');
        this.btnExit = this.scene.add.sprite('small-bnt');
        this.btnExit.x = this.fon.halfWidth+this.btnExit.halfWidth;
        this.btnExit.y = -this.fon.halfHeight+this.btnExit.halfHeight+10;
        this.labelExit = this.scene.add.text('EXIT');
        this.labelExit.x = this.btnExit.x-this.labelExit.halfWidth;
        this.labelExit.y = this.btnExit.y+this.labelExit.halfHeight;
        this.container.x = this.scene.halfWidth-this.btnExit.halfWidth;
        this.container.y = this.scene.halfHeight;
        
        this.container.add([this.fon, this.btnExit, this.labelExit]);

        this.btnExit.on('pointerup',()=>{
            console.log('click exit!!!!');
            socketInst.emit('exit-queue');
        });
    }
}