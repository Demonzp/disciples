import Graphics from "utils/gameLib/Graphics";
import { IScene } from "../scenes/IScene";
import Sprite from "utils/gameLib/Sprite";
import { ICapitalCity, defaultLordTypes } from "store/slices/sliceGame";
import Text from "utils/gameLib/Text";
import InputEl from "./InputEl";
import InputElString from "./InputElString";
import SelectLine from "./SelectLine";
import Button from "./Button";
import store from "store/store";
import { TChangeCapitalProps, actionDelSelectObj } from "store/actions/actionsGame";

export default class ModalPropertiesCapital{
    private _graphics:Graphics|undefined;
    fon:Sprite|undefined;
    textOwner: Text|undefined;
    inputCapitalName: InputElString|undefined;
    inputLordName: InputElString|undefined;
    selectLordType: SelectLine|undefined;
    inputManaLife: InputEl|undefined;
    inputManaInfernal: InputEl|undefined;
    inputManaDeath: InputEl|undefined;
    inputManaRune: InputEl|undefined;
    inputManaForest: InputEl|undefined;
    inputGold: InputEl|undefined;
    btnCancel: Button|undefined;
    btnOk: Button|undefined;
    allInputs:(InputEl|InputElString)[]=[];
    allSelects:SelectLine[]=[];
    allBtns: Button[] = [];
    //width = 660;
    //height = 460;
    halfWidth = 0;
    halfHeight = 0;
    isOpen = false;
    constructor(public scene:IScene){
        //this.init();
        //this.halfWidth = this.width/2;
        //this.halfHeight = this.height/2;
    }

    get graphics(){
        return this._graphics!;
    }

    init(capitalData:ICapitalCity){
        this.fon = this.scene.add.sprite('modal-capital1');
        const cameraPoint = this.scene.game.camera.cameraPoint();
        const x = 0+this.scene.halfWidth-cameraPoint.x;
        const y = 0+this.scene.halfHeight-cameraPoint.y;
        this.fon.x = x;
        this.fon.y = y;
        
        this.textOwner = this.scene.add.text(capitalData.race);
        this.textOwner.fontSize = 16;
        this.textOwner.x = x-290;
        this.textOwner.y = y-110;

        this.inputCapitalName = new InputElString(this.scene, capitalData.cityName, 16, ()=>{
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
            this.inputManaLife.ofSelect();
            this.inputLordName.ofSelect();
        });

        this.inputCapitalName.x = x - 295;
        this.inputCapitalName.y = y - 65;

        this.allInputs.push(this.inputCapitalName);

        this.inputLordName = new InputElString(this.scene, capitalData.lordName, 24, ()=>{
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
            this.inputManaLife.ofSelect();
            this.inputCapitalName.ofSelect();
        });

        this.inputLordName.x = x - 295;
        this.inputLordName.y = y + 15;

        this.allInputs.push(this.inputLordName);

        this.selectLordType = new SelectLine(this.scene, defaultLordTypes(), capitalData.lordType);
        this.selectLordType.init();

        this.selectLordType.x = x - 295;
        this.selectLordType.y = y + 70;

        this.allSelects.push(this.selectLordType);

        this.inputManaLife = new InputEl(this.scene, capitalData.manaLife, ()=>{
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
            this.inputCapitalName.ofSelect();
            this.inputLordName.ofSelect()
        });
        this.inputManaLife.x = x-320;
        this.inputManaLife.y = y+170;

        this.allInputs.push(this.inputManaLife);

        this.inputManaInfernal = new InputEl(this.scene, capitalData.manaInfernal, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
            this.inputCapitalName.ofSelect();
            this.inputLordName.ofSelect()
        });
        this.inputManaInfernal.x = x-250;
        this.inputManaInfernal.y = y+170;

        this.allInputs.push(this.inputManaInfernal);

        this.inputManaRune = new InputEl(this.scene, capitalData.manaRune, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaInfernal.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
            this.inputCapitalName.ofSelect();
            this.inputLordName.ofSelect()
        });
        this.inputManaRune.x = x-180;
        this.inputManaRune.y = y+170;

        this.allInputs.push(this.inputManaRune);

        this.inputManaDeath = new InputEl(this.scene, capitalData.manaDeath, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
            this.inputCapitalName.ofSelect();
            this.inputLordName.ofSelect()
        });
        this.inputManaDeath.x = x-110;
        this.inputManaDeath.y = y+170;

        this.allInputs.push(this.inputManaDeath);

        this.inputManaForest = new InputEl(this.scene, capitalData.manaForest, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputGold.ofSelect();
            this.inputCapitalName.ofSelect();
            this.inputLordName.ofSelect()
        });
        this.inputManaForest.x = x-40;
        this.inputManaForest.y = y+170;

        this.allInputs.push(this.inputManaForest);

        this.inputGold = new InputEl(this.scene, capitalData.manaForest, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputCapitalName.ofSelect();
            this.inputLordName.ofSelect()
        });
        this.inputGold.x = x+30;
        this.inputGold.y = y+170;

        this.allInputs.push(this.inputGold);

        this.btnCancel = new Button(this.scene, 'Cancel', this.onCancel.bind(this));
        this.btnCancel.init();
        
        this.btnCancel.x = x+260;
        this.btnCancel.y = y+170;
        this.allBtns.push(this.btnCancel);

        this.btnOk = new Button(this.scene, 'Ok', this.onOk.bind(this));
        this.btnOk.init();
        
        this.btnOk.x = x+220;
        this.btnOk.y = y+170;
        this.allBtns.push(this.btnOk);
        this.isOpen = true;
    }

    onCancel(){
        this.allInputs.forEach(input=>{
            input.ofSelect();
        });

        store.dispatch(actionDelSelectObj());
    }

    onOk(){
        this.allInputs.forEach(input=>{
            input.ofSelect();
        });
        const cityName = this.inputCapitalName.value;
        if(cityName.length<=0){
            
        }
        const data:TChangeCapitalProps = {
            cityName: string;
            lordName: string;
            lordType: TLordType;
            manaLife: number;
            manaInfernal: number;
            manaDeath: number;
            manaRune: number;
            manaForest: number;
            gold: number;
        }
        //store.dispatch(actionDelSelectObj());
    }

    hide(){
        if(this.fon){
            this.scene.add.remove(this.fon);
            this.scene.add.remove(this.textOwner);
            this.fon = undefined;
            this.textOwner = undefined;
            this.allInputs.forEach(input=>{
                input.destroy();
            });
            this.allSelects.forEach(select=>{
                select.destroy();
            });

            this.allBtns.forEach(btn=>btn.destroy());
        }
        this.isOpen = false;
    }

    pointerUp(){
        if(!this.isOpen){
            return;
        }
        //console.log('pointerUp');
        this.allInputs.forEach(input=>{
            input.ofSelect();
        });
    }

    keyboardInput(e:KeyboardEvent){
        //console.log('keyboardInput');
        this.allInputs.forEach(input=>{
            input.onChange(e);
        });
    }
}