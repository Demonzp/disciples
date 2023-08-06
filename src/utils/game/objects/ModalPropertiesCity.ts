import { ICity } from "store/slices/sliceGame";
import { IScene } from "../scenes/IScene";
import Sprite from "utils/gameLib/Sprite";
import InputElString from "./InputElString";
import InputEl from "./InputEl";

export default class ModalPropertiesCity{
    cityData:ICity;
    private _fon:Sprite|undefined;
    inputCityName: InputElString|undefined;
    allInputs:(InputEl|InputElString)[]=[];
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
        this.inputCityName.x = x-200;
        this.inputCityName.y = y-120;
        this.allInputs.push(this.inputCityName);
        this.isOpen = true;
    }

    hide(){
        if(this._fon){
            this.scene.add.remove(this._fon);
            this.allInputs.forEach(input=>input.destroy());
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