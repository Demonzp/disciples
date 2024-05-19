import { IUnit } from "store/slices/sliceGame";
import store from "store/store";
import Scene from "utils/gameLib/Scene";
import ArenaUnitPortrait from "./ArenaUnitPortrait";
import Container from "utils/gameLib/Container";
import { TPoint } from "utils/gameLib/Game";
import { TPointer } from "utils/gameLib/InputEvent";
import { setIsShowHireHero, setIsUpUnit } from "store/slices/sliceMultiArena";
import { unitToCell, unitToUnit } from "store/actions/actionArena";

export const coordinats = (key: string): TPoint => {
    const obj: { [key: string]: TPoint } = {
        '00': { x: 219, y: 49 },
        '01': { x: 301, y: 49 },
        '10': { x: 219, y: 154 },
        '11': { x: 301, y: 154 },
        '20': { x: 219, y: 260 },
        '21': { x: 301, y: 260 },
    }
    return { ...obj[key] }
};

export default class ArenaParty {
    private units: IUnit[] = [];
    private portraits: ArenaUnitPortrait[] = [];
    private cells: Container[] = [];
    constructor(private scene: Scene) {
        //this.create();
        this.scene.input.on('pointermove', this.pointerMove, this);
        this.scene.input.on('pointerup', this.pointerUp, this);
    }

    create() {
        this.units = store.getState().multiArena.units;
        console.log('num units = ', this.units.length);
        this.units.forEach(u => {
            console.log(`add unit ${u.defaultName}|${u.position[0]}:${u.position[1]}`);
            const portrait = new ArenaUnitPortrait(this.scene, u);

            this.portraits.push(portrait);
        });
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {

                if (!this.units.find(u => {
                    if (u.numCells !== 2 && (u.position[0] === i && u.position[1] === j)) {
                        //console.log(`find = ${u.defaultName}|${i}:${j}`);
                        return true;
                    }
                    if (u.numCells === 2 && u.position[0] === i) {
                        //console.log(`find = ${u.defaultName}|${i}:${j}`);
                        return true;
                    }
                    return false;
                })) {
                    const pos = coordinats(`${i}${j}`);
                    //console.log('pos = ', pos);
                    const cont = this.scene.add.container(pos.x, pos.y);
                    cont.data = [i, j];
                    cont.setInteractiveRect(70, 85);
                    this.cells.push(cont);

                    // cont.on('pointerup',()=>{
                    //     console.log('drop on = ', cont.data);
                    // });
                }

            }
        }

    }

    updateUnits() {
        this.portraits.forEach(p => p.destroy());
        this.portraits = [];
        this.scene.add.remove(this.cells);
        this.cells = [];
        this.create();
    }

    pointerMove(pointer: TPointer) {
        for (let i = 0; i < this.portraits.length; i++) {
            this.portraits[i].move(pointer);

        }
    }

    pointerUp(pointer: TPointer) {
        const {isShowHeroUp, isShowHireHero, isLoad} = store.getState().multiArena;
        if (isShowHireHero||isShowHeroUp||isLoad) {
            return;
        }
        console.log('pointerUp-----');
        const cell = this.cells.find(c => c.isOnPointer(pointer));
        for (let i = 0; i < this.portraits.length; i++) {
            const portrait = this.portraits[i];
            if (portrait.isUp) {
                //console.log('portrait isUp = ', portrait.unit.defaultName);
                store.dispatch(setIsUpUnit(false));
                portrait.drop();

                if (cell) {
                    console.log('drop on', cell.data);
                    store.dispatch(unitToCell({
                        unitPos: portrait.unit.position,
                        cellPos: cell.data
                    }));
                    //portrait.toStartPos();
                    return;
                }
                const onPortrair = this.portraits.find(p => {
                    if (p.unit.uid !== portrait.unit.uid &&
                        p.container.isOnPointer(pointer)
                    ) {
                        return true;
                    }
                    return false;
                });
                if (onPortrair) {
                    //console.log('drop on portrait = ', onPortrair.unit.defaultName);
                    store.dispatch(unitToUnit({
                        unit1: portrait.unit.position,
                        unit2: onPortrair.unit.position
                    }));
                    return;
                }
                //portrait.drop();
                portrait.toStartPos();
                return;
            }
            
        }
        if (cell) {
            //console.log('show select hero');
            store.dispatch(setIsShowHireHero(cell.data));
            //console.log('select hero');
        }
    }
}