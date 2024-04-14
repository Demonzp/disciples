import { IUnit } from "store/slices/sliceGame";
import store from "store/store";
import Scene from "utils/gameLib/Scene";
import ArenaUnitPortrait from "./ArenaUnitPortrait";

export default class ArenaParty{
    private units: IUnit[] = [];
    private portraits: ArenaUnitPortrait[] = [];
    constructor(private scene: Scene){
        this.create();
    }

    create(){
        this.units = store.getState().multiArena.units;
        this.units.forEach(u=>{
            const portrait = new ArenaUnitPortrait(this.scene, u);
            this.portraits.push(portrait);
        });
    }
}