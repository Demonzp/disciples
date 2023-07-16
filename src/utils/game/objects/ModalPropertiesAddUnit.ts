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
    private _isShow = false;
    constructor(public parent: ModalPropertiesCapitalParty) {

    }

    get isShow(){
        return this._isShow;
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
        this._arrowUp.on('pointerup', this.onPrev, this);
        this._arrowUp.setFrame(14);

        this._arrowDown = this.parent.scene.add.sprite('arrows', this.parent.x+40, this.parent.y+140);
        this._arrowDown.on('pointerup', this.onNext, this);

        this.initListUnits();
        const btnOk = new Button(this.parent.scene, 'Ok');
        btnOk.init();
        btnOk.x = this.parent.x-100;
        btnOk.y = this.parent.y+203;
        this.buttons.push(btnOk);

        const btnCancel = new Button(this.parent.scene, 'CANCEL', ()=>{
            this.hide();
        });
        btnCancel.init();
        btnCancel.x = this.parent.x-20;
        btnCancel.y = this.parent.y+203;
        this.buttons.push(btnCancel);
        this._isShow = true;
    }

    initListUnits() {
        this.units = baseUnits.filter(u => {
            if (u.fraction === this.selectRace && !u.isHero&&!u.isCapitalGuard) {
                return true;
            }
            return false;
        });

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

    onPrev(){
        const prevIdx = this.selectIdx-1;
        if(prevIdx<0){
            return;
        }
        //console.log(this.listPos.start,'||', prevIdx,'||',this.listPos.end);
        if(this.listPos.start>prevIdx){
            this.listPos.start = this.listPos.start-1;
            this.listPos.end = this.listPos.end-1;
            if(this.listPos.start<0){
                this.listPos.start = 0;
                this.listPos.end = this.listPos.end+1;
            }
            this.itemUnits.forEach(item=>item.destroy());
            this.itemUnits = [];
            let j = 0;
            for (let i = this.listPos.start; i <= this.listPos.end; i++) {
                const unit = this.units[i];
                const listItem = new ItemSelectUnit(this.parent.scene, unit, this.selectUnit.bind(this));
                listItem.init();
                listItem.setPosition(this.parent.x+this.posPortrets[j].x,this.parent.y+this.posPortrets[j].y);
                this.itemUnits.push(listItem);
                j++;
            }
        }

        this.selectByUnit(this.units[prevIdx]);
    }

    onNext(){
        const nextIdx = this.selectIdx+1;
        if(nextIdx>this.units.length-1){
            return;
        }
        //this._arrowUp.setFrame(22);
        //console.log(this.listPos.end,'||',nextIdx);
        if(this.listPos.end<nextIdx){
            this.listPos.start = this.listPos.start+1;
            this.listPos.end = this.listPos.end+1;
            if(this.listPos.end>this.units.length-1){
                this.listPos.end = this.units.length-1;
            }
            this.itemUnits.forEach(item=>item.destroy());
            this.itemUnits = [];
            let j = 0;
            for (let i = this.listPos.start; i <= this.listPos.end; i++) {
                const unit = this.units[i];
                const listItem = new ItemSelectUnit(this.parent.scene, unit, this.selectUnit.bind(this));
                listItem.init();
                listItem.setPosition(this.parent.x+this.posPortrets[j].x,this.parent.y+this.posPortrets[j].y);
                this.itemUnits.push(listItem);
                j++;
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
        if(this.selectIdx>0){
            this._arrowUp.setFrame(22);
        }else{
            this._arrowUp.setFrame(14);
        }

        if(this.selectIdx<this.units.length-1){
            this._arrowDown.setFrame(5);
        }else{
            this._arrowDown.setFrame(1);
        }
        //console.log(unit.defaultName);
    }

    hide() {
        if(this._fon){
            this.parent.scene.add.remove(this._fon);
            this.parent.scene.add.remove(this._arrowDown);
            this.parent.scene.add.remove(this._arrowUp);
            this.itemUnits.forEach(item=>item.destroy());
            this.buttons.forEach(btn=>btn.destroy());
            this._isShow = false;
        }
    }

    onOk(){
        
    }
}