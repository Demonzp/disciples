import Container from "utils/gameLib/Container";
import ModalPropertiesCityParty from "./ModalPropertiesCityParty";
import Sprite from "utils/gameLib/Sprite";
import PartyPortrait from "./PartyPortrait";
import { TPoint } from "utils/gameLib/Game";
import Graphics from "utils/gameLib/Graphics";
import Text from "utils/gameLib/Text";
import { IScene } from "../scenes/IScene";
import ModalAddHero from "./ModalAddHero";
import { ICity } from "store/slices/sliceGame";
import store from "store/store";

export default class CityPartyOut{
    conts: Container[] = [];
    borders: Sprite[] = [];
    portraits: PartyPortrait[] = [];
    idPointUp = '';
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
    constructor(public parent:ModalPropertiesCityParty){
        
    }

    init(){
        this.scene = this.parent.scene;
        this.modalAddHero = new ModalAddHero(this.parent.scene, this);
        this.cityData = this.parent.parent.cityData;
        this.idPointUp = this.scene.input.on('pointerup', (pointer) => {
            let isNext = true;
            this.portraits.forEach(p => {
                if (p.isCanMove) {
                    isNext = false;
                }
                p.drop(pointer);
            });
            //console.log('CapitalParty pointerup');
            if (isNext) {
                const cont = this.conts.find(c => c.isOnPointer(pointer));
                if (cont) {
                    console.log('add Unit to = ', cont.data);
                    this.parent.modalAddUnit.show(cont.data, this.cityData.id, 'out');
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
            const squad = store.getState().game.units.filter(u=>u.partyId===party.id);
            console.log('units = ', squad);
            for (let i = 0; i < this.contPos.length; i++) {
                const row = this.contPos[i];
                for (let j = 0; j < row.length; j++) {
                    const pos = row[j];
                    const units = squad.filter(u => (u.position[0] === i));
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

            squad.forEach(unit => {
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

    dropPortrait(point: TPoint, portret: PartyPortrait) {
        console.log('drop!!!');
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
        this.borders.forEach(b=>this.scene.add.remove(b));
        this.conts.forEach(c=>this.scene.add.remove(c));
    }
}