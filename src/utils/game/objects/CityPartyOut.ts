import Container from "utils/gameLib/Container";
import ModalPropertiesCityParty from "./ModalPropertiesCityParty";
import Sprite from "utils/gameLib/Sprite";
import PartyPortrait from "./PartyPortrait";
import { TPoint } from "utils/gameLib/Game";
import Graphics from "utils/gameLib/Graphics";
import Text from "utils/gameLib/Text";
import { IScene } from "../scenes/IScene";
import ModalAddHero from "./ModalAddHero";
import { ICity, IUnit } from "store/slices/sliceGame";
import store from "store/store";
import { actionDoubleMoveCitySquadIn, actionMoveCitySquadIn, actionMoveTwoCellCitySquadIn } from "store/actions/actionsGame";

export default class CityPartyOut{
    conts: Container[] = [];
    contsMove: Container[] = [];
    borders: Sprite[] = [];
    portraits: PartyPortrait[] = [];
    idPointUp = '';
    idPointMove = '';
    contPos: TPoint[][] = [
        [
            {
                x: -244,
                y: -132,
            },
            {
                x: -324,
                y: -132,
            },
        ],
        [
            {
                x: -244,
                y: -26,
            },
            {
                x: -324,
                y: -26,
            },
        ],
        [
            {
                x: -244,
                y: 80,
            },
            {
                x: -324,
                y: 80,
            },
        ]
    ];
    private _fonAddLeader: Graphics|undefined;
    private _textAddLeader: Text|undefined;
    private _contSelectParty:Container|undefined;
    cityData:ICity|undefined;
    modalAddHero:ModalAddHero;
    scene:IScene;
    squad: IUnit[] = [];
    leader: IUnit|null;
    fullSlots:number = 0;
    constructor(public parent:ModalPropertiesCityParty){
        
    }

    init(){
        console.log('init CityPartyOut');
        this.scene = this.parent.scene;
        this.modalAddHero = new ModalAddHero(this.parent.scene, this);
        this.cityData = this.parent.parent.cityData;
        this.leader = null;
        this.fullSlots = 0;
        this.idPointMove = this.parent.scene.input.on('pointermove', (pointer) => {
            if(this.parent.modalAddUnit.isShow){
                return;
            }
            this.portraits.forEach(p => p.move(pointer));
        });

        this.idPointUp = this.scene.input.on('pointerup', (pointer) => {
            console.log('CityPartyOut pointerup');
            let isNext = true;
            if(this.parent.modalAddUnit.isShow||this.parent.cityPartyIn.portraits.find(p=>p.isCanMove)){
                console.log('modalAddUnit.isShow = ', this.parent.modalAddUnit.isShow);
                return;
            }
            this.portraits.forEach(p => {
                if (p.isCanMove) {
                    console.log('isCanMove call drop = ', p.unit.name);
                    isNext = false;
                }
                console.log('call drop = ', p.unit.name);
                p.drop(pointer);
            });
            //console.log('CapitalParty pointerup');
            if (isNext) {
                const cont = this.conts.find(c => c.isOnPointer(pointer));
                if (cont) {
                    console.log('add Unit to = ', cont.data);
                    this.parent.modalAddUnit.show(cont.data, this.cityData.id, 'out', this.cityData.squadOut);
                    //this.parent.modalAddUnit.show(cont.data, this.parent.parent.capitalData.id);
                }
            }

        });
        if(!this.cityData.squadOut){
            this._contSelectParty = this.scene.add.container(this.parent.x-285,this.parent.y-25);
            //this._contSelectParty.x = this.parent.x;
            //this._contSelectParty.y = this.parent.y;
            this._contSelectParty.setInteractiveRect(154,320);
            this.initSelectHero();
            // const idOn = this._contSelectParty.on('pointerup',()=>{
            //     this._contSelectParty.off(idOn);
            //     this.modalAddHero.init([1,0],this.parent.parent.cityData.id);
            // });
            this._fonAddLeader = this.scene.add.graphics();
            this._fonAddLeader.fillStyle('#7b786b');
            this._fonAddLeader.fillRect(this.parent.x-364,this.parent.y-185,154,320);
            this._fonAddLeader.setZindex(1000);
            this._textAddLeader = this.scene.add.text('Click to select party leader',0,0,148);
            this._textAddLeader.fontSize = 16;
            this._textAddLeader.x = this.parent.x-364+(154-this._textAddLeader.width)/2;
            this._textAddLeader.y = this.parent.y-185+this._textAddLeader.height+6;
            this._textAddLeader.setZindex(1000);
        }else{
            const party = store.getState().game.parties.find(p=>p.id===this.cityData.squadOut);
            this.squad = store.getState().game.units.filter(u=>u.partyId===party.id);
            console.log('units = ', this.squad);
            this.leader = this.squad.find(u=>u.isLeader);
            this.fullSlots = this.squad.reduce((prev,unit)=>{
                return prev+unit.numCells;
            },0)-this.leader.numCells;
            for (let i = 0; i < this.contPos.length; i++) {
                const row = this.contPos[i];
                for (let j = 0; j < row.length; j++) {
                    const pos = row[j];
                    const units = this.squad.filter(u => (u.position[0] === i));
                    if (units.length===0) {
                        if(this.fullSlots<this.leader.leadership){
                            this.addBorderOne(pos);
                            this.addContButtonAdd(pos,i,j);
                        }else{
                            this.addBorderPlag(pos);
                            this.addContButtonMove(pos,i,j);
                        }
                    } else {
                        if (units.length===1&&units[0].numCells === 2&&j===0) {
                            const sprite = this.parent.scene.add.sprite('place-two');
                            sprite.x = this.parent.x + pos.x - 39;
                            sprite.y = this.parent.y + pos.y - 1;
                            sprite.setZindex(1000);
                            this.borders.push(sprite);
                        } else if(units[0].numCells === 1){
                            if(units.find(u=>u.position[1]===j)){
                                //console.log('unit = ', unit.defaultName);
                                this.addBorderOne(pos);                            
                            }else{
                                if(this.fullSlots<this.leader.leadership){
                                    this.addBorderOne(pos);
                                    this.addContButtonAdd(pos,i,j);
                                }else{
                                    this.addBorderPlag(pos);
                                    this.addContButtonMove(pos,i,j);
                                }
                                // this.addBorderOne(pos);
                                // this.addContButtonAdd(pos,i,j);
                            }
                        }
                    }
                }
            }

            this.squad.forEach(unit => {
                const portrait = new PartyPortrait(this, unit, 'left');
                // const portret = this.parent.scene.add.sprite(`portrets-party-one-${unit.fraction}`);
                // portret.setFrame(portretPartyOneData[unit.icon]);
                // portret.x = this.parent.x+this.contPos[unit.position].x+1;
                // portret.y = this.parent.y+this.contPos[unit.position].y-10;
                // portret.flipX = true;
                this.portraits.push(portrait);
            });
        }
    }

