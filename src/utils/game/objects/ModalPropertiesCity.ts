import { ICity } from "store/slices/sliceGame";
import { IScene } from "../scenes/IScene";
import Sprite from "utils/gameLib/Sprite";
import InputElString from "./InputElString";
import InputEl from "./InputEl";
import SelectLine from "./SelectLine";
import Button from "./Button";
import store from "store/store";
import { actionChangeCityProps } from "store/actions/actionsGame";

export default class ModalPropertiesCity{
    cityData:ICity;
    private _fon:Sprite|undefined;
    inputCityName: InputElString|undefined;
    selectLvl: SelectLine|undefined;
    allInputs:(InputEl|InputElString)[]=[];
    btns:Button[] = [];
    isOpen = false;
    constructor(public scene: IScene){}

    init(cityData:ICity){
        this.cityData = cityData;
        const cameraPoint = this.scene.game.camera.cameraPoint();
        const x = 0+this.scene.halfWidth-cameraPoint.x;
        const y = 0+this.scene.halfHeight-cameraPoint.y;
        this._fon = this.scene.add.sprite('modal-city');
        this._fon.x = x;
        this._fon.y = y;
        this.inputCityName = new InputElString(this.scene,cityData.cityName,16,()=>{

        });
        this.inputCityName.x = x-210;
        this.inputCityName.y = y-120;
        this.allInputs.push(this.inputCityName);

        this.selectLvl = new SelectLine(this.scene,['1','2','3','4'],'1');
        this.selectLvl.init();
        this.selectLvl.x = x-30;
        this.selectLvl.y = y-120;

        const btnOk = new Button(this.scene,'Ok',this.onOk.bind(this));
        btnOk.init();
        btnOk.x = x+60;
        btnOk.y = y+150;
        this.btns.push(btnOk);

        const btnParty = new Button(this.scene,'Party & Reserve',()=>{});
        btnParty.init();
        btnParty.x = x-120;
        btnParty.y = y+150;
        this.btns.push(btnParty);

        this.isOpen = true;
    }

    onOk(){
        store.dispatch(actionChangeCityProps({
            cityName:this.inputCityName.value,
            lvl:Number(this.selectLvl.value)
        }))
            .unwrap()
            .then(()=>this.hide());
    }

    hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
            this.allInputs.forEach(input=>input.destroy());
            this.selectLvl.destroy();
            this.btns.forEach(btn=>btn.destroy());
            this.btns = [];
            this.allInputs = [];
            this.isOpen = false;
        }
    }

    keyboardInput(e:KeyboardEvent){
        //console.log('keyboardInput');
        this.allInputs.forEach(input=>{
            input.onChange(e);
        });
    }
}