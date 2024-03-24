import Scene from "utils/gameLib/Scene";
import BaseMainGameMenu from "./BaseMainGameMenu";
import Sprite from "utils/gameLib/Sprite";
import MainMenuButton from "./MainMenuButton";
import store from "store/store";
import { setMenuType } from "store/slices/sliceMenuGame";
import Text from "utils/gameLib/Text";
import socketInst from "utils/socket";

export default class ArenaGameMenu extends BaseMainGameMenu{
    private windowInfo:Sprite;
    private btn_lobby: MainMenuButton;
    private btn_to_battle: MainMenuButton;
    private btn_exit: MainMenuButton;
    private serverInfo: Sprite;
    private serverTextOnline: Text;
    private serverTextQueue: Text;
    private serverTextVersion: Text;
    constructor(scene:Scene){
        super(scene);
        this.showHook = this.showed.bind(this);
    }

    create(){
        this.hideHook = this.hidden.bind(this);
        this.maxY = 63-63/2;
        this.container = this.scene.add.container();
        this.container.x = 700;
        this.container.y = -63*2-63/2;
        this.btn_lobby = new MainMenuButton(this.scene, 0, 0, 'CREATE LOBBY');
        this.btn_to_battle = new MainMenuButton(this.scene, 0, 60, 'TO BATTLE', ()=>{
            this.hideCallback = ()=>socketInst.socket.emit('to-queue');
            this.hide();
        });
        this.btn_exit = new MainMenuButton(this.scene, 0, 60*2, 'EXIT', ()=>{
            this.hideCallback = ()=>store.dispatch(setMenuType('multiplayer'));
            socketInst.socket.disconnect();
            this.hide();
        }); 
        this.container.data = 'main cont';
        this.container.add([this.btn_exit.container, this.btn_lobby.container, this.btn_to_battle.container]);
        this.isAnimate = true;
        this.isShow = true;
    }

    showed(){
        this.windowInfo = this.scene.add.sprite('window-info');
        //this.windowInfo.setZindex(-1);
        this.windowInfo.x +=this.windowInfo.halfWidth;
        this.windowInfo.y +=this.windowInfo.halfHeight;
        this.container.setZindex(1);

        this.serverInfo = this.scene.add.sprite('arena-status');
        this.serverInfo.x = this.scene.width-this.serverInfo.halfWidth;
        this.serverInfo.y = this.scene.height-this.serverInfo.halfHeight;
        const {online, queue, version} = store.getState().multiArena;
        this.serverTextOnline = this.scene.add.text(`online: ${online}`);
        this.serverTextOnline.fontSize = 20;
        
        this.serverTextOnline.x = this.serverInfo.x-this.serverInfo.halfWidth+30;
        this.serverTextOnline.y = this.serverInfo.y-this.serverInfo.halfHeight+80;

        this.serverTextQueue = this.scene.add.text(`queue: ${queue}`);
        this.serverTextQueue.fontSize = 20;
        
        this.serverTextQueue.x = this.serverInfo.x-this.serverInfo.halfWidth+30;
        this.serverTextQueue.y = this.serverTextOnline.y+this.serverTextQueue.height+10;

        this.serverTextVersion = this.scene.add.text(`version: ${version}`);
        this.serverTextVersion.fontSize = 20;
        
        this.serverTextVersion.x = this.serverInfo.x-this.serverInfo.halfWidth+30;
        this.serverTextVersion.y = this.serverTextQueue.y+this.serverTextVersion.height+30;
    }

    hidden(){
        this.btn_lobby.destroy();
        this.btn_to_battle.destroy();
        this.btn_exit.destroy();
        this.scene.add.remove([
            this.windowInfo, 
            this.serverInfo, 
            this.serverTextOnline,
            this.serverTextQueue,
            this.serverTextVersion
        ]);
        this.hideCallback();
    }

    update(){
        super.update();
        if(!this.isShow||this.isAnimate){
            return;
        }
        const {online, queue, version} = store.getState().multiArena;
        this.serverTextOnline.text = `online: ${online}`;
        this.serverTextQueue.text = `queue: ${queue}`;
        this.serverTextVersion.text = `version: ${version}`;
    }
}