import Scene from "utils/gameLib/Scene";
import ModalPropertiesCapitalParty from "./ModalPropertiesCapitalParty";
import Container from "utils/gameLib/Container";
import store from "store/store";
import { TPoint } from "utils/gameLib/Game";
import Sprite from "utils/gameLib/Sprite";
import { IUnit, portretPartyOneData } from "store/slices/sliceGame";
import PartyPortrait from "./PartyPortrait";
import { actionDoubleMoveCitySquadIn, actionMoveCitySquadIn, actionMoveTwoCellCitySquadIn } from "store/actions/actionsGame";

//invalid position in group
export default class CapitalParty {
    conts: Container[] = [];
    borders: Sprite[] = [];
    portraits: PartyPortrait[] = [];
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
    // contPos: TPoint[] = [
    //     {
    //         x:244,
    //         y:-132,
    //     },
    //     {
    //         x:244,
    //         y:-26,
    //     },
    //     {
    //         x:244,
    //         y:80,
    //     },
    //     {
    //         x:324,
    //         y:-132,
    //     },
    //     {
    //         x:324,
    //         y:-26,
    //     },
    //     {
    //         x:324,
    //         y:80,
    //     },
    // ];
    squadIn: IUnit[] = [];
    idPointUp = '';
    idPointMove = '';
    scene: Scene;
    constructor(public parent: ModalPropertiesCapitalParty) {
        //this.scene = this.parent.scene;
    }

    init() {
        const capitalData = this.parent.parent.capitalData;
        console.log('CapitalParty capitalData = ', capitalData);
        const units = store.getState().game.units;
        this.squadIn = capitalData.squadIn.map(uid => {
            return units.find(u => u.uid === uid);
        });
        for (let i = 0; i < this.contPos.length; i++) {
            const row = this.contPos[i];
            for (let j = 0; j < row.length; j++) {
                const pos = row[j];
                const units = this.squadIn.filter(u => (u.position[0] === i));
                if (units.length===0) {
                    this.addBorderOne(pos);
                    this.addContButtonAdd(pos,i,j);
                } else {
                    if (units.length===1&&units[0].numCells === 2&&j===0) {
                        const sprite = this.parent.scene.add.sprite('place-two');
                        sprite.x = this.parent.x + pos.x + 41;
                        sprite.y = this.parent.y + pos.y - 1;
                        sprite.setZindex(1000);
                        this.borders.push(sprite);
                    } else if(units[0].numCells === 1){
                        if(units.find(u=>u.position[1]===j)){
                            //console.log('unit = ', unit.defaultName);
                            this.addBorderOne(pos);                            
                        }else{
                            this.addBorderOne(pos);
                            this.addContButtonAdd(pos,i,j);
                        }
                    }
                }
            }
        }

        this.squadIn.forEach(unit => {
            const portrait = new PartyPortrait(this, unit, 'right');
            // const portret = this.parent.scene.add.sprite(`portrets-party-one-${unit.fraction}`);
            // portret.setFrame(portretPartyOneData[unit.icon]);
            // portret.x = this.parent.x+this.contPos[unit.position].x+1;
            // portret.y = this.parent.y+this.contPos[unit.position].y-10;
            // portret.flipX = true;
            this.portraits.push(portrait);
        });

        this.idPointMove = this.parent.scene.input.on('pointermove', (pointer) => {
            this.portraits.forEach(p => p.move(pointer));
        });

        this.idPointUp = this.parent.scene.input.on('pointerup', (pointer) => {
            let isNext = true;
            this.portraits.forEach(p => {
                if (p.isCanMove) {
                    isNext = false;
                }
                p.drop(pointer);
            });
            console.log('CapitalParty pointerup');
            if (isNext && !this.parent.modalAddUnit.isShow) {
                const cont = this.conts.find(c => c.isOnPointer(pointer));
                if (cont) {
                    console.log('add Unit to = ', cont.data);
                    this.parent.modalAddUnit.show(cont.data, this.parent.parent.capitalData.id);
                }
            }

        });

        console.log('lenght = ', this.conts.length);
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

    hide() {
        console.log('hide!!!!!!!!!!!!!!!!!!!!!');
        this.conts.forEach(cont => this.parent.scene.add.remove(cont));
        this.borders.forEach(s=>this.parent.scene.add.remove(s));
        this.borders = [];
        this.conts = [];
        this.portraits.forEach(p => p.destroy());
        this.portraits = [];

        this.parent.scene.input.off(this.idPointMove);
        this.parent.scene.input.off(this.idPointUp);
    }

    dropPortrait(point: TPoint, portret: PartyPortrait) {
        console.log('drop!!!');
        for (let i = 0; i < this.portraits.length; i++) {
            const p = this.portraits[i];
            if (p.cont.isOnPointer(point)&&p.unit.uid!==portret.unit.uid) {
                console.log('on portrait', p.unit.defaultName);
                if(portret.unit.numCells===2){
                    const portraits = this.portraits.filter(p2=>p2.unit.position[0]===p.unit.position[0]);
                    console.log(portraits.map(p2=>p2.unit.defaultName));
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
        
        for (let i = 0; i < this.conts.length; i++) {
            const cont = this.conts[i];
            if (cont.isOnPointer(point)) {
                console.log('on container = ', cont.data);
                if(portret.unit.numCells===2){
                    const p = this.portraits.find(p=>p.unit.position[0]===cont.data[0]);
                    if(p){
                        console.log(p.unit.defaultName);
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

        portret.toStart();
    }
}