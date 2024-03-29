import Container from "utils/gameLib/Container";
import ModalPropertiesCityParty2 from "./ModalPropertiesCityParty2";
import Sprite from "utils/gameLib/Sprite";
import PartyPortrait from "./PartyPortrait";
import { TPoint } from "utils/gameLib/Game";
import { ICity, IUnit } from "store/slices/sliceGame";
import { IScene } from "../scenes/IScene";
import store from "store/store";
import { actionDoubleMoveCitySquadIn, actionMoveCitySquadIn, actionMoveCitySquadInOut, actionMoveTwoCellCitySquadIn, actionMoveTwoCellUnitInOut, actionMoveUnitInOut } from "store/actions/actionsGame";
import { TPointer } from "utils/gameLib/InputEvent";
import { dropCityPortret } from "store/slices/cityParty";

export default class CityPartyIn{
    conts: Container[] = [];
    contsMove: Container[] = [];
    borders: Sprite[] = [];
    portraits: PartyPortrait[] = [];
    idPointUp = '';
    idPointMove = '';
    contPos: TPoint[][] = [
        [
            {
                x: 244,
                y: -132,
            },
            {
                x: 324,
                y: -132,
            },
        ],
        [
            {
                x: 244,
                y: -26,
            },
            {
                x: 324,
                y: -26,
            },
        ],
        [
            {
                x: 244,
                y: 80,
            },
            {
                x: 324,
                y: 80,
            },
        ]
    ];
    cityData:ICity|undefined;
    scene:IScene;
    squad: IUnit[] = [];
    fullSlots:number = 0;
    constructor(public parent:ModalPropertiesCityParty2){}

    init(){
        this.scene = this.parent.scene;
        this.cityData = this.parent.cityData;
        const units = store.getState().game.units;
        
        // this.squad = this.cityData.squadIn.map(uid => {
        //     return units.find(u => u.uid === uid);
        // });

        this.squad = units.filter(u=>{
            if(u.cityId===this.cityData.id&&!u.partyId){
                return true;
            }

            return false;
        });
        this.fullSlots = this.squad.reduce((prev, u)=>prev+u.numCells,0);
        //console.log('squadIn = ', this.squad);
        for (let i = 0; i < this.contPos.length; i++) {
            const row = this.contPos[i];
            for (let j = 0; j < row.length; j++) {
                const pos = row[j];
                const units = this.squad.filter(u => (u.position[0] === i));
                if (units.length===0) {
                    if(this.fullSlots===this.cityData.lvl){
                        this.addBorderPlag(pos);
                        this.addContButtonMove(pos,i,j);
                    }else{
                        this.addBorderOne(pos);
                        this.addContButtonAdd(pos,i,j);
                    }

                } else {
                    if (units.length===1&&units[0].numCells === 2&&j===0) {
                        const sprite = this.parent.scene.add.sprite('place-two');
                        sprite.x = this.parent.x + pos.x + 41;
                        sprite.y = this.parent.y + pos.y - 1;
                        sprite.setZindex(1000);
                        this.borders.push(sprite);
                    } else if(units[0].numCells === 1){
                        if(units.find(u=>u.position[1]===j)){
                            this.addBorderOne(pos);                            
                        }else{
                            if(this.fullSlots===this.cityData.lvl){
                                this.addBorderPlag(pos);
                                this.addContButtonMove(pos,i,j);     
                            }else{
                                this.addBorderOne(pos);
                                this.addContButtonAdd(pos,i,j);
                            }
                        }
                    }
                }
            }
        }

        this.squad.forEach(unit => {
            const portrait = new PartyPortrait(this, unit, 'right');
            this.portraits.push(portrait);
        });

        this.idPointMove = this.parent.scene.input.on('pointermove', (pointer) => {
            // if(this.parent.modalAddUnit.isShow||this.parent.cityPartyOut.modalAddHero.isShow){
            //     return;
            // }
            this.portraits.forEach(p => p.move(pointer));
        });

        // this.idPointUp = this.scene.input.on('pointerup', (pointer) => {
        //     //console.log('CityPartyIn pointerup');
        //     let isNext = true;
        //     //||this.parent.cityPartyOut.portraits.find(p=>p.isCanMove)
        //     if(this.parent.modalAddUnit.isShow||this.parent.cityPartyOut.modalAddHero.isShow||store.getState().cityParty.isUpPortret){
        //         console.log('return PointUp In');
        //         return;
        //     }
        //     this.portraits.forEach(p => {
        //         if (p.isCanMove) {
        //             isNext = false;
        //         }
        //         //console.log('CityPartyIn drop = ', p.unit.name);
        //         p.drop(pointer);
        //     });

        //     // this.parent.cityPartyOut.portraits.forEach(p=>{
        //     //     if (p.isCanMove) {
        //     //         isNext = false;
        //     //     }
        //     //     p.drop(pointer);
        //     // });
        //     //console.log('CapitalParty pointerup');
        //     if (isNext) {
        //         const cont = this.conts.find(c => c.isOnPointer(pointer));
        //         if (cont) {
        //             //console.log('add Unit to partyIn = ', cont.data);
        //             this.parent.modalAddUnit.show(cont.data, this.cityData.id, 'in');
        //             //this.parent.modalAddUnit.show(cont.data, this.parent.parent.capitalData.id);
        //         }
        //     }

        // });
    }

