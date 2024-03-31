import Scene from "utils/gameLib/Scene";
import Sprite from "utils/gameLib/Sprite";
import BaseMainGameMenu from "./BaseMainGameMenu";
import Text from "utils/gameLib/Text";
import socketInst from "utils/socket";
import { msToString } from "utils/global";
import store from "store/store";

export default class QueueArenaMenu extends BaseMainGameMenu{
    //private container: Container;
    private fon: Sprite;
    private btnExit: Sprite;
    private labelExit: Text;
    private labelTimer: Text;
    private labelQueue: Text;
    private startTime: number;

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
        this.labelQueue = this.scene.add.text('queue: -');
        this.labelQueue.fontSize = 20;
        this.labelQueue.x = 150;
        this.labelQueue.y = 200;
        this.labelTimer = this.scene.add.text('time in Queue: 00:00:00');
        this.labelTimer.fontSize = 22;
        this.labelTimer.x = 100;
        this.labelTimer.y = 110;
        this.startTime = Date.now();
        this.container.add([this.fon, this.btnExit, this.labelExit]);

        this.btnExit.on('pointerup',()=>{
            console.log('click exit!!!!');
            this.hide();
            socketInst.emit('exit-queue');
        });
        this.isShow = true;
    }

    hide(){
        this.isShow = false;
        this.scene.add.remove([
            this.fon, 
            this.btnExit, 
            this.labelExit,
            this.labelTimer,
            this.labelQueue,
            this.container
        ]);
    }

    update(){
        super.update();
        if(this.isShow){
            const later = msToString(Date.now()-this.startTime); 
            this.labelTimer.text = `time in Queue: ${later.h}:${later.m}:${later.s}`;
            const queue = store.getState().multiArena.queue;
            this.labelQueue.text = `queue: ${queue}`;
        }
    }
}