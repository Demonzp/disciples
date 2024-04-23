import { IUnit } from "store/slices/sliceGame";
import store from "store/store";
import Scene from "utils/gameLib/Scene";
import ArenaUnitPortrait from "./ArenaUnitPortrait";
import { TPointer } from "utils/gameLib/InputEvent";

export default class ArenaParty{
    private units: IUnit[] = [];
    private portraits: ArenaUnitPortrait[] = [];
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
        this.scene.input.on('pointermove', this.pointerMove, this);
    }

    pointerMove(pointer:TPointer){
        for (let i = 0; i < this.portraits.length; i++) {
            this.portraits[i].move(pointer);
            
        }
    }
}