    onContainer(pointer: TPointer) {
        const cont = this.conts.find(c => c.isOnPointer(pointer));
        if (cont) {
            this.parent.modalAddUnit.show(cont.data, this.cityData.id, 'in');
        }
    }

    hide(){
        this.scene.input.off(this.idPointUp);
        this.scene.input.off(this.idPointMove);
        this.portraits.forEach(p=>p.destroy());
        this.borders.forEach(b=>this.scene.add.remove(b));
        this.conts.forEach(c=>this.scene.add.remove(c));
        this.portraits = [];
        this.borders = [];
        this.conts = [];
    }

    updateData(){
        //console.log('updateData CityPartyIn');
        const gameState = store.getState().game;
        const cityData = gameState.cities[gameState.selectObj.idx];
        
        this.hide();
        this.parent.cityData = cityData;
        this.init();
    }

    addBorderPlag(pos:TPoint){
        const sprite = this.parent.scene.add.sprite('place-plag');
        sprite.x = this.parent.x + pos.x + 1;
        sprite.y = this.parent.y + pos.y - 1;
        sprite.setZindex(1000);
        this.borders.push(sprite);
    }

    addContButtonMove(pos:TPoint, i:number, j:number){
        const cont = this.parent.scene.add.container();

        cont.x = this.parent.x + pos.x;
        cont.y = this.parent.y + pos.y;
        cont.setInteractiveRect(70, 102);
        cont.data = [i, j];
        cont.setZindex(1000);
        this.contsMove.push(cont);
    }

    addBorderOne(pos:TPoint){
        const sprite = this.parent.scene.add.sprite('place-one');
        sprite.x = this.parent.x + pos.x + 1;
        sprite.y = this.parent.y + pos.y - 1;
        sprite.setZindex(1000);
        this.borders.push(sprite);
    }

    addContButtonAdd(pos:TPoint, i:number, j:number){
        const cont = this.parent.scene.add.container();

        cont.x = this.parent.x + pos.x;
        cont.y = this.parent.y + pos.y;
        cont.setInteractiveRect(70, 102);
        cont.data = [i, j];
        cont.setZindex(1000);
        this.conts.push(cont);
    }

    onPortretToCont(pointer: TPoint, portret: PartyPortrait, cont: Container) {
        if (!portret) {
            return;
        }
        if (portret.unit.numCells === 2) {
            const p = this.portraits.find(p => p.unit.position[0] === cont.data[0]);
            if (p) {
                store.dispatch(actionMoveTwoCellCitySquadIn({
                    unitId: portret.unit.uid,
                    units: [p.unit.uid]
                }))
                    .then(() => portret.drop(pointer));
                return;
            }
        }
        store.dispatch(actionMoveCitySquadIn({
            unitId: portret.unit.uid,
            toIdx: cont.data,
        }))
            .then(() => portret.drop(pointer));
    }

