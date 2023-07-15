import Sprite from "utils/gameLib/Sprite";
import ModalPropertiesCapitalParty from "./ModalPropertiesCapitalParty";
import { TRace, arrGlobalRaces } from "store/slices/sliceGame";
import Button from "./Button";

export default class ModalPropertiesAddUnit {
    private _fon: Sprite | undefined;
    races = arrGlobalRaces();
    selectRace: TRace = 'empire';
    buttons: Button[] = [];
    position = 0;
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
            });
            btn.init();
            btn.x = this.parent.x+130;
            btn.y = this.parent.y+y;
            y+=step;
            this.buttons.push(btn);
        });
    }

    hide() {

    }
}