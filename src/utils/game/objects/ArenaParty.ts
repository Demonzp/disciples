import { IUnit } from "store/slices/sliceGame";
import store from "store/store";
import Scene from "utils/gameLib/Scene";
import ArenaUnitPortrait from "./ArenaUnitPortrait";
import Container from "utils/gameLib/Container";
import { TPoint } from "utils/gameLib/Game";
import { TPointer } from "utils/gameLib/InputEvent";
import { setIsUpUnit } from "store/slices/sliceMultiArena";
import { unitToUnit } from "store/actions/actionArena";

export const coordinats:{[key:string]:TPoint} = {
    '00':{x:219,y:49},
    '01':{x:301,y:49},
    '10':{x:219,y:154},
    '11':{x:301,y:154},
    '20':{x:219,y:260},
    '21':{x:301,y:260},
};

export default class ArenaParty{
    private units: IUnit[] = [];
    private portraits: ArenaUnitPortrait[] = [];
    private cells:Container[] = [];
    constructor(private scene: Scene){
        this.create();
    }

    create(){
        this.units = store.getState().multiArena.units;
        console.log('num units = ', this.units.length);
        // for (let i = 0; i < this.units.length; i++) {
            
        //     const u = this.units[i];
        //     console.log(`add unit ${u.defaultName}`);
        //     const portrait = new ArenaUnitPortrait(this.scene, u);
        //     this.portraits.push(portrait);
        // }
        this.units.forEach(u=>{
            console.log(`add unit ${u.defaultName}`);
            const portrait = new ArenaUnitPortrait(this.scene, u);

            this.portraits.push(portrait);
        });
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                
                if(!this.units.find(u=>u.position[0]===i&&u.position[1]===j)){
                    const pos = coordinats[`${i}${j}`];
                    //console.log('pos = ', pos);
                    const cont = this.scene.add.container(pos.x, pos.y);
                    cont.data = [i,j];
                    cont.setInteractiveRect(70,85);
                    this.cells.push(cont);
                    
                    // cont.on('pointerup',()=>{
                    //     console.log('drop on = ', cont.data);
                    // });
                }
                  
            }
        }
        this.scene.input.on('pointermove', this.pointerMove, this);
        this.scene.input.on('pointerup', this.pointerUp, this);
    }

    pointerMove(pointer:TPointer){
        for (let i = 0; i < this.portraits.length; i++) {
            this.portraits[i].move(pointer);
            
        }
    }

    pointerUp(pointer:TPointer){
        console.log('pointerUp-----');
        for (let i = 0; i < this.portraits.length; i++) {
            const portrait = this.portraits[i];
            if(portrait.isUp){
                store.dispatch(setIsUpUnit(false));
                portrait.drop();
                const cell = this.cells.find(c=>c.isOnPointer(pointer));
                if(cell){
                    console.log('drop on', cell.data);
                    return;
                }
                const onPortrair = this.portraits.find(p=>{
                    if((p.unit.position[0]!==portrait.unit.position[0]||
                        p.unit.position[1]!==portrait.unit.position[1])&&
                        p.container.isOnPointer(pointer)
                    ){
                        return true;
                    }
                    return false;
                });
                if(onPortrair){
                    console.log('drop on portrait = ', onPortrair.unit.defaultName);
                    store.dispatch(unitToUnit({
                        unit1:portrait.unit.position,
                        unit2:onPortrair.unit.position
                    }))
                    return;
                }
                //portrait.drop();
                portrait.toStartPos();
            }
            
        }
    }
}