    onPortretToAny(point:TPoint){
        //console.log('drop Portret IN!!!');
        const cont = this.conts.find(c => c.isOnPointer(point));
        const portret = this.portraits.find(p => p.isCanMove);
        const anotherPortret = this.portraits.find(p => {
            if (p.unit.uid !== portret.unit.uid && p.sprite.isOnPointer(point)) {
                return true;
            }
            return false;
        });

        const contMove = this.contsMove.find(c => c.isOnPointer(point));
        const outPortret = this.parent.cityPartyOut.portraits.find(p => p.cont.isOnPointer(point));
        const contOut = this.parent.cityPartyOut.conts.find(c => c.isOnPointer(point));

        if(cont){
            this.onPortretToCont(point, portret, cont);
        } else if (anotherPortret) {
            if (portret.unit.numCells === 2) {
                const portraits = this.portraits.filter(p2 => p2.unit.position[0] === anotherPortret.unit.position[0]);
                //console.log(portraits.map(p2=>p2.unit.defaultName));
                store.dispatch(actionMoveTwoCellCitySquadIn({
                    unitId: portret.unit.uid,
                    units: portraits.map(p2 => p2.unit.uid)
                }));
            } else if (anotherPortret.unit.numCells === 2) {
                const portraits = this.portraits.filter(p2 => p2.unit.position[0] === portret.unit.position[0]);
                store.dispatch(actionMoveTwoCellCitySquadIn({
                    unitId: anotherPortret.unit.uid,
                    units: portraits.map(p2 => p2.unit.uid)
                }));
            } else {
                store.dispatch(actionDoubleMoveCitySquadIn({
                    unitId: portret.unit.uid,
                    toUnitId: anotherPortret.unit.uid
                }));
            }
        } else if (contMove) {
            this.onPortretToCont(point, portret, contMove);
        } else if (outPortret) {
            if (outPortret.unit.isLeader) {
                store.dispatch(dropCityPortret());
                portret.toStart();
                return;
            } if (portret.unit.numCells === 2) {
                const portraits = this.parent.cityPartyOut.portraits.filter(p2 => p2.unit.position[0] === outPortret.unit.position[0]);
                const leader = portraits.find(p=>p.unit.isLeader);
                if(leader||this.parent.cityPartyOut.leader.leadership<this.parent.cityPartyOut.fullSlots-portraits.length+2){
                    console.log('back!!!!!!!!!!!!!!---');
                    store.dispatch(dropCityPortret());
                    portret.toStart();
                    return;
                }
                store.dispatch(actionMoveTwoCellUnitInOut({
                    unitId: portret.unit.uid,
                    units: portraits.map(p2 => p2.unit.uid)
                }));
            } else if (outPortret.unit.numCells === 2) {
                console.log('inPortret.unit.numCells===2');
                const portraits = this.portraits.filter(p2 => p2.unit.position[0] === portret.unit.position[0]);
                if (this.fullSlots - portraits.length + 2 > this.cityData.lvl) {
                    store.dispatch(dropCityPortret());
                    portret.toStart();
                    return;
                }
                store.dispatch(actionMoveTwoCellUnitInOut({
                    unitId: outPortret.unit.uid,
                    units: portraits.map(p2 => p2.unit.uid)
                }));
            } else {
                store.dispatch(actionMoveUnitInOut({
                    unitId: portret.unit.uid,
                    toUnitId: outPortret.unit.uid
                }));
            }
        } else if (contOut) {
            if (portret.unit.numCells === 2) {
                const p = this.parent.cityPartyOut.portraits.find(p => p.unit.position[0] === contOut.data[0]);
                if (p && !p.unit.isLeader && this.parent.cityPartyOut.leader.leadership > this.parent.cityPartyOut.fullSlots + 2 - 2) {
                    store.dispatch(actionMoveTwoCellUnitInOut({
                        unitId: portret.unit.uid,
                        units: [p.unit.uid]
                    }))
                        .then(() => portret.drop(point));
                    return;
                }else if(!p&&this.parent.cityPartyOut.leader.leadership >= this.parent.cityPartyOut.fullSlots + 2){
                    store.dispatch(actionMoveCitySquadInOut({
                        unitId: portret.unit.uid,
                        toIdx: contOut.data
                    }));
                }

                store.dispatch(dropCityPortret());
                portret.toStart();
            }else if(this.parent.cityPartyOut.leader.leadership >= this.parent.cityPartyOut.fullSlots + 1){
                store.dispatch(actionMoveCitySquadInOut({
                    unitId: portret.unit.uid,
                    toIdx: contOut.data
                }));
            }else{
                store.dispatch(dropCityPortret());
                portret.toStart();
            }
        }else{
            store.dispatch(dropCityPortret());
            portret.toStart();
        }
    }