    getLeader(){
        return this.squad.find(u=>u.isLeader);
    }

    dropPortrait(point: TPoint, portret: PartyPortrait) {
        // if(this.parent.modalAddUnit.isShow){
        //     console.log('modalAddUnit.isShow');
        //     return;
        // }
        console.log('drop!!! = ', portret.unit.name);
        for (let i = 0; i < this.portraits.length; i++) {
            const p = this.portraits[i];
            if (p.unit.uid!==portret.unit.uid&&p.cont.isOnPointer(point)) {
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

        for (let i = 0; i < this.contsMove.length; i++) {
            const cont = this.contsMove[i];
            if (cont.isOnPointer(point)) {
                console.log('on container contsMove = ', cont.data);
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

    initSelectHero(){
        if(this._contSelectParty){
            console.log('initSelectHero!!!! = ', this._contSelectParty);
            const idOn = this._contSelectParty.on('pointerup',()=>{
                if(this.parent.modalAddUnit.isShow||this.parent.cityPartyIn.portraits.find(p=>p.isCanMove)){
                    return;
                }
                this._contSelectParty.off(idOn);
                this.modalAddHero.init([1,0],this.parent.parent.cityData.id);
            });
        }
    }

    updateData(){
        console.log('updateData');
        const gameState = store.getState().game;
        const cityData = gameState.cities[gameState.selectObj.idx];
        
        this.hide();
        this.parent.parent.cityData = cityData;
        this.init();
    }

    hide(){
        console.log('hide CityPartyOut');
        if(this.cityData&&!this.cityData.squadOut&&this._fonAddLeader){
            this.scene.add.remove(this._fonAddLeader);
            this.scene.add.remove(this._textAddLeader);
            this.scene.add.remove(this._contSelectParty);
            this._contSelectParty = undefined;
            this._fonAddLeader = undefined;
            this._fonAddLeader = undefined;
            console.log('destroy _contSelectParty');
        }
        this.scene.input.off(this.idPointUp);
        this.scene.input.off(this.idPointMove);
        this.borders.forEach(b=>this.scene.add.remove(b));
        this.conts.forEach(c=>this.scene.add.remove(c));
        this.contsMove.forEach(c=>this.scene.add.remove(c));
        this.portraits.forEach(p=>p.destroy());
        this.borders = [];
        this.portraits = [];
        this.conts = [];
        this.contsMove = [];
    }
}