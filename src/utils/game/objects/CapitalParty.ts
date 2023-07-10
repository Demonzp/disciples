import Scene from "utils/gameLib/Scene";
import ModalPropertiesCapitalParty from "./ModalPropertiesCapitalParty";
import Container from "utils/gameLib/Container";
import store from "store/store";
import { TPoint } from "utils/gameLib/Game";

export default class CapitalParty{
    conts: Container[] = [];
    contPos: TPoint[] = [
        {
            x:90,
            y:185,
        }
    ];
    scene: Scene;
    constructor(private parent: ModalPropertiesCapitalParty){
        //this.scene = this.parent.scene;
    }

    init(){
        const capitalData = this.parent.parent.capitalData;
        console.log('capitalData = ', capitalData);
        const units = store.getState().game.units;
        const squadIn = capitalData.squadIn.map(uid=>{
            return units.find(u=>u.uid===uid);
        });
        for (let i = 0; i < 1; i++) {
            if(!squadIn.find(u=>u.position===i)){
                const cont = this.parent.scene.add.container();
                
                cont.x = this.parent.x+this.contPos[i].x;
                cont.y = this.parent.y;
                cont.setInteractiveRect(70,90);
                cont.data = i;
                cont.on('pointerup', ()=>{
                    console.log('cont i = ', cont.data);
                });
            } 
        }
    }
}