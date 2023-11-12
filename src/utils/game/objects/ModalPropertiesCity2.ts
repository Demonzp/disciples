import { ICity, setCityLvl } from "store/slices/sliceGame";
import { IScene } from "../scenes/IScene";
import Sprite from "utils/gameLib/Sprite";
import InputElString from "./InputElString";
import InputEl from "./InputEl";
import SelectLine from "./SelectLine";
import Button from "./Button";
import store from "store/store";
import { actionChangeCityProps } from "store/actions/actionsGame";
import ModalPropertiesCityParty2 from "./ModalPropertiesCityParty";
import ModalMessage from "./ModalMessage";
import { openCityParty } from "store/slices/cityParty";

export default class ModalPropertiesCity2{
    cityData:ICity;
    private _fon:Sprite|undefined;
    inputCityName: InputElString|undefined;
    selectLvl: SelectLine|undefined;
    allInputs:(InputEl|InputElString)[]=[];
    btns:Button[] = [];
    isOpen = false;
    private _isModalMes = false;
    constructor(public scene: IScene){}

    init(cityData:ICity){
        if(this.isOpen){
            return;
        }
        //console.log('init ModalPropertiesCity');
        this.cityData = cityData;
        const cameraPoint = this.scene.game.camera.cameraPoint();
        const x = 0+this.scene.halfWidth-cameraPoint.x;
        const y = 0+this.scene.halfHeight-cameraPoint.y;
        this._fon = this.scene.add.sprite('modal-city');
        this._fon.x = x;
        this._fon.y = y;
        //this._fon.setZindex(1001);
        this.inputCityName = new InputElString(this.scene,cityData.cityName,16,()=>{

        });
        this.inputCityName.x = x-210;
        this.inputCityName.y = y-120;
        this.allInputs.push(this.inputCityName);

        this.selectLvl = new SelectLine(this.scene,['5','4','3','2','1'],String(cityData.lvl),this.changeLvl.bind(this));
        this.selectLvl.init();
        this.selectLvl.x = x-30;
        this.selectLvl.y = y-120;

        const btnOk = new Button(this.scene,'Ok',this.onOk.bind(this));
        btnOk.init();
        btnOk.x = x+60;
        btnOk.y = y+150;
        this.btns.push(btnOk);

        //const btnParty = new Button(this.scene,'Party & Reserve',this.onParty.bind(this));
        const btnParty = new Button(this.scene,'Party & Reserve',()=>{
            this.hide();
            store.dispatch(openCityParty());
        });
        btnParty.init();
        btnParty.x = x-120;
        btnParty.y = y+150;
        this.btns.push(btnParty);

        this.isOpen = true;
    }

    onOk(){
        this.allInputs.forEach(input=>{
            input.ofSelect();
        });
        if(this.inputCityName.value.length<=0){
            return;
        }
        store.dispatch(actionChangeCityProps({
            cityName:this.inputCityName.value,
            lvl:Number(this.selectLvl.value)
        }))
            .unwrap()
            .then(()=>this.hide());
    }

    changeLvl(data: string){
        //console.log('changeLvl');
        const unitsIn = store.getState().game.units.filter(u=>u.cityId===this.cityData.id&&!u.partyId);
        if(unitsIn.reduce((prev, u)=>prev+u.numCells,0)>Number(data)){
            const msg = new ModalMessage(this.scene as IScene, () => { this._isModalMes = false });
            this._isModalMes = true;
            msg.init('remove units before reducing the city level');
            this.selectLvl.value = String(Number(data)+1);
            return;
        }
        this._hide();
        store.dispatch(setCityLvl({cityId:this.cityData.id, lvl: Number(data)}));
        //this.hide();
    }

    hide(){
        if(this._isModalMes){
            return;
        }
        this._hide();
        //this.isOpen = false;
    }

    _hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
            this.allInputs.forEach(input=>input.destroy());
            this.selectLvl.destroy();
            this.btns.forEach(btn=>btn.destroy());
            this.btns = [];
            this.allInputs = [];
            //this.isOpen = false;
        }
    }

    keyboardInput(e:KeyboardEvent){
        //console.log('keyboardInput');
        this.allInputs.forEach(input=>{
            input.onChange(e);
        });
    }
}