    dropPortrait(point: TPoint, portret: PartyPortrait){
        //console.log('drop!!!');
        for (let i = 0; i < this.portraits.length; i++) {
            const p = this.portraits[i];
            if (p.cont.isOnPointer(point)&&p.unit.uid!==portret.unit.uid) {
                //console.log('on portrait', p.unit.defaultName);
                if(portret.unit.numCells===2){
                    const portraits = this.portraits.filter(p2=>p2.unit.position[0]===p.unit.position[0]);
                    //console.log(portraits.map(p2=>p2.unit.defaultName));
                    store.dispatch(actionMoveTwoCellCitySquadIn({
                        unitId: portret.unit.uid,
                        units: portraits.map(p2=>p2.unit.uid)
                    }));
                    return;
                }else if(p.unit.numCells===2){
                    const portraits = this.portraits.filter(p2=>p2.unit.position[0]===portret.unit.position[0]);
                    store.dispatch(actionMoveTwoCellCitySquadIn({
                        unitId: p.unit.uid,
                        units: portraits.map(p2=>p2.unit.uid)
                    }));
                    return;
                }
                store.dispatch(actionDoubleMoveCitySquadIn({
                    unitId: portret.unit.uid,
                    toUnitId: p.unit.uid
                }));
                return;
            }

        }

        for (let i = 0; i < this.parent.cityPartyOut.portraits.length; i++) {
            const p = this.parent.cityPartyOut.portraits[i];
            if (!p.unit.isLeader&&p.cont.isOnPointer(point)&&p.unit.uid!==portret.unit.uid) {
                //console.log('on portrait', p.unit.defaultName);
                //const leader = this.parent.cityPartyOut.getLeader();
                if(portret.unit.numCells===2&&p.unit.numCells===2){
                    if(!p.unit.isLeader){
                        store.dispatch(actionMoveTwoCellUnitInOut({
                            unitId: portret.unit.uid,
                            units: [p.unit.uid]
                        }));

                        return;
                    }else{
                        break;
                    }
                }else if(portret.unit.numCells===2){

                    //const portraits = this.portraits.filter(p2=>p2.unit.position[0]===p.unit.position[0]);
                    const units = this.parent.cityPartyOut.squad.filter(u=>u.position[0]===p.unit.position[0]);
                    if(!units.find(u=>u.isLeader)&&this.parent.cityPartyOut.fullSlots-units.length+1<this.parent.cityPartyOut.leader.leadership){
                        store.dispatch(actionMoveTwoCellUnitInOut({
                            unitId: portret.unit.uid,
                            units: units.map(u=>u.uid)
                        }));

                        return;
                    }else{
                        break;
                    }
                }else if(p.unit.numCells===2){
                    if(this.cityData.lvl>=this.fullSlots+1){
                        const portraits = this.portraits.filter(p2=>p2.unit.position[0]===portret.unit.position[0]);
                        store.dispatch(actionMoveTwoCellUnitInOut({
                            unitId: p.unit.uid,
                            units: portraits.map(p2=>p2.unit.uid)
                        }));
                        return;
                    }else{
                        break;
                    }
                }
                //console.log('from IN to OUT!!!');
                store.dispatch(actionMoveUnitInOut({
                    unitId: portret.unit.uid,
                    toUnitId: p.unit.uid
                }));
                return;
            }

        }
        
        for (let i = 0; i < this.conts.length; i++) {
            const cont = this.conts[i];
            if (cont.isOnPointer(point)) {
                //console.log('on container = ', cont.data);
                if(portret.unit.numCells===2){
                    const p = this.portraits.find(p=>p.unit.position[0]===cont.data[0]);
                    if(p){
                        //console.log(p.unit.defaultName);
                        store.dispatch(actionMoveTwoCellCitySquadIn({
                            unitId: portret.unit.uid,
                            units: [p.unit.uid]
                        }));
                        return;
                    }
                }
                store.dispatch(actionMoveCitySquadIn({
                    unitId: portret.unit.uid,
                    toIdx: cont.data,
                }));
                return;
            }
        }

        for (let i = 0; i < this.contsMove.length; i++) {
            const cont = this.contsMove[i];
            if (cont.isOnPointer(point)) {
                //console.log('on container contsMove = ', cont.data);
                if(portret.unit.numCells===2){
                    const p = this.portraits.find(p=>p.unit.position[0]===cont.data[0]);
                    if(p){
                        //console.log(p.unit.defaultName);
                        store.dispatch(actionMoveTwoCellCitySquadIn({
                            unitId: portret.unit.uid,
                            units: [p.unit.uid]
                        }));
                        return;
                    }
                }

                store.dispatch(actionMoveCitySquadIn({
                    unitId: portret.unit.uid,
                    toIdx: cont.data,
                }));

                return;
            }
        }

        for (let i = 0; i < this.parent.cityPartyOut.conts.length; i++) {
            const cont = this.parent.cityPartyOut.conts[i];
            if (cont.isOnPointer(point)) {
                //console.log('on container = ', cont.data);
                if(portret.unit.numCells===2){
                    const p = this.parent.cityPartyOut.portraits.find(p=>p.unit.position[0]===cont.data[0]);
                    if(p){
                        //console.log(p.unit.defaultName);
                        store.dispatch(actionMoveTwoCellUnitInOut({
                            unitId: portret.unit.uid,
                            units: [p.unit.uid]
                        }));
                        return;
                    }
                }
                store.dispatch(actionMoveCitySquadInOut({
                    unitId: portret.unit.uid,
                    toIdx: cont.data,
                }));
                return;
            }
        }

        portret.toStart();
    }
}