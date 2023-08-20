import Sprite from "utils/gameLib/Sprite";
import { IScene } from "../scenes/IScene";
import { IBaseUnit, TRace, arrGlobalRaces, baseUnits } from "store/slices/sliceGame";
import ItemSelectUnit from "./ItemSelectUnit";
import Button from "./Button";
import { TPoint } from "utils/gameLib/Game";
import store from "store/store";
import { actionAddLeaderToPartyCity } from "store/actions/actionsGame";

export default class ModalAddHero{
    private _fon: Sprite | undefined;
    private _arrowUp: Sprite | undefined;
    private _arrowDown: Sprite | undefined;
    races = arrGlobalRaces();
    selectRace: TRace = 'empire';
    units: IBaseUnit[] = [];
    numItems = 4;
    listPos = {
        start: 0,
        end: 0
    }
    selectIdx = 0;
    itemUnits: ItemSelectUnit[] = [];
    buttons: Button[] = [];
    position: [number, number] = [0, 0];
    cityId = '';
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
    private _isModalMes = false;
    x=0;
    y=0;
    constructor(public scene:IScene){
        
        const cameraPoint = this.scene.game.camera.cameraPoint();
        this.x = 0+this.scene.halfWidth-cameraPoint.x;
        this.y = 0+this.scene.halfHeight-cameraPoint.y;
    }

    get isShow() {
        return this._isShow;
    }

    initListUnits() {


        this.units = baseUnits.filter(u => {
            if (u.fraction === this.selectRace && u.isHero && !u.isCapitalGuard) {
                return true;
            }
            return false;
        });

        this.listPos.start = 0;
        this.posPortrets.forEach((pos, i) => {
            if (i < this.units.length) {
                const u = this.units[i];
                const item = new ItemSelectUnit(this.scene, u, this.selectUnit.bind(this));
                item.init();
                item.setPosition(this.x + pos.x, this.y + pos.y);
                this.itemUnits.push(item);
                this.listPos.end = i;
            }
        });
        this.itemUnits[0].setIsSelect(true);
    }

    selectUnit(item: ItemSelectUnit) {
        this.itemUnits.forEach(item => item.setIsSelect(false));
        item.setIsSelect(true);
        this.selectIdx = this.units.findIndex(u => u.id === item.unit.id);
        if (this.selectIdx > 0) {
            this._arrowUp.setFrame(22);
        } else {
            this._arrowUp.setFrame(14);
        }

        if (this.selectIdx < this.units.length - 1) {
            this._arrowDown.setFrame(5);
        } else {
            this._arrowDown.setFrame(1);
        }
        //console.log(unit.defaultName);
    }

    init(position: [number, number], cityId: string){
        this.cityId = cityId;
        this._fon = this.scene.add.sprite('modal-add-units');
        this._fon.x = this.x;
        this._fon.y = this.y;
        this.position = position;
        let y = -190;
        const step = 38;
        this.races.forEach(r => {
            const btn = new Button(this.scene, r, () => {
                this.selectRace = r;
                this.buttons.forEach(b => b.disable = false);
                btn.disable = true;
            });

            btn.init();
            if (r === 'empire') {
                btn.disable = true;
            }
            btn.x = this.x + 130;
            btn.y = this.y + y;
            y += step;
            this.buttons.push(btn);
        });

        this._arrowUp = this.scene.add.sprite('arrows', this.x + 40, this.y + 100);
        this._arrowUp.on('pointerup', this.onPrev, this);
        this._arrowUp.setFrame(14);

        this._arrowDown = this.scene.add.sprite('arrows', this.x + 40, this.y + 140);
        this._arrowDown.on('pointerup', this.onNext, this);

        this.initListUnits();
        const btnOk = new Button(this.scene, 'Ok', this.onOk.bind(this));
        btnOk.init();
        btnOk.x = this.x - 100;
        btnOk.y = this.y + 203;
        this.buttons.push(btnOk);

        const btnCancel = new Button(this.scene, 'CANCEL', () => {
            if(this._isModalMes){
                return;
            }
            this.hide();
        });
        btnCancel.init();
        btnCancel.x = this.x - 20;
        btnCancel.y = this.y + 203;
        this.buttons.push(btnCancel);
        this._isShow = true;
    }

    hide(){
        if (this._fon) {
            this.scene.add.remove(this._fon);
            this.scene.add.remove(this._arrowDown);
            this.scene.add.remove(this._arrowUp);
            this.itemUnits.forEach(item => item.destroy());
            this.buttons.forEach(btn => btn.destroy());
            this.itemUnits = [];
            this.buttons = [];
            this.selectIdx = 0;
            this._isShow = false;
        }
    }

    selectByUnit(unit: IBaseUnit) {
        //this.itemUnits.forEach(item=>item.setIsSelect(false));
        const item = this.itemUnits.find(item => item.unit.id === unit.id);
        item.onClick(item);
    }

    onPrev() {
        const prevIdx = this.selectIdx - 1;
        if (prevIdx < 0) {
            return;
        }
        //console.log(this.listPos.start,'||', prevIdx,'||',this.listPos.end);
        if (this.listPos.start > prevIdx) {
            this.listPos.start = this.listPos.start - 1;
            this.listPos.end = this.listPos.end - 1;
            if (this.listPos.start < 0) {
                this.listPos.start = 0;
                this.listPos.end = this.listPos.end + 1;
            }
            this.itemUnits.forEach(item => item.destroy());
            this.itemUnits = [];
            let j = 0;
            for (let i = this.listPos.start; i <= this.listPos.end; i++) {
                const unit = this.units[i];
                const listItem = new ItemSelectUnit(this.scene, unit, this.selectUnit.bind(this));
                listItem.init();
                listItem.setPosition(this.x + this.posPortrets[j].x, this.y + this.posPortrets[j].y);
                this.itemUnits.push(listItem);
                j++;
            }
        }

        this.selectByUnit(this.units[prevIdx]);
    }

    onNext() {
        const nextIdx = this.selectIdx + 1;
        if (nextIdx > this.units.length - 1) {
            return;
        }
        //this._arrowUp.setFrame(22);
        //console.log(this.listPos.end,'||',nextIdx);
        if (this.listPos.end < nextIdx) {
            this.listPos.start = this.listPos.start + 1;
            this.listPos.end = this.listPos.end + 1;
            if (this.listPos.end > this.units.length - 1) {
                this.listPos.end = this.units.length - 1;
            }
            this.itemUnits.forEach(item => item.destroy());
            this.itemUnits = [];
            let j = 0;
            for (let i = this.listPos.start; i <= this.listPos.end; i++) {
                const unit = this.units[i];
                const listItem = new ItemSelectUnit(this.scene, unit, this.selectUnit.bind(this));
                listItem.init();
                listItem.setPosition(this.x + this.posPortrets[j].x, this.y + this.posPortrets[j].y);
                this.itemUnits.push(listItem);
                j++;
            }
        }

        this.selectByUnit(this.units[nextIdx]);
    }

    onOk(){
        store.dispatch(actionAddLeaderToPartyCity({
            cityId: this.cityId,
            unitId: this.units[this.selectIdx].id
        })).unwrap().then(() => this.hide());
    }
}