import Scene from "utils/gameLib/Scene";
import ModalPropertiesCapitalParty from "./ModalPropertiesCapitalParty";
import Container from "utils/gameLib/Container";
import store from "store/store";
import { TPoint } from "utils/gameLib/Game";
import Sprite from "utils/gameLib/Sprite";
import { IUnit, portretPartyOneData } from "store/slices/sliceGame";
import PartyPortrait from "./PartyPortrait";
import { actionMoveCitySquadIn } from "store/actions/actionsGame";

export default class CapitalParty{
    conts: Container[] = [];
    portraits: PartyPortrait[] = [];
    contPos: TPoint[] = [
        {
            x:244,
            y:-132,
        },
        {
            x:244,
            y:-26,
        },
        {
            x:244,
            y:80,
        },
        {
            x:324,
            y:-132,
        },
        {
            x:324,
            y:-26,
        },
        {
            x:324,
            y:80,
        },
    ];
    squadIn: IUnit[] = [];
    idPointUp = '';
    idPointMove = '';
    scene: Scene;
    constructor(public parent: ModalPropertiesCapitalParty){
        //this.scene = this.parent.scene;
    }

    init(){
        const capitalData = this.parent.parent.capitalData;
        console.log('capitalData = ', capitalData);
        const units = store.getState().game.units;
        this.squadIn = capitalData.squadIn.map(uid=>{
            return units.find(u=>u.uid===uid);
        });
        for (let i = 0; i < 6; i++) {
            if(!this.squadIn.find(u=>u.position===i)){
                const cont = this.parent.scene.add.container();
                
                cont.x = this.parent.x+this.contPos[i].x;
                cont.y = this.parent.y+this.contPos[i].y;
                cont.setInteractiveRect(70,102);
                cont.data = i;
                // cont.on('pointerup', ()=>{
                //     console.log('cont i = ', cont.data);
                // });
                cont.setZindex(1000);
                this.conts.push(cont);
            } 
        }

        this.squadIn.forEach(unit=>{
            const portrait = new PartyPortrait(this, unit, 'right');
            // const portret = this.parent.scene.add.sprite(`portrets-party-one-${unit.fraction}`);
            // portret.setFrame(portretPartyOneData[unit.icon]);
            // portret.x = this.parent.x+this.contPos[unit.position].x+1;
            // portret.y = this.parent.y+this.contPos[unit.position].y-10;
            // portret.flipX = true;
            this.portraits.push(portrait);
        });

        this.idPointMove = this.parent.scene.input.on('pointermove',(pointer)=>{
            this.portraits.forEach(p=>p.move(pointer));
        });

        this.idPointUp = this.parent.scene.input.on('pointerup',(pointer)=>{
            let isNext = true;
            this.portraits.forEach(p=>{
                if(p.isCanMove){
                    isNext = false;
                }
                p.drop(pointer);
            });

            if(isNext){
                const cont = this.conts.find(c=>c.isOnPointer(pointer));
                if(cont){
                    //console.log('add Unit to = ', cont.data);
                    this.parent.modalAddUnit.show(cont.data);
                }
            }
            
        });
    }

    hide(){
        this.conts.forEach(cont=>this.parent.scene.add.remove(cont));
        this.conts = [];
        this.portraits.forEach(p=>p.destroy());
        this.portraits = [];

        this.parent.scene.input.off(this.idPointMove);
        this.parent.scene.input.off(this.idPointUp);
    }

    dropPortrait(point:TPoint, portret:PartyPortrait){
        //console.log('drop!!!');
        for (let i = 0; i < this.conts.length; i++) {
            const cont = this.conts[i];
            if(cont.isOnPointer(point)){
                //console.log('on container = ', cont.data);
                store.dispatch(actionMoveCitySquadIn({
                    unitId: portret.unit.id,
                    toIdx: cont.data,
                }));
                return;
            }
        }

        portret.toStart();
    }
}