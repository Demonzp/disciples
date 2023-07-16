import Sprite from "utils/gameLib/Sprite";
import ModalPropertiesCapitalParty from "./ModalPropertiesCapitalParty";
import { IBaseUnit, TRace, arrGlobalRaces, baseUnits } from "store/slices/sliceGame";
import Button from "./Button";
import store from "store/store";
import ItemSelectUnit from "./ItemSelectUnit";
import { TPoint } from "utils/gameLib/Game";

export default class ModalPropertiesAddUnit {
    private _fon: Sprite | undefined;
    private _arrowUp:Sprite|undefined;
    private _arrowDown:Sprite|undefined;
    races = arrGlobalRaces();
    selectRace: TRace = 'empire';
    units:IBaseUnit[]=[];
    numItems = 4;
    listPos = {
        start: 0,
        end:0
    }
    selectIdx = 0;
    itemUnits: ItemSelectUnit[] = [];
    buttons: Button[] = [];
    position = 0;
    posPortrets: TPoint[] = [
        {
            x: -142,
            y: -117
        },
        {
            x: -142,
            y: -29
        },
        {
            x: -142,
            y: 59
        },
        {
            x: -142,
            y: 147
        }
    ]
    constructor(public parent: ModalPropertiesCapitalParty) {

    }

    show(position: number) {

        this._fon = this.parent.scene.add.sprite('modal-add-units');
        this._fon.x = this.parent.x;
        this._fon.y = this.parent.y;
        this.position = position;
        let y = -190;
        const step = 38;
        this.races.forEach(r => {
            const btn = new Button(this.parent.scene, r, () => {
                this.selectRace = r;
                this.buttons.forEach(b => b.disable = false);
                btn.disable = true;
            });

            btn.init();
            if (r === 'empire') {
                btn.disable = true;
            }
            btn.x = this.parent.x + 130;
            btn.y = this.parent.y + y;
            y += step;
            this.buttons.push(btn);
        });

        this._arrowUp = this.parent.scene.add.sprite('arrows', this.parent.x+40, this.parent.y+100);
        this._arrowUp.on('pointerup', ()=>{});

        this._arrowDown = this.parent.scene.add.sprite('arrows', this.parent.x+40, this.parent.y+140);
        this._arrowDown.on('pointerup', this.onNext.bind(this));

        this.initListUnits();
    }

    initListUnits() {
        this.units = baseUnits.filter(u => {
            if (u.fraction === this.selectRace && !u.isHero&&!u.isCapitalGuard) {
                return true;
            }
            return false;
        });

        // let end = this.selectIdx+this.numItems-1;

        // if(end>this.units.length-1){
        //     end = this.units.length-1;
        // }
        // for (let i = this.selectIdx; i < end; i++) {
            
        // }
        // units.forEach(u=>{
        //     const item = new ItemSelectUnit(this.parent.scene, u);
        //     item.init();
        //     this.itemUnits.push(item);
        // });
        this.listPos.start = 0;
        this.posPortrets.forEach((pos, i) => {
            if (i < this.units.length) {
                const u = this.units[i];
                const item = new ItemSelectUnit(this.parent.scene, u, this.selectUnit.bind(this));
                item.init();
                item.setPosition(this.parent.x+pos.x,this.parent.y+pos.y);
                this.itemUnits.push(item);
                this.listPos.end = i;
            }
        });
        this.itemUnits[0].setIsSelect(true);
    }

    onNext(){
        const nextIdx = this.selectIdx+1;
        if(nextIdx>this.units.length-1){
            return;
        }

        //this.selectIdx = nextIdx;
        if(this.listPos.end<nextIdx){
            this.listPos.start = this.listPos.start+1;
            this.listPos.end = this.listPos.end+1;
            if(this.listPos.end>this.units.length-1){
                this.listPos.end = this.units.length-1;
            }
            this.itemUnits.forEach(item=>item.destroy());
            this.itemUnits = [];
            let j = 0;
            for (let i = this.listPos.start; i < this.listPos.end; i++) {
                const unit = this.units[i];
                const listItem = new ItemSelectUnit(this.parent.scene, unit, this.selectUnit.bind(this));
                listItem.init();
                listItem.setPosition(this.parent.x+this.posPortrets[j].x,this.parent.y+this.posPortrets[j].y);
                this.itemUnits.push(listItem);
            }
        } 

        this.selectByUnit(this.units[nextIdx]);
    }

    selectByUnit(unit:IBaseUnit){
        //this.itemUnits.forEach(item=>item.setIsSelect(false));
        const item = this.itemUnits.find(item=>item.unit.id===unit.id);
        item.onClick(item);
    }

    selectUnit(item:ItemSelectUnit){
        this.itemUnits.forEach(item=>item.setIsSelect(false));
        item.setIsSelect(true);
        this.selectIdx = this.units.findIndex(u=>u.id===item.unit.id);
        //console.log(unit.defaultName);
    }

    hide() {

    }
}