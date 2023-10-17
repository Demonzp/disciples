import Container from "utils/gameLib/Container";
import ModalPropertiesCityParty from "./ModalPropertiesCityParty";
import Sprite from "utils/gameLib/Sprite";
import PartyPortrait from "./PartyPortrait";
import { TPoint } from "utils/gameLib/Game";
import { ICity, IUnit } from "store/slices/sliceGame";
import { IScene } from "../scenes/IScene";
import store from "store/store";

export default class CityPartyIn{
    conts: Container[] = [];
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
    constructor(public parent:ModalPropertiesCityParty){}

    init(){
        this.scene = this.parent.scene;
        this.cityData = this.parent.parent.cityData;
        const units = store.getState().game.units;
        this.squad = this.cityData.squadIn.map(uid => {
            return units.find(u => u.uid === uid);
        });

        for (let i = 0; i < this.contPos.length; i++) {
            const row = this.contPos[i];
            for (let j = 0; j < row.length; j++) {
                const pos = row[j];
                const units = this.squad.filter(u => (u.position[0] === i));
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
                            this.addBorderOne(pos);                            
                        }else{
                            this.addBorderOne(pos);
                            this.addContButtonAdd(pos,i,j);
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
            if(this.parent.modalAddUnit.isShow){
                return;
            }
            this.portraits.forEach(p => p.move(pointer));
        });

        this.idPointUp = this.scene.input.on('pointerup', (pointer) => {
            let isNext = true;
            if(this.parent.modalAddUnit.isShow){
                console.log('modalAddUnit.isShow');
                return;
            }
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
                    this.parent.modalAddUnit.show(cont.data, this.cityData.id, 'in');
                    //this.parent.modalAddUnit.show(cont.data, this.parent.parent.capitalData.id);
                }
            }

        });
    }

    hide(){
        this.portraits.forEach(p=>p.destroy());
        this.borders.forEach(b=>this.scene.add.remove(b));
        this.conts.forEach(c=>this.scene.add.remove(c));
        this.portraits = [];
        this.borders = [];
        this.portraits = [];
        this.conts = [];
    }

    updateData(){
        console.log('updateData CityPartyIn');
        const gameState = store.getState().game;
        const cityData = gameState.cities[gameState.selectObj.idx];
        
        this.hide();
        this.parent.parent.cityData = cityData;
        this.init();
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

    dropPortrait(point: TPoint, portret: PartyPortrait){

    }
}