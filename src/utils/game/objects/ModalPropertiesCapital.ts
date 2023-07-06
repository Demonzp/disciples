import Graphics from "utils/gameLib/Graphics";
import { IScene } from "../scenes/IScene";
import Sprite from "utils/gameLib/Sprite";
import { ICapitalCity } from "store/slices/sliceGame";
import Text from "utils/gameLib/Text";
import InputEl from "./InputEl";

export default class ModalPropertiesCapital{
    private _graphics:Graphics|undefined;
    fon:Sprite|undefined;
    textOwner: Text|undefined;
    inputManaLife: InputEl|undefined;
    inputManaInfernal: InputEl|undefined;
    inputManaDeath: InputEl|undefined;
    inputManaRune: InputEl|undefined;
    inputManaForest: InputEl|undefined;
    inputGold: InputEl|undefined;
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

        this.inputManaLife = new InputEl(this.scene, capitalData.manaLife, ()=>{
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
        });
        this.inputManaLife.x = x-320;
        this.inputManaLife.y = y+170;

        this.inputManaInfernal = new InputEl(this.scene, capitalData.manaInfernal, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
        });
        this.inputManaInfernal.x = x-250;
        this.inputManaInfernal.y = y+170;

        this.inputManaRune = new InputEl(this.scene, capitalData.manaRune, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaInfernal.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
        });
        this.inputManaRune.x = x-180;
        this.inputManaRune.y = y+170;

        this.inputManaDeath = new InputEl(this.scene, capitalData.manaDeath, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaForest.ofSelect();
            this.inputGold.ofSelect();
        });
        this.inputManaDeath.x = x-110;
        this.inputManaDeath.y = y+170;

        this.inputManaForest = new InputEl(this.scene, capitalData.manaForest, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputGold.ofSelect();
        });
        this.inputManaForest.x = x-40;
        this.inputManaForest.y = y+170;

        this.inputGold = new InputEl(this.scene, capitalData.manaForest, ()=>{
            this.inputManaLife.ofSelect();
            this.inputManaInfernal.ofSelect();
            this.inputManaRune.ofSelect();
            this.inputManaDeath.ofSelect();
            this.inputManaForest.ofSelect();
        });
        this.inputGold.x = x+30;
        this.inputGold.y = y+170;

        this.isOpen = true;
    }

    hide(){
        if(this.fon){
            this.scene.add.remove(this.fon);
            this.scene.add.remove(this.textOwner);
            this.fon = undefined;
            this.textOwner = undefined;
        }
        this.isOpen = false;
    }

    pointerUp(){
        if(!this.isOpen){
            return;
        }
        //console.log('pointerUp');
        this.inputManaLife.ofSelect();
        this.inputManaInfernal.ofSelect();
    }

    keyboardInput(e:KeyboardEvent){
        //console.log('keyboardInput');
        this.inputManaLife.onChange(e);
        this.inputManaInfernal.onChange(e);
        this.inputManaRune.onChange(e);
        this.inputManaDeath.onChange(e);
        this.inputManaForest.onChange(e);
        this.inputGold.onChange(e);
    